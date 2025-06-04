import { useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { CardNews_wrap } from "./styles"
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

  // y 방향: 위로 드래그할수록 커짐
  const rawY = Math.max(-latestY, 0); // 음수일 때만 사용
  const maxY = 200;
  const clampedY = Math.min(rawY, maxY);
  const normY = clampedY / maxY; // 0 ~ 1

  // scale 계산: 기본 1에서 x는 축소, y는 확대
  const scale = 1 - normX * 0.2 + normY * 0.41;
  return scale;
});
  const inverseScale = useTransform(distance, latest => 1 / latest);
  const height = useTransform(y, [0, -300], ["424px", "800px"]);

  useMotionValueEvent(y, "change", (latest) => {
    console.log(latest)
  })

  if (data.isBlank) {
    return <CardNews_wrap
    style={{ opacity:'0' }}
    />;
  }

  return(
    <>
    <CardNews_wrap
      drag="y"
      dragDirectionLock   // ✅ 중요!
      dragListener={true}
      dragConstraints={{ top: -1000, bottom: 0 }}
      style={{
        width,
        x:temy,
        y
      }}
    >
      <img src={card_effect} className="card_effect" alt="" />
      <div className="gradient"></div>
      <motion.img src={data.bigImage} className="thumnail" alt="" style={{scale:inverseScale, x:'-50%', y:'0px'}}/>
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
      <motion.div className="plus"
      style={{
        y:height
      }}
      ></motion.div>
    </CardNews_wrap>
 
    </>
  )
}

export default CardNews