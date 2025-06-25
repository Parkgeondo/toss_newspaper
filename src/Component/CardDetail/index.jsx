import { useEffect, useState, useRef } from "react";
import {CardDetail_wrap} from "./styles";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import { newsData } from '../../data/newsData';

export default function CardDetail({ progress,isDragging}) {

  const cardRefs = useRef(new Map()); // 각 뉴스 ID별 ref 저장
  const containerRef = useRef(null); // 전체 스크롤 컨테이너 (CardDetail_wrap)

  //드래그 관장
  const y = useMotionValue(0);

  //투명도 조절
  const [isFadingOut, setIsFadingOut] = useState(true);

  //일반 카드가 움직이면...
  useMotionValueEvent(progress, "change", (latest) => {
  //만약 주도권이 일반카드에게 있는 경우
    if (isDragging) {
  //일반 카드의 위치를 확장된 카드가 따라감
      y.set(latest + 212);
    }
  });

  //확장 카드가 움직이면...
  useMotionValueEvent(y, "change", (latest) => {
  //만약 확장 카드가 화면 위로 나가면
    if(latest > 0 ){
  //만약 확장 카드를 숨김
      // setOnExpand(false)
      setIsFadingOut(false)
    }
  })

  return (
    <CardDetail_wrap ref={containerRef} drag='y' style={{ y,opacity: isFadingOut ? 1 : 0.2}} 
    >
      {newsData.map((data) => (
      <motion.div className="drag" key={data.id} ref={(el) => cardRefs.current.set(data.id, el)}>
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