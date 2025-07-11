// CardDetail.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { CardDetail_wrap } from "./styles";
import { animate, motion, useAnimation, useMotionValue, useMotionValueEvent } from "framer-motion";
import { newsData } from '../../data/newsData';
import CardDetail_part from "../CardDetail_part";
import useTotalHeightBefore from '../../utile/useTotalHeightBefore';
import homeIcon from '../../img/home_icon.svg';
import NextNews from "../../Component/NextNews";

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
  setIsDragging ,
  number_y
}) {
  // 확대카드의 데이터
  const data = newsData[currentIndex - 1];

  // 카드의 Y 값 조절
  const y = useMotionValue(0);
  
  // 카드 높이 관련
  const cardHeights = useRef(null);
  const [containerHeight, setContainerHeight] = useState(700); // 기본값

  // 이전 Y 값 저장 (드래그 방향 감지용)
  const prevY = useRef(0);


  // 확대카드가 스크롤할 때
  useMotionValueEvent(y, "change", (latest) => {
    // number_y 위치 조정
    const threshold = -containerHeight + 814 + 380 + 10;
    if(latest > threshold) {
      number_y.set(-100);
    } else if(latest <= threshold) {
      number_y.set(20);
    }
    
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
  
  useMotionValueEvent(progress, "change", (latest) => {
    if (isDragging) {
      y.set(latest + 212);
    }
  });

  // 확장카드의 렌더링 제거
  const cardDetailWrapUp = () => {
    if (!isFadingOut && y.get() > 0) {
      setOnExpand(false);
    }
  };

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height;
      cardHeights.current = height;
      setContainerHeight(height);
    }
  }, []);

  
  return (
    <CardDetail_wrap 
      ref={ref}
      dragConstraints={{ 
        top: -containerHeight + 814 + 380
      }} 
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
      />
      <div className="home-button">
        <img src={homeIcon} alt="home" />
      </div>
      <NextNews currentIndex={currentIndex} number_y={number_y}/>
    </CardDetail_wrap>
  );
}