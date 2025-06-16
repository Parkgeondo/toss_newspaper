import { useEffect, useState } from "react";
import { CircleNewsRowWrap } from "./style";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { newsData } from "../../data/newsData";

const size = 16;
const stroke = 1.6;
const gap = 8;
const radius = (size - stroke) / 2;
const circumference = radius * 2 * Math.PI;

const CircleNews = ({ id, isShrinking = false, offsetX, savedNews, temSavedNews}) => {
  const savedData = newsData.find((item) => item.id === id);

  return (
    <motion.svg
      initial={{ x: offsetX, scale: 1 }}
      style={{ marginRight: -gap, overflow: "visible"}}
      width={size}
      height={size}
      animate={{
        scale: isShrinking ? 0 : 1,
         x: offsetX,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      >
      <defs>
        <clipPath id={`circleClip-${id}`}>
          <circle cx={size / 2} cy={size / 2} r={radius} />
        </clipPath>
      </defs>
      <image
        href={savedData.smallImage}
        x={0}
        y={0}
        width={size}
        height={size}
        clipPath={`url(#circleClip-${id})`}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#F1F1F8"
        strokeWidth={stroke}
        opacity="1"
      />
    </motion.svg>
  );
};

const TemCircleNews = ({ progress, id }) => {
  const circleControls = useAnimation();
  const imageControls = useAnimation();
  const savedData = newsData.find((item) => item.id === id);

  useEffect(() => {
    circleControls.start({
      strokeDashoffset: circumference * (1 - progress),
      scale: 1,
      transition: { duration: 0.55, ease: "easeInOut" },
    });
    imageControls.start({
      opacity: progress,
      transition: { duration: 0.55, ease: "easeInOut" },
    });
  }, [progress, circleControls, imageControls]);

  return (
    <svg
      width={size}
      height={size}
      style={{ marginRight: 0, overflow: "visible", position: "absolute", right: "0px" }}
    >
      <defs>
        <clipPath id={`circleClip-${id}`}>
          <circle cx={size / 2} cy={size / 2} r={radius} />
        </clipPath>
      </defs>
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <rect
          x={0}
          y={0}
          width={size}
          height={size}
          fill="#ECF1F2"
          clipPath={`url(#circleClip-${id})`}
        />
      </motion.g>
      <motion.g
        initial={{ opacity: 0 }}
        animate={imageControls}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <image
          href={savedData.smallImage}
          x={0}
          y={0}
          width={size}
          height={size}
          clipPath={`url(#circleClip-${id})`}
        />
      </motion.g>
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        fill="none"
        stroke="#2870DE"
        strokeWidth={stroke}
        opacity="1"
        animate={circleControls}
        initial={{ rotate: -90 }}
        exit={{ opacity: 0, rotate: -90 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
};

const CircleNewsRow = ({ savedNews, temSavedNews, progress, width, setWidth }) => {

  //한번에 보여줄 카운트 양
  const visibleMax = 5;

  //전체 원의 갯수
  const totalCount = savedNews.length + temSavedNews.length;
  
  //초과한 원의 갯수
  const overCount = Math.max(0, totalCount - visibleMax);

  const isSaved = savedNews.includes(temSavedNews[0]);

  useEffect(() => {

    // 보여지는 원의 갯수
      const visibleCount = Math.min(totalCount, visibleMax);

    // 보여지는 원의 갯수에 따른 넓이 조절
      setWidth(visibleCount > 0 ? size + (visibleCount - 1) * gap : 0);


  }, [temSavedNews, savedNews]);

  return (
    <CircleNewsRowWrap width={width}>
      {savedNews.map((key, index) => {
        const isHidden = index < overCount;
        //이 부분 수정해보기
        const offsetX = !isHidden ? -8 * overCount : 0;
        return(
        <CircleNews key={index} id={key} isShrinking={isHidden} offsetX={offsetX} savedNews={savedNews} temSavedNews={temSavedNews}/>
      )})}
      <AnimatePresence>
        {(temSavedNews[0]) > 0 && (
          <TemCircleNews key={temSavedNews[0]} progress={progress} id={temSavedNews[0]} />
        )}
      </AnimatePresence>
    </CircleNewsRowWrap>
  );
};

export default CircleNewsRow;
