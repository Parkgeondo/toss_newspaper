// CardDetail.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { CardDetail_wrap } from "./styles";
import { animate, motion, useAnimation, useMotionValue, useMotionValueEvent } from "framer-motion";
import { newsData } from '../../data/newsData';
import CardDetail_part from "../CardDetail_part";
import useTotalHeightBefore from '../../utile/useTotalHeightBefore';

export default function CardDetail({ 
  dragDirection, 
  setDragDirection, 
  detailIsDragging, 
  setDetailIsDragging, 
  isFadingOut, 
  setIsFadingOut, 
  currentIndex, 
  scope, 
  progress, 
  isDragging, 
  tabLine, 
  setTabLine, 
  containerRef, 
  setOnExpand, 
  onExpand, 
  setIsDragging 
}) {
  // 확대카드의 데이터
  const data = newsData[currentIndex - 1];

  // 카드의 Y 값 조절
  const y = useMotionValue(0);
  
  // 카드 높이 관련
  const cardHeights = useRef([]);
  const GAP = 120; // flex gap
  const [cardTotalHeight, setCardTotalHeight] = useState(0);

  // 뉴스 스크롤 감지 시작 위치
  const totalHeightBefore = useTotalHeightBefore(cardHeights, GAP);

  // 이전 Y 값 저장 (드래그 방향 감지용)
  const prevY = useRef(0);

  // 일반 카드가 보내주는 progress를 받아서 같이 이동
  useMotionValueEvent(progress, "change", (latest) => {
    // 주도권이 일반카드면
    if (isDragging) {
      y.set(latest + 212 - totalHeightBefore(currentIndex - 1));
    }
  });

  // 확대카드가 스크롤할 때
  useMotionValueEvent(y, "change", (latest) => {
    // 드래그 방향 감지
    if (latest > prevY.current) {
      setDragDirection('down');
    } else if (latest < prevY.current) {
      setDragDirection('up');
    }
    prevY.current = latest;
    
    // 확대카드를 아래로 스크롤해서 축소시킬 때
    if (latest > 0) {
      // 확대카드를 잠시 투명하게 만들고
      if (!detailIsDragging.get()) {
        setOnExpand(false);
      }
      setIsFadingOut(false);
      // 일반카드가 확대카드를 따라갈 수 있도록
      progress.set(latest - 212);
    } 
    // 확대카드를 정상적으로 스크롤할 때
    else if (latest <= 0) {
      setIsFadingOut(true);
    }
  });
  
  // 진행률 업데이트 핸들러
  const handleProgressUpdate = useCallback((id, value) => {
    setTabLine(prev => {
      if (prev.get(id) === value) return prev;
      const next = new Map(prev);
      next.set(id, value);
      return next;
    });
  }, []);

  // 확장카드의 렌더링 제거
  const cardDetailWrapUp = () => {
    if (!isFadingOut && y.get() > 0) {
      setOnExpand(false);
    }
  };

  // 카드 높이 업데이트 시 dragConstraints 계산
  useEffect(() => {
    if (cardHeights.current.length > 0) {
      const totalHeight = cardHeights.current.reduce((sum, height) => sum + height, 0) + (cardHeights.current.length - 1) * GAP;
      setCardTotalHeight(totalHeight);
    }
  }, [cardHeights.current]);

  useEffect(() => {
    console.log(totalHeightBefore(currentIndex - 1))
  }, [currentIndex]);
  
  return (
    <CardDetail_wrap 
      dragConstraints={{ top: -cardTotalHeight + 814 }} 
      drag="y" 
      dragDirectionLock 
      onDragStart={() => setDetailIsDragging(true)}
      onDragEnd={() => setDetailIsDragging(false)}
      onPointerUp={cardDetailWrapUp}
      style={{ y, opacity: isFadingOut ? 1 : 0 }}
    >
      <CardDetail_part
        key={data.id}
        id={data.id}
        data={data}
        index={currentIndex}
        y={y}
        containerRef={containerRef}
        onProgress={handleProgressUpdate}
        cardHeights={cardHeights}
        totalHeightBefore={totalHeightBefore}
      />
    </CardDetail_wrap>
  );
}