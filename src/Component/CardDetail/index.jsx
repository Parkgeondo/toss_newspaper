// CardDetail.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { CardDetail_wrap } from "./styles";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { newsData } from '../../data/newsData';
import CardDetail_part from "../CardDetail_part";

export default function CardDetail({ progress, isDragging, tabLine, setTabLine, containerRef,setOnExpand }) {
  const y = useMotionValue(0);

  //확대카드의 투명도 조절
  const [isFadingOut, setIsFadingOut] = useState(true);

  const cardHeights = useRef([]);
  const GAP = 120; // flex gap

  const totalHeightBefore = (index) => {
    return cardHeights.current
      .slice(0, index)
      .reduce((sum, h) => sum + h + GAP, 0); // 각 카드 높이 + gap 누적
  };

  useMotionValueEvent(progress, "change", (latest) => {
    //주도권이 일반카드면
    if (isDragging) {
    //확대카드가 따라감
      y.set(latest + 212);
    }
    console.log('progress', latest)
  });

  useMotionValueEvent(y, "change", (latest) => {
    if (latest > 0) {
      setIsFadingOut(false);
      progress.set(latest - 212)
    }else{
      setIsFadingOut(true);
    }
    console.log('y', latest)
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

  return (
    <CardDetail_wrap drag='y' onPointerUp={() => {CardDetail_wrap_up()}} style={{ y, opacity: isFadingOut ? 1 : 0.2 }}>
      {newsData.map((data, index) => (
        <CardDetail_part
          key={data.id}s
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