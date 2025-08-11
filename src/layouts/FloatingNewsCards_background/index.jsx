import CardNews_background from "../../Component/CardNews_background"
import { FloatingNewsCards_wrap } from "./styles"
import { newsData } from '../../data/newsData';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Refresh3D from "../../Component/Refresh";
import { useLayout } from '../../contexts/LayoutContext';

function FloatingNewsCards_background({ 
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
  activeProgress,
  sharedX,
  sharedYMinus,
  initialX,
  maxScrollLeft,
  isSavedNewsMode,
  zIndex
}) {
  const { cardLayoutValues } = useLayout();
  const { cardWidth, appWidth, cardGapWidth } = cardLayoutValues;
  // 가짜 카드 앞뒤로 넣어주기
  const blankAddedNews = [
    { id: "blank-start", isBlank: true },
    ...newsData,
    { id: "blank-end", isBlank: true }
  ];

  // 공유된 x 값 사용
  const x = sharedX;

  // 전체 데이터 갯수
  const total = newsData.length;
  
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
    const offset = (appWidth - cardWidth) * 0.5;
    setCurrentIndex(-Math.round((latest - offset) / (cardWidth + 12)));
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
    const offset = (appWidth - cardWidth) * 0.5;
    const gap = cardGapWidth - cardWidth;
    const calculate = (target - offset) / cardGapWidth;
    const down = dragDirectionRef.current.downPoint;
    const up = dragDirectionRef.current.upPoint;
    const direction = down - up;

    // 기존 snap 로직
    if (direction <= -70) {
      return Math.ceil(calculate) * cardGapWidth + (offset - gap * 0.5);
    } else if (direction >= 70) {
      return Math.floor(calculate) * cardGapWidth + (offset - gap * 0.5);
    } else {
      return Math.round(calculate) * cardGapWidth + (offset - gap * 0.5);
    }
  };
 // 스케일 애니메이션 하기 전에 scaleorigin 정하기
 const getOrigin = (currentIndex, total) => {
  const newTotal = total + 2;
  const origin = (100 / newTotal) * (currentIndex + 0.5);
  return `${origin}% center`;
};

// isSavedNewsMode 변경 시 FloatingNewsCards_wrap 애니메이션
useEffect(() => {
  if (scope.current) {
    getOrigin(currentIndex, total);
    scope.current.style.transformOrigin = getOrigin(currentIndex, total);
    if (isSavedNewsMode) {
      animate(scope.current, { opacity: 0, scale: 0.9, filter: "blur(10px)" }, { duration: 0.5, ease: "easeInOut" });
    } else {
      animate(scope.current, { opacity: 1, scale: 1, filter: "blur(0px)" }, { duration: 0.5, ease: "easeInOut" });
    }
  }
}, [isSavedNewsMode, animate]);

  return (
    <FloatingNewsCards_wrap
      ref={scope}
      drag={dragDisabled ? false : "x"}
      dragDirectionLock
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
        <CardNews_background
          key={data.id}
          dragDirection={dragDirection}
          setDragDirection={setDragDirection}
          detailIsDragging={detailIsDragging}
          setDetailIsDragging={setDetailIsDragging}
          isFadingOut={isFadingOut}
          setIsFadingOut={setIsFadingOut}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          savedNews={savedNews}
          setSavedNews={setSavedNews}
          activeProgress={activeProgress}
          setTemSavedNews={setTemSavedNews}
          id={data.id}
          setOnExpand={setOnExpand}
          onExpand={onExpand}
          data={data}
          cardIndex={cardIndex}
          currentIndex={currentIndex}
          isFocused={cardIndex === currentIndex}
          x={x}
          yMinus={yMinus}
          card_distance={cardGapWidth * cardIndex}
        />
      ))}
    </FloatingNewsCards_wrap>
  );
}

export default FloatingNewsCards_background;
