import CardNews from "../../Component/CardNews"
import { FloatingNewsCards_wrap } from "./styles"
import { newsData } from '../../data/newsData';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform, useAnimate, easeOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Refresh3D from "../../Component/Refresh";

function FloatingNewsCards_savedNews({ 
  dragDirection, 
  setDragDirection, 
  detailIsDragging, 
  setDetailIsDragging, 
  isFadingOut, 
  setIsFadingOut, 
  setIsDragging, 
  isDragging, 
  setTemSavedNews, 
  setOnExpand, 
  onExpand, 
  currentIndex, 
  setCurrentIndex, 
  setSavedNews, 
  savedNews, 
  progress,
  sharedX,
  sharedYMinus,
  card_width,
  app_width,
  card_gap_width,
  initialX,
  maxScrollLeft,
  isSavedNewsMode,
  zIndex
}) {
  // 가짜 카드 앞뒤로 넣어주기
  const blankAddedNews = [
    { id: "blank-start", isBlank: true },
    ...newsData.filter(news => savedNews.includes(news.id)),
    { id: "blank-end", isBlank: true }
  ];

  // 공유된 x 값 사용
  const x = sharedX;

  // 공유된 yMinus 값 사용
  const yMinus = sharedYMinus;

  // FloatingNewsCards_wrap 애니메이션용
  const [scope, animate] = useAnimate();

  // 카드 세로 스크롤 상위로 끌어올림 - 그래서 카드들이 저장된 뉴스에 먹히는 것처럼 overflow hidden을 조절함
  const [overHide, setOverHide] = useState(false);
  useMotionValueEvent(yMinus, "change", (latest) => {
    if (latest > 0) {
      setOverHide(true);
    } else {
      setOverHide(false);
    }
  });

  // 카드 가로 스크롤에 따라서 현재 어느 카드인지 확인
  useMotionValueEvent(x, "change", (latest) => {
    const offset = (app_width - card_width) * 0.5;
    setCurrentIndex(-Math.round((latest - offset) / (card_width + 12)));
  });

  // 새로고침하는 동안 드래그 불가
  const [dragDisabled, setDragDisabled] = useState(false);
  
  // 새로고침 함수
  const refresh = () => {
    setDragDisabled(true);
    animate(x, -135, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
    setTimeout(() => {
      animate(x, -228, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => setDragDisabled(false)
      });
    }, 1000);
  };

  // 드래그하는 방향 판단
  const dragDirectionRef = useRef({
    downPoint: null,
    upPoint: null,
    direction: null
  });

  const onPointerDown = (e) => {
    dragDirectionRef.current.downPoint = e.clientX;
  };

  const onPointerUp = (e) => {
    dragDirectionRef.current.upPoint = e.clientX;
    if (x.get() > -135) {
      refresh();
    }
  };

  const snapTargetX = (target) => {
    const offset = (app_width - card_width) * 0.5;
    const gap = card_gap_width - card_width;
    const calculate = (target - offset) / card_gap_width;
    const down = dragDirectionRef.current.downPoint;
    const up = dragDirectionRef.current.upPoint;
    const direction = down - up;

    // 기존 snap 로직
    if (direction <= -70) {
      return Math.ceil(calculate) * card_gap_width + (offset - gap * 0.5);
    } else if (direction >= 70) {
      return Math.floor(calculate) * card_gap_width + (offset - gap * 0.5);
    } else {
      return Math.round(calculate) * card_gap_width + (offset - gap * 0.5);
    }
  };


  return (
    <FloatingNewsCards_wrap
      ref={scope}
      drag={dragDisabled ? false : "x"}
      dragDirectionLock
      initial={{y:600}}
      animate={{y:0}}
      exit={{
        y: 600,
        transition: {
          delay: 0.8, // 사라질 때 1초 delay
          duration: 0.8,
          ease: [0.19, 1, 0.22, 1]
        }
      }}
      transition={{
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1]
      }}
      style={{
        x,
        overflow: overHide ? 'hidden' : 'visible',
        zIndex: zIndex,
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      dragConstraints={{ left: maxScrollLeft, right: initialX }}
      dragTransition={{
        power: 0.1,
        timeConstant: 100,
        modifyTarget: snapTargetX,
      }}
    >
      {/* <Refresh3D></Refresh3D> */}
      {blankAddedNews.map((data, cardIndex) => (
        <CardNews
          key={data.id}
          isFadingOut={isFadingOut}
          setIsFadingOut={setIsFadingOut}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          dragDirection={dragDirection}
          setDragDirection={setDragDirection}
          detailIsDragging={detailIsDragging}
          setDetailIsDragging={setDetailIsDragging}
          savedNews={savedNews}
          setSavedNews={setSavedNews}
          progress={progress}
          setTemSavedNews={setTemSavedNews}
          id={data.id}
          setOnExpand={setOnExpand}
          onExpand={onExpand}
          data={data}
          cardIndex={cardIndex}
          currentIndex={currentIndex}
          app_width={app_width}
          card_gap_width={card_gap_width}
          card_width={card_width}
          isFocused={cardIndex === currentIndex}
          x={x}
          yMinus={yMinus}
          card_distance={card_gap_width * cardIndex}
          isSavedNewsMode={isSavedNewsMode}
        />
      ))}
    </FloatingNewsCards_wrap>
  );
}

export default FloatingNewsCards_savedNews;
