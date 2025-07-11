import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import LettersPullUp from "../../utile/LettersPullUp";

export default function CardDetail_part({
  data, id, index, y,
  containerRef
}) {
  const ref = useRef(null);
  const titleRef = useRef(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const [titleWidth, setTitleWidth] = useState(0);

  // title 컨테이너의 width를 감지


  return (
      <motion.div className="drag" key={data.id} ref={ref}>
        <img src={data.bigImage} className="thumnail" alt="" />
        <div className="gradient"></div>
        <motion.div className="text" style={{
          }}>
          <div className="publisher">
            <img src={data.publisherImg} alt="" />
            {data.publisher}
          </div>
          {/* <div className="title" ref={titleRef}>{data.title}</div> */}
          <div className="title" ref={titleRef}>
            <LettersPullUp 
              text={data.title}
              width={titleWidth}
              className="title-text"
            />
          </div>
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
  )
}