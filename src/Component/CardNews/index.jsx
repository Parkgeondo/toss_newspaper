import { useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { CardNews_wrap } from "./styles"
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
  const height = useTransform(y, [0,-240], [0,386]);
  const temy = useTransform(yMinus,[0,-240],[0,-55]);
  const ySlow = useTransform(y, v => v * 0.5);

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
      {/* <img src={card_effect} className="card_effect" alt="" /> */}
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