import { useEffect,useState } from "react";
import {CircleNewsRowWrap} from "./style"
import {motion, AnimatePresence} from 'framer-motion'
import { useAnimation } from "framer-motion";
import { newsData } from '../../data/newsData';

//저장된 뉴스들
const CircleNews = ({id}) => {

  //원 속성
  //원 사이즈
  const size = 16;
  // 원 두께
  const stroke = 1.6;

  //특정 뉴스 데이터
  const savedData = newsData.find((item) => item.id === id);

  return (
    <>
       <svg
         style={{ marginRight: -8, overflow:"visible" }}
          width={16}
          height={16}
        >
        <defs>
          <clipPath id={`circleClip-${id}`}>
            <circle cx={8} cy={8} r={7.2} />
          </clipPath>
        </defs>
        <image
          href={savedData.smallImage}
          x={0}
          y={0}
          width={16}
          height={16}
          clipPath={`url(#circleClip-${id})`}
        />
          <circle
            cx={8}
            cy={8}
            r={8-0.8}
            fill="none"
            stroke="white"
            strokeWidth="1.6"
            opacity="1"
          />
        </svg>
    </>
  );
};

//임시 뉴스들 position 없애기
const TemCircleNews = ({progress, id}) => {
  
  //원이 채워지는 비율
  const circleControls = useAnimation();
  
  //배경 이미지 투명도 조절
  const imageControls = useAnimation();

  //다시 누르면 사라지는 효과도 넣기
  useEffect(() => {
    circleControls.start({
      strokeDashoffset: 45.24 * (1 - progress),
      transition: { duration: 0.55, ease: "easeInOut" },
    });

    imageControls.start({
      opacity: progress,
      transition: { duration: 0.55, ease: "easeInOut" },
    })
  }, [progress, circleControls]);

  //특정 뉴스 데이터
  const savedData = newsData.find((item) => item.id === id);

  return (
    <>
       <svg
          width={16}
          height={16}
          style={{ marginRight: 0, overflow:"visible",position:'absolute', right:'0px' }}
        >
        <rect
          x={0}
          y={0}
          width={16}
          height={16}
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
}

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