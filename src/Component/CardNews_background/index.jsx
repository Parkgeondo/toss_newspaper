import { useAnimate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { CardNews_wrap } from "./styles";
import { CardNews_drag } from "./styles";
import card_effect from "../../img/card_effect.png";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import backButton_card from "../../img/backButton_card.svg";
import { useLayout } from '../../contexts/LayoutContext';


function CardNews_background({
  data,
  currentIndex,
  x,
  yMinus,
  card_distance,
  activeProgress,
  id,
  savedNews,
  setSavedNews,
}) {
  const { cardLayoutValues } = useLayout();
  const { cardWidth, appWidth, cardGapWidth } = cardLayoutValues;
  // 각 카드들의 세로 드래그
  const y = useMotionValue(0);

  // x와 y에 따라 크기(scale)를 계산
  const distance = useTransform(x, (latestX) => {
    const screenCenter = appWidth * 0.5;
    const cardCenterX = card_distance + latestX;

    // x 방향: 중심에서 멀어질수록 작아짐
    const rawX = Math.abs(cardCenterX - screenCenter + cardGapWidth * 0.5);
    const maxX = cardWidth * 2;
    const clampedX = Math.min(rawX, maxX);
    const normX = clampedX / maxX; // 0 ~ 1

    const scale = 1 - normX * 0.2;
    return scale;
  });

  // 전역 activeProgress 변경 감지 (확장카드에서 업데이트된 경우)
  useMotionValueEvent(activeProgress, "change", (latest) => {
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
          scale: distance,
          width,
          x: temy,
          borderRadius: radius,
        }}
    >
      <motion.div
        className="backButton"
        initial={{
        opacity: 0, scale: 0, x:"-50%",y:"-100%"
      }}
        animate={savedNews.includes(data.id)
          ? {opacity: 1, scale: 1, x:"-50%",y:"-100%"}
          : {opacity: 0, scale: 0.7, x:"-50%",y:"-100%" }
        }
        transition={{ type: "spring", stiffness: 100, damping: 7 }}
        onClick={() => {
          // 저장된 뉴스에서 제거
          setSavedNews(prev => prev.filter(id => id !== data.id));
          // SaveBox 애니메이션 트리거
        }}
      >
          <img src={backButton_card}></img>
          <p>저장 취소하기</p>
      </motion.div>
      <CardNews_wrap
        initial={{
          filter: 'sepia(1) hue-rotate(180deg) saturate(0.6) contrast(0.9) brightness(0.7) blur(2px)',
          opacity: 0,
          scale: 0.7
        }}
        animate={savedNews.includes(data.id)
          ? { filter: 'sepia(1) hue-rotate(180deg) saturate(0.6) contrast(0.9) brightness(0.7) blur(0px)', opacity: 1, scale: 1 }
          : { filter: 'sepia(1) hue-rotate(180deg) saturate(0.6) contrast(0.9) brightness(0.7) blur(2px)', opacity: 0, scale: 0.7 }
        }
        transition={{ type: "spring", stiffness: 100, damping: 7 }}
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