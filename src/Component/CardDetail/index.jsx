import { useEffect, useState } from "react";
import {CardDetail_wrap} from "./styles";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { newsData } from '../../data/newsData';

export default function CardDetail({ progress,isDragging,setOnExpand }) {

  const y = useMotionValue(0);

  //투명도 조절
  const [isFadingOut, setIsFadingOut] = useState(true);

  useMotionValueEvent(progress, "change", (latest) => {
    if (isDragging) {
      y.set(latest + 212);
    }
  });

  useMotionValueEvent(y, "change", (latest) => {
    if(latest > 0 ){
      // setOnExpand(false)
      setIsFadingOut(false)
    }
  })

  return (
    <CardDetail_wrap drag='y' style={{ y,opacity: isFadingOut ? 1 : 0.2,}} 
      // onDragStart={()=>{}}
    >
      {newsData.map((data) => (
      <motion.div className="drag" key={data.id}>
        <img src={data.bigImage} className="thumnail" alt="" />
        <div className="gradient"></div>
        <motion.div className="text" style={{
          }}>
          <div className="publisher">
            <img src={data.publisherImg} alt="" />
            {data.publisher}
          </div>
          <div className="title">{data.title}</div>
          <div className="badge">{data.category}</div>
          <div className="badge">{data.date}</div>
          <motion.div className="textBody"
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
        </motion.div>
      </motion.div>
      ))}
    </CardDetail_wrap>
  );
}