import { motion, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export default function CardDetail_part({
  data, id, index, y,
  containerRef,
  onProgress,
  cardHeights,
  totalHeightBefore
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      cardHeights.current[index] = ref.current.getBoundingClientRect().height;
    }
  }, []);

  useMotionValueEvent(y, "change", (latest) => {
    const cardStartY = totalHeightBefore(index);
    const height = cardHeights.current[index] || 1;
    const rawProgress = (Math.abs(latest) - cardStartY) / (height -  containerRef.current.getBoundingClientRect().height);
    const clamped = Math.max(0, Math.min(1, rawProgress));
    const percent = Math.round(clamped * 100);
    onProgress?.(id, percent);
  });

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
  )
}