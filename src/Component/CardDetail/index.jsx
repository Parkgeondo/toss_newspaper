// CardDetail.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { CardDetail_wrap } from "./styles";
import { animate, motion, useAnimation, useMotionValue, useMotionValueEvent } from "framer-motion";
import { newsData } from '../../data/newsData';
import CardDetail_part from "../CardDetail_part";
import useTotalHeightBefore from '../../utile/useTotalHeightBefore';

export default function CardDetail({currentIndex, scope, progress, isDragging, tabLine, setTabLine, containerRef,setOnExpand, setIsDragging }) {

  //카드의 Y 값 조절
  const y = useMotionValue(0);
  
  //확대카드의 투명도 조절
  const [isFadingOut, setIsFadingOut] = useState(true);

  const cardHeights = useRef([]);
  const GAP = 120; // flex gap

  //뉴스 스크롤 감지 시작 위치
  const totalHeightBefore = useTotalHeightBefore(cardHeights, GAP);

  //일반 카드가 보내주는 progress를 받아서 같이 이동함
  useMotionValueEvent(progress, "change", (latest) => {
  //주도권이 일반카드면
    if (isDragging) {
      y.set(latest + 212 - totalHeightBefore(currentIndex - 1));
    }
  });

  //확대카드가 스크롤 할때, 
  useMotionValueEvent(y, "change", (latest) => {
    //확대카드를 아래로 스크롤 해서 축소 시킬때
    if (latest > 0) {
    //확대카드를 잠시 투명하게 만들고
      setIsFadingOut(false);
    //일반카드가 확대카드를 따라갈수 있도록
      progress.set(latest - 212)
    //확대카드를 정상적으로 스크롤 할때
    }else if(latest <= 0) {
      setIsFadingOut(true);
    }
  });
  
  const handleProgressUpdate = useCallback((id, value) => {
    setTabLine(prev => {
      if (prev.get(id) === value) return prev;
      const next = new Map(prev);
      next.set(id, value);
      return next;
    });
  }, []);

  const CardDetail_wrap_up = (index) => {
    if(!isFadingOut && y.get() > 0){
      setOnExpand(false)
    }
  };

  useEffect(() => {
    if (cardHeights.current.length === 0) return;
    const offsetY = totalHeightBefore(currentIndex - 1);
    animate(y, -offsetY, { duration: 0, ease: "easeInOut" });
  }, [currentIndex]);
  
  return (
    <CardDetail_wrap drag dragDirectionLock onPointerUp={() => {CardDetail_wrap_up()}} style={{ y, opacity: isFadingOut ? 1 : 0 }}>
      {newsData.map((data, index) => (
        <CardDetail_part
          key={data.id}
          id={data.id}
          data={data}
          index={index}
          y={y}
          containerRef={containerRef}
          onProgress={handleProgressUpdate}
          cardHeights={cardHeights}
          totalHeightBefore={totalHeightBefore}
        />
      ))}
    </CardDetail_wrap>
  );
}