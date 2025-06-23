import CardNews from "../../Component/CardNews"
import { FloatingNewsCards_wrap } from "./styles"
import { newsData } from '../../data/newsData';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Refresh3D from "../../Component/Refresh";

function FloatingNewsCards({setIsDragging, setTemSavedNews, setOnExpand, currentIndex, setCurrentIndex,setSavedNews, savedNews,progress}) {
  

  //가짜 카드 앞뒤로 넣어주기
  const blankAddedNews = [
    { id: "blank-start", isBlank: true },
    ...newsData,
    { id: "blank-end", isBlank: true }
  ];

  const card_width = 265;
  const app_width = 375;
  const gap = 12;

  //첫장 카드를 제외한 기본 보정값
  const offset = (app_width - card_width)*0.5;
  //카드가 차지하는 gap을 포함한 기본 넓이 값
  const card_gap_width = (card_width + gap)
  //처음 카드가 시작하는 지점 -> 첫번재 카드 넓이 + 카드 양옆 공간의 반 - 한쪽 gap
  // const initialX = 0;
  const initialX = -card_gap_width + (offset - gap*0.5);
  //최대 스크롤 지점 전체 스크를 카드에서 2개 뺀 숫자 * 카드 기본 갭 넓이값 + 카드 보정값
  // const maxScrollLeft = -(blankAddedNews.length - 2) * card_gap_width + (offset - gap*0.5);
  const maxScrollLeft = -(blankAddedNews.length - 2) * card_gap_width + (offset - gap*0.5);

  const x = useMotionValue(initialX);
  
  const yMinus = useMotionValue(0);

  useMotionValueEvent(x, "change", (latest) => {
    setCurrentIndex(- Math.round((latest - offset) / (card_width + 12)));
  });

  const [overHide,setOverHide] = useState(false)
  
  useMotionValueEvent(yMinus, "change", (latest) => {
    if(latest > 0){
      setOverHide(true)
    }else{
      setOverHide(false)
    }
  });

  const dragdirection = useRef({
    downPoint:null,
    upPoint:null,
    direction:null
  });

  const [dragDisabled, setDragDisabled] = useState(false);

  const [dragNumber, setDragNumber] = useState(0);
  
  const Refresh = () => {
    setDragDisabled(true);
    console.log('새로고침');
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

  const onPointerDown = (e) => {
  dragdirection.current.downPoint = e.clientX;
  };

  const onPointerUp = (e) => {
    dragdirection.current.upPoint = e.clientX;
    if(x.get() > -135){
      Refresh()
    }
  };

const snapTargetX = (target) => {
  const calculate = (target - offset) / card_gap_width;

  const down = dragdirection.current.downPoint;
  const up = dragdirection.current.upPoint;
  const direction = down - up;

  // 강제 구간이면 무조건 -228로 snap!
  if (target > -228 && target < -135) {
    return -228;
  }

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
        overflow: overHide ? `hidden` : 'visible',
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      dragConstraints={{ left: maxScrollLeft - dragNumber, right: initialX + dragNumber }}
      dragTransition={{
        power: 0.1,
        timeConstant: 100,
        modifyTarget: snapTargetX,
      }}
    >
      {/* <Refresh3D></Refresh3D> */}
      {blankAddedNews.map((data, cardIndex) => (
        <CardNews key={data.id} setIsDragging={setIsDragging} savedNews={savedNews} setSavedNews ={setSavedNews} progress={progress} setTemSavedNews={setTemSavedNews} id={data.id} setOnExpand={setOnExpand} data={data} cardIndex={cardIndex} currentIndex={currentIndex} app_width={app_width} card_gap_width ={card_gap_width} card_width = {card_width} isFocused={cardIndex === currentIndex} x={x} yMinus={yMinus} card_distance={card_gap_width * cardIndex}/>
      ))}
    </FloatingNewsCards_wrap>
  );
}

export default FloatingNewsCards;
