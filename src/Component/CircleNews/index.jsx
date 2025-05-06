import { useEffect, useState } from "react";
import { CircleNewsRowWrap } from "./style";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { newsData } from "../../data/newsData";

const size = 16;
const stroke = 1.6;
const gap = 8;
const radius = (size - stroke) / 2;
const circumference = radius * 2 * Math.PI;

const CircleNews = ({ id }) => {
  const savedData = newsData.find((item) => item.id === id);

  return (
    <svg style={{ marginRight: -gap, overflow: "visible" }} width={size} height={size}>
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
        stroke="white"
        strokeWidth={stroke}
        opacity="1"
      />
    </svg>
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
        <defs>
          <clipPath id={`circleClip-${id}`}>
            <circle cx={8} cy={8} r={7.2} />
          </clipPath>
        </defs>
        {savedData?.smallImage && (
          <motion.g 
            opacity="0"
            animate={imageControls}>
            <image
              href={savedData.smallImage}
              x={0}
              y={0}
              width={16}
              height={16}
              clipPath={`url(#circleClip-${id})`}
            />
          </motion.g>
        )}
          <motion.circle
            cx={8}
            cy={8}
            r={8-0.8}
            strokeDasharray={45.24}
            strokeDashoffset={(45.24)}
            fill="none"
            stroke="#2870DE"
            strokeWidth="1.6"
            opacity="1"
            animate={circleControls}
            transform="rotate(-90 8 8)"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }} 
          />
        </svg>
    </>
  );
};

const CircleNewsRow = ({ savedNews, temSavedNews, progress}) => {
  const [width,setWidth] = useState(0)
  useEffect(()=>{
   setWidth(savedNews.length > 0 ||  temSavedNews > 0 ? (16)+((savedNews.length + temSavedNews.length - 1)*8):0)
  },[temSavedNews,savedNews])
  return(
   <CircleNewsRowWrap width={width}>
    {savedNews.map((key)=>{
      return(
       <CircleNews key={key} id={key}></CircleNews>
      )
    })}
    <AnimatePresence>
      {temSavedNews.length === 0 ? '': <TemCircleNews progress={progress} id={temSavedNews[0]}></TemCircleNews>}
    </AnimatePresence>
   </CircleNewsRowWrap>
  )
}

export default CircleNewsRow;
