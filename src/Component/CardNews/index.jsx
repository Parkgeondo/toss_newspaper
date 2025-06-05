import { useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { CardNews_wrap } from "./styles"
import { CardNews_drag } from "./styles"
import card_effect from "../../img/card_effect.png"
import { useEffect } from "react";
import { motion } from "framer-motion";


function CardNews({setOnExpand, data, cardIndex, card_gap_width , card_width, app_width, isFocused,x,yMinus , card_distance}) {
const y = useMotionValue(0);

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
        width,
        x:temy,
        y
      }}
    >
      <motion.img  style={{
          height,
          borderRadius:radius,
          opacity
      }}src={card_effect} className="card_effect" alt="" />
      <CardNews_wrap>
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