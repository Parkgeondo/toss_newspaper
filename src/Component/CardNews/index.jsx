import { useAnimate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { CardNews_wrap, GrayscaleTextBody } from "./styles";
import { CardNews_drag } from "./styles";
import card_effect from "../../img/card_effect.png";
import { use, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLayout } from '../../contexts/LayoutContext';
import CardNews_background from "../CardNews_background";

function CardNews({
  dragDirection,
  setDragDirection,
  setIsFadingOut,
  isDragging,
  setIsDragging,
  setOnExpand,
  onExpand,
  data,
  currentIndex,
  x,
  yMinus,
  setSavedNews,
  savedNews,
  activeProgress,
  id,
  setTemSavedNews,
  cardIndex,
}) {
  const { cardLayoutValues } = useLayout();
  const { cardWidth, appWidth, cardGapWidth } = cardLayoutValues;
  
  // 각 카드별 개별 progress
  const cardProgress = useMotionValue(0);

  // 각 카드들의 초기 x 값
  const card_distance = cardGapWidth * cardIndex;
  // 각 카드들의 세로 드래그
  const y = useMotionValue(0);

  // x에 따라 크기(scale)를 계산
  const distance = useTransform(x, (latestX) => {

    //화면의 중심점을 계산
    const screenCenter = appWidth * 0.5;

    //카드가 지금 왼쪽 모서리 화면에서 얼마나 떨어져있는지 계산
    const cardCenterX = card_distance + latestX;

    // cardCenterX - screenCenter에 카드 반값을 더해 카드가 중심에서 얼마나 벗어나 있는지 확인
    const rawX = Math.abs(cardCenterX - screenCenter + cardGapWidth * 0.5);
    const maxX = cardWidth * 2;
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
    // 각 카드별 개별 progress 업데이트
    cardProgress.set(latest);
    
    // 현재 활성 카드인 경우에만 전역 progress 업데이트
    if (id === currentIndex) {
      activeProgress.set(latest);
    }
    
    // 일반카드가 위로 움직여서 상단으로 닿았을 때
    if (cardProgress.get() < -210) {
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

  // 전역 activeProgress 변경 감지 (확장카드에서 업데이트된 경우)
  useMotionValueEvent(activeProgress, "change", (latest) => {
    if (id === currentIndex) {
      y.set(latest);
      cardProgress.set(latest);
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

  // 확장카드가 사라졌을 때, 일반 카드를 원래 위치로 옮기기, isDragging이 있는 이유는 일반카드를 잡고 드래그할때 애니메이션이 강제로 작동하기 때문
  useEffect(() => {
    if (!onExpand && scope.current && !isDragging) {
      dragUp();
    }
  }, [onExpand]);

  //저장 취소하기 버튼 눌렀을때 저장된 카드가 위로 잘 올라갈 수 있도록 애니메이션
  useEffect(() => {
    if(!savedNews.includes(currentIndex) && scope.current && id===currentIndex) {
      animate(scope.current, { y: 0 }, { duration: 0.4, ease: "circOut", delay: 0.3 });
    }
  }, [savedNews]);

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
    <div>
      <CardNews_drag
        drag="y"
        ref={scope}
        onDragEnd={dragUp}
        dragDirectionLock
        dragListener={true}
        onDragStart={() => setIsDragging(true)}
        style={{
          scale: distance,
          width,
          x: temy,
          y,
          borderRadius: radius,
          opacity: cardFadingOut ? 1 : 0,
        }}
      >
        {/* 카드 썸네일이랑 제목 나오는 부분 */}
        <CardNews_wrap
          style={{
            borderRadius: radius,
            position: 'relative',
            zIndex: 1,
            // 기존 스타일
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
        
        {/* 가라로 본문 내용 보이게 만드는 부분 */}
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
        {/* 가라로 카드 커지게 보이는 하단 추가 부분 */}
        <motion.div
          className="plus"
          style={{
            height,
            borderRadius: radius,
          }}
        />
      </CardNews_drag>
             <div style={{zIndex: -2, position: 'absolute', top: 0, left: 0, width: '265px', height: '426px'}}>
         <CardNews_background 
           data={data} 
           currentIndex={currentIndex} 
           x={x} 
           yMinus={yMinus} 
           card_distance={card_distance} 
           activeProgress={activeProgress} 
           id={id} 
           savedNews={savedNews}
           setSavedNews={setSavedNews}
           setTemSavedNews={setTemSavedNews}
         />
       </div>
    </div>
  );
}

export default CardNews;