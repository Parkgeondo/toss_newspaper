import CardNews from "../../Component/CardNews"
import { FloatingNewsCards_wrap } from "./styles"
import { newsData } from '../../data/newsData';
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Refresh from "../../Component/Refresh";

function FloatingNewsCards({setTemSavedNews, setOnExpand, currentIndex, setCurrentIndex,setSavedNews, savedNews, setProgress}) {
  

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
  const initialX = -card_gap_width + (offset - gap*0.5);
  //최대 스크롤 지점 전체 스크를 카드에서 2개 뺀 숫자 * 카드 기본 갭 넓이값 + 카드 보정값
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


  //드래그 방향 분별
  const dragdirection = useRef({
    downPoint:null,
    upPoint:null,
    direction:null
  });

  const onPointerDown = (e) => {
  dragdirection.current.downPoint = e.clientX;
  };

  const onPointerUp = (e) => {
    dragdirection.current.upPoint = e.clientX;
  };

  const snapTargetX = (target) => {
    const calculate = (target - offset) / card_gap_width;

    const down = dragdirection.current.downPoint;
    const up = dragdirection.current.upPoint;
    const direction = down - up;

    if (direction < -20) {
      return Math.ceil(calculate) * card_gap_width + (offset - gap * 0.5);
    } else if (direction > 20) {
      return Math.floor(calculate) * card_gap_width + (offset - gap * 0.5);
    } else {
      return Math.round(calculate) * card_gap_width + (offset - gap * 0.5);
    }
  };

  return (
    <FloatingNewsCards_wrap
      drag = 'x'
      dragDirectionLock
      style={{
        x,
        overflow: overHide ? `hidden` : 'visible',
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      dragConstraints={{ left: maxScrollLeft, right: initialX }}
      dragTransition={{
        power: 0.3,
        timeConstant: 40,
        modifyTarget: snapTargetX,
      }}
    >
      <Refresh></Refresh>

      {blankAddedNews.map((data, cardIndex) => (
        <CardNews key={data.id} savedNews={savedNews} setSavedNews ={setSavedNews} setProgress={setProgress} setTemSavedNews={setTemSavedNews} id={data.id} setOnExpand={setOnExpand} data={data} cardIndex={cardIndex} currentIndex={currentIndex} app_width={app_width} card_gap_width ={card_gap_width} card_width = {card_width} isFocused={cardIndex === currentIndex} x={x} yMinus={yMinus} card_distance={card_gap_width * cardIndex}/>
      ))}
    </FloatingNewsCards_wrap>
  );
}

export default FloatingNewsCards;
