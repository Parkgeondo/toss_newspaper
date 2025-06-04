import CardNews from "../../Component/CardNews"
import { FloatingNewsCards_wrap } from "./styles"
import { newsData } from '../../data/newsData';
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";
import { cos } from "three/tsl";

function FloatingNewsCards({setOnExpand, currentIndex, setCurrentIndex}) {

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

  const snapTargetX = (target) => {
    return Math.round((target - offset) / (card_width + 12)) * card_gap_width + (offset - gap*0.5)
  };

    useMotionValueEvent(x, "change", (latest) => {
      const rawX = x.get();
      setCurrentIndex(- Math.round((rawX - offset) / (card_width + 12)));
    });
  

  return (
    <FloatingNewsCards_wrap
      drag = 'x'
      dragDirectionLock
      style={{ x }}
      dragConstraints={{ left: maxScrollLeft, right: initialX }}
      dragTransition={{
        power: 0.3,
        timeConstant: 70,
        modifyTarget: snapTargetX,
      }}
    >
      {blankAddedNews.map((data, cardIndex) => (
        <CardNews setOnExpand={setOnExpand} data={data} key={data.id} cardIndex={cardIndex} app_width={app_width} card_gap_width ={card_gap_width} card_width = {card_width} isFocused={cardIndex === currentIndex} x={x} yMinus={yMinus} card_distance={card_gap_width * cardIndex}/>
      ))}
    </FloatingNewsCards_wrap>
  );
}

export default FloatingNewsCards;
