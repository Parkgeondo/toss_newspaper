import { useState,useRef,useEffect,useCallback } from "react";
import { newsData } from "../../data/newsData";
import {SavedNewsWrapper} from "./styles";
import {motion, useScroll} from "framer-motion";

const SavedNews = ({ id,savedScrollbarRef,onProgress }) => {

  const savedData = newsData.find((item) => item.id === id);

  const {publisher, publisherImg, title, date,category, subTitle1, subTitle2, subTitle3, content1, content2, content3, content4, content5, data, bigImage} = savedData

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({

        //스크롤의 부모 주체
        container: savedScrollbarRef,

        //스크롤 주체
        target: ref,
        
        // offset: ["start center", "end center"]
        offset: ["start start","end end"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const clamped = Math.min(1, Math.max(0, latest)); // [0, 1] 사이 고정
      const percent = Number((clamped * 100).toFixed(0)); // 🔢 0.0 ~ 100.0 형태로 반올림
      onProgress(id, percent);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <SavedNewsWrapper ref={ref}>
        <div className="title">{title}</div>

        <div className="publishData">
          <img src={publisherImg} alt="" />
          {publisher}
          <div className="dot"></div>
          {category}
          <div className="dot"></div>
          {date}
        </div>

        <img className="bigImage" src={bigImage} alt="" />

        <div className="textBody">
          {subTitle1 && <div className="subtitle">{subTitle1}</div>}
          {content1 && <div className="content">{content1}</div>}

          {subTitle2 && <div className="subtitle">{subTitle2}</div>}
          {content2 && <div className="content">{content2}</div>}

          {subTitle3 && <div className="subtitle">{subTitle3}</div>}
          {content3 && <div className="content">{content3}</div>}

          {content4 && <div className="content">{content4}</div>}
          {content5 && <div className="content">{content5}</div>}
        </div>
    </SavedNewsWrapper>
  );
};

export default SavedNews;