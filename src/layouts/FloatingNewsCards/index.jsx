import CardNews from "../../Component/CardNews"
import { FloatingNewsCards_wrap } from "./styles"
import { newsData } from '../../data/newsData';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Refresh3D from "../../Component/Refresh";

function FloatingNewsCards({ 
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
  progress 
}) {
  // 가짜 카드 앞뒤로 넣어주기
  const blankAddedNews = [
    { id: "blank-start", isBlank: true },
    ...newsData,
    { id: "blank-end", isBlank: true }
  ];

  // 카드 크기 및 간격 설정
  const card_width = 265;
  const app_width = 375;
  const gap = 12;

  // 첫장 카드를 제외한 기본 보정값
  const offset = (app_width - card_width) * 0.5;
  // 카드가 차지하는 gap을 포함한 기본 넓이 값
  const card_gap_width = (card_width + gap);
  // 처음 카드가 시작하는 지점
  const initialX = -card_gap_width + (offset - gap * 0.5);
  // 최대 스크롤 지점
  const maxScrollLeft = -(blankAddedNews.length - 2) * card_gap_width + (offset - gap * 0.5);

  // 카드 일열 가로 스크롤 관리
  const x = useMotionValue(initialX);
  
  // 카드 세로 스크롤 상위로 끌어올림
  const yMinus = useMotionValue(0);

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
      drag={dragDisabled ? false : "x"}
      dragDirectionLock
      style={{
        x,
        overflow: overHide ? 'hidden' : 'visible',
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
        />
      ))}
    </FloatingNewsCards_wrap>
  );
}

export default FloatingNewsCards;
