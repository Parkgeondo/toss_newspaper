import { useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { CardNews_wrap } from "./styles"
import { CardNews_drag } from "./styles"
import card_effect from "../../img/card_effect.png"
import { useEffect } from "react";
import { motion } from "framer-motion";


function CardNews({setOnExpand, data, cardIndex, card_gap_width , card_width, app_width, isFocused,x,yMinus , card_distance}) {
const y = useMotionValue(0);

  // x와 y에 따라 크기(scale)를 계산
  const distance = useTransform([x, y], ([latestX, latestY]) => {
    const screenCenter = app_width * 0.5;
    const cardCenterX = card_distance + latestX;

    // x 방향: 중심에서 멀어질수록 작아짐
    const rawX = Math.abs(cardCenterX - screenCenter + card_gap_width * 0.5);
    const maxX = card_width * 2;
    const clampedX = Math.min(rawX, maxX);
    const normX = clampedX / maxX; // 0 ~ 1

    // scale 계산: 기본 1에서 x는 축소, y는 확대
    const scale = 1 - normX * 0.2;
    return scale;
  });

  useMotionValueEvent(y, "change", (latest) => {
    if(y.get() < -240){
      setOnExpand(true);
    }
    yMinus.set(latest)
  })

  const width = useTransform(y, [0,-240], [265,375]);
  const height = useTransform(y, [0,-240], [426,810]);
  const opacity = useTransform(y, [0,-240], [1,0]);
  const temy = useTransform(yMinus,[0,-240],[0,-55]);
  const radius = useTransform(y,[0,-240],[24,12]);

  if (data.isBlank) {
    return <CardNews_wrap
    style={{
      opacity:'0',
      width:265
    }}
    />;
  }

  return(
    <CardNews_drag
      drag="y"
      dragDirectionLock   // ✅ 중요!
      dragListener={true}
      dragConstraints={{ top: -1000, bottom: 0 }}
      style={{
        scale:distance,
        width,
        x:temy,
        y,
        borderRadius:radius,
      }}
    >
      <motion.img  style={{
          height,
          borderRadius:radius,
          opacity
      }}src={card_effect} className="card_effect" alt="" />
      <CardNews_wrap
      style={{
        borderRadius:radius
      }}
      >
        <div className="gradient"></div>
        <img src={data.bigImage} className="thumnail" alt="" />
        <motion.div className="text" style={{
          }}>
          <div className="publisher">
            <img src={data.publisherImg} alt="" />
            {data.publisher}
          </div>
          <div className="title">{data.title}</div>
          <div className="badge">{data.category}</div>
          <div className="badge">{data.date}</div>
          
        </motion.div>
      </CardNews_wrap>
      <motion.div className="plus"
        style={{
          height,
          borderRadius:radius
        }}
      ></motion.div>
    </CardNews_drag>
  )
}

export default CardNews