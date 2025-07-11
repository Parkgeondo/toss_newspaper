import { useAnimate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { CardNews_wrap } from "./styles";
import { CardNews_drag } from "./styles";
import card_effect from "../../img/card_effect.png";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

function CardNews({
  dragDirection,
  setDragDirection,
  setIsFadingOut,
  isFadingOut,
  setIsDragging,
  isDragging,
  setOnExpand,
  onExpand,
  data,
  currentIndex,
  cardIndex,
  card_gap_width,
  card_width,
  app_width,
  isFocused,
  x,
  yMinus,
  card_distance,
  setSavedNews,
  savedNews,
  progress,
  id,
  setTemSavedNews
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

  // 카드 투명도 조절 isFadingOut이 false면 안보임
  const [cardFadingOut, setCardFadingOut] = useState(true);

  // 카드 세로 드래그
  useMotionValueEvent(y, "change", (latest) => {

    // overflow용 전달
    yMinus.set(latest);
    // 일반카드의 세로 값을 progress에 적용시킴
    progress.set(latest);
    
    // 일반카드가 위로 움직여서 상단으로 닿았을 때
    if (progress.get() < -210) {
      // 확장카드가 생성됨
      
      setOnExpand(true);
      setIsFadingOut(true);
    }
    // progress가 아래에 550에 닿았을 때
    if (y.get() === 550 && !savedNews.includes(id)) {
      // 뉴스 저장
      handleSaveNews();
      setCardFadingOut(false);
    } else {
      setCardFadingOut(true);
    }
  });

  // progress 변경 감지
  useMotionValueEvent(progress, "change", (latest) => {
    if (id === currentIndex) {
      y.set(latest);
    }
  });

  // 드래그를 놓았을 때, 애니메이션 적용
  const [scope, animate] = useAnimate();
  const dragUp = () => {
    const dragY = y.get();
    if (!scope.current) return;
    if (dragY <= -120 && dragY >= -212) {
      if (dragDirection === 'down') {
        animate(scope.current, { y: 0 }, { duration: 0.4, ease: "circOut" });
      } else {
        animate(scope.current, { y: -212 }, { duration: 0.4, ease: "circOut" });
      }
    } else if (dragY < -212) {
      animate(scope.current, { y: -212 }, { duration: 0 });
    } else if (dragY > -120 && dragY < 60) {
      animate(scope.current, { y: 0 }, { duration: 0.4, ease: "circOut" });
    } else if (dragY > 60) {
      animate(scope.current, { y: 550 }, { duration: 0.4, ease: "circOut" });
    }
    setIsDragging(false);
    setDragDirection(null);
  };

  // 확장카드가 사라졌을 때, 일반 카드를 원래 위치로 옮기기
  useEffect(() => {
    if (!onExpand && scope.current) {
      dragUp();
    }
  }, [onExpand]);

  // 뉴스 저장하기
  const handleSaveNews = useCallback(() => {
    setSavedNews((prev) => prev.includes(id) ? prev : [...prev, id]);
    setTemSavedNews([]);
  }, [setSavedNews, setTemSavedNews, id]);

  // 애니메이션 변환값들
  const width = useTransform(y, [0, -212], [265, 375]);
  const height = useTransform(y, [0, -212], [426, 814]);
  const opacity = useTransform(y, [0, -212], [1, 0]);
  const temy = useTransform(yMinus, [0, -212], [0, -55]);
  const radius = useTransform(y, [0, -212], [24, 12]);

  const textBody_opacity = useTransform(y, [0, -212], [0, 480]);
  const [textMaskPercent, setTextMaskPercent] = useState(0);
  useMotionValueEvent(textBody_opacity, "change", (latest) => {
    setTextMaskPercent(latest);
  });
  const textBody_scale = useTransform(y, [0, -212], [0.651, 1]);

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
      drag="y"
      ref={scope}
      onDragEnd={dragUp}
      dragDirectionLock
      dragListener={true}
      onDragStart={() => setIsDragging(true)}
      dragTransition={{
        power: 0.1,
        timeConstant: 100,
      }}
      style={{
        opacity: cardFadingOut ? 1 : 0,
        scale: distance,
        width,
        x: temy,
        y,
        borderRadius: radius,
      }}
    >
      <motion.img
        style={{
          height,
          borderRadius: radius,
          opacity
        }}
        src={card_effect}
        className="card_effect"
        alt=""
      />
      
      <CardNews_wrap
        style={{
          borderRadius: radius,
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
      
      <motion.div
        className="textBody"
        style={{
          scale: textBody_scale,
          x: '-50%',
          WebkitMaskSize: `100% ${textMaskPercent}px`,
          maskSize: `100% ${textMaskPercent}px`,
        }}
      >
        {data.subTitle1 && <div className="subtitle">{data.subTitle1}</div>}
        {data.content1 && <div className="content">{data.content1}</div>}

        {data.subTitle2 && <div className="subtitle">{data.subTitle2}</div>}
        {data.content2 && <div className="content">{data.content2}</div>}

        {data.subTitle3 && <div className="subtitle">{data.subTitle3}</div>}
        {data.content3 && <div className="content">{data.content3}</div>}

        {data.content4 && <div className="content">{data.content4}</div>}
        {data.content5 && <div className="content">{data.content5}</div>}
      </motion.div>
      
      <motion.div
        className="plus"
        style={{
          height,
          borderRadius: radius,
        }}
      />
    </CardNews_drag>
  );
}

export default CardNews;