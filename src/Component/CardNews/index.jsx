import { useAnimate, useMotionTemplate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { CardNews_clip, CardNews_wrap } from "./styles"
import { CardNews_drag } from "./styles"
import card_effect from "../../img/card_effect.png"
import clip from "../../img/clip.png"
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";


function CardNews({setOnExpand, data, cardIndex, card_gap_width, card_width, app_width, isFocused,x,yMinus ,card_distance, setSavedNews,savedNews,progress, setProgress,id,setTemSavedNews}) {
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
    if(progress_.get() > 0.98 && !savedNews.includes(id)) {
      console.log(savedNews, id, isFocused)
      handleSaveNews()
    }
    //상단으로 전달용 
    yMinus.set(latest)
  })
  const [scope, animate] = useAnimate()
  const progress_ = useTransform(y, [100,550], [0,1]);

  //뉴스 저장하기
  const handleSaveNews = useCallback(() => {
    setSavedNews((prev) =>
      [...prev, id]
    );
    setTemSavedNews([]);
    setProgress(0);
  }, [setSavedNews, setTemSavedNews, setProgress, id]);


  //드래그 위로 올릴시,
const dragUp = () => {
  const dragY = y.get()
  if(dragY<-20){
    animate(scope.current, { y: -242 }, { duration: 0.4, ease: "circOut" })
  }else if(dragY>-20 && dragY<20){
    animate(scope.current, { y: 0 }, { duration: 0.4, ease: "circOut" })
  }else if(dragY>20){
    animate(scope.current, { y: 550 }, { duration: 0.4, ease: "circOut" })
  }
}

  const width = useTransform(y, [0,-240], [265,375]);
  const height = useTransform(y, [0,-240], [426,810]);
  const opacity = useTransform(y, [0,-240], [1,0]);
  const temy = useTransform(yMinus,[0,-240],[0,-55]);
  const radius = useTransform(y,[0,-240],[24,12]);

  const textBody_opacity = useTransform(y, [0,-240], [0,480]);
  const [textMaskPercent, setTextMaskPercent] = useState(0);
  useMotionValueEvent(textBody_opacity, "change", (latest) => {
    setTextMaskPercent(latest);
  });
  const textBody_scale = useTransform(y, [0,-240], [0.651,1]);


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
        ref={scope}
        onDragEnd={dragUp}
        dragDirectionLock   // ✅ 중요!
        dragListener={true}
        // dragConstraints={{ top: -1000, bottom: 0 }}
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
          borderRadius:radius,
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
        <motion.div className="textBody"
        textBody_opacity = {textMaskPercent}
          style={{
            scale:textBody_scale,
            x:'-50%',
            WebkitMaskSize: `100% ${textMaskPercent}px`,
            maskSize: `100% ${textMaskPercent}px`,
          }}
        >
          {data.subTitle1 && <div className="subtitle">{data.subTitle1}</div>}
          {data.content1 && <div className="content">{data.content1}</div>}

          {data.subTitle2 && <div className="subtitle">{data.subTitle2}</div>}
          {data.content2 && <div className="content">{data.content2}</div>}

          {data.subTitle3 && <div className="subtitle">{data.subTitle3}</div>}
          {data.content3 && <div className="content">{data.content3}</div>}

          {data.content4 && <div className="content">{data.content4}</div>}
          {data.content5 && <div className="content">{data.content5}</div>}
        </motion.div>
        <motion.div className="plus"
          style={{
            height,
            borderRadius:radius
          }}>
            {/* <motion.div className="drag_Button">
              <img src={clip}></img>아래로 당겨 저장하기
            </motion.div> */}
          </motion.div>
      </CardNews_drag>
  )
}

export default CardNews