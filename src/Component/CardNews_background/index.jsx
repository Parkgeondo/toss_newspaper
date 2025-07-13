import { useAnimate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { CardNews_wrap } from "./styles";
import { CardNews_drag } from "./styles";
import card_effect from "../../img/card_effect.png";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

function CardNews_background({
  data,
  currentIndex,
  card_gap_width,
  card_width,
  app_width,
  x,
  yMinus,
  card_distance,
  progress,
  id,
  savedNews
}) {
  // 각 카드들의 세로 드래그
  const y = useMotionValue(0);

  // x와 y에 따라 크기(scale)를 계산
  const distance = useTransform(x, (latestX) => {
    const screenCenter = app_width * 0.5;
    const cardCenterX = card_distance + latestX;

    // x 방향: 중심에서 멀어질수록 작아짐
    const rawX = Math.abs(cardCenterX - screenCenter + card_gap_width * 0.5);
    const maxX = card_width * 2;
    const clampedX = Math.min(rawX, maxX);
    const normX = clampedX / maxX; // 0 ~ 1

    const scale = 1 - normX * 0.2;
    return scale;
  });

  // progress 변경 감지
  useMotionValueEvent(progress, "change", (latest) => {
    if (id === currentIndex) {
      y.set(latest);
    }
  });

  // 애니메이션 변환값들
  const width = useTransform(y, [0, -212], [265, 375]);
  const temy = useTransform(yMinus, [0, -212], [0, -55]);
  const radius = useTransform(y, [0, -212], [24, 12]);

  // 빈 카드 렌더링
  if (data.isBlank) {
    return (
      <CardNews_wrap
        style={{
          opacity: '0',
          width: 265
        }}
      />
    );
  }

  return (
    <CardNews_drag 
          style={{
          filter: 'sepia(1) hue-rotate(180deg) saturate(0.6) contrast(0.9) brightness(0.7)',
          scale: distance,
          width,
          x: temy,
          borderRadius: radius,
        }}
    >
      <CardNews_wrap
      initial={{ filter: 'blur(2px)', opacity: 0, scale: 0.7 }}
      animate={savedNews.includes(data.id) ? { filter: 'blur(0px)', opacity: 1, scale: 1 } : {}} 
      transition={{type: "spring", stiffness: 100, damping: 7 }}
        style={{
          borderRadius: radius,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="gradient"></div>
        <img src={data.bigImage} className="thumnail" alt="" />
        <motion.div className="text">
          <div className="publisher">
            <img src={data.publisherImg} alt="" />
            {data.publisher}
          </div>
          <div className="title">{data.title}</div>
          <div className="badge">{data.category}</div>
          <div className="badge">{data.date}</div>
        </motion.div>
      </CardNews_wrap>
    </CardNews_drag>
  );
}

export default CardNews_background;