import { useEffect,useState } from "react";
import {CircleNewsRowWrap} from "./style"

//저장된 뉴스들
const CircleNews = ({}) => {

  //원이 채워지는 비율
  const [progress, setProgress] = useState(0);

  //다시 누르면 사라지는 효과도 넣기

  return (
    <>
       <svg
         style={{ marginRight: -8 }}
          width={16}
          height={16}
        >
          <circle
            cx={8}
            cy={8}
            r={8-0.8}
            fill="white"
            stroke="#2870DE"
            strokeWidth="1.6"
            opacity="1"
          />
        </svg>
    </>
  );
};

//임시 뉴스들 position 없애기
const TemCircleNews = ({}) => {
  return (
    <>
       <svg
          width={16}
          height={16}
        >
          <circle
            cx={8}
            cy={8}
            r={8-0.8}
            fill="white"
            stroke="#2870DE"
            strokeWidth="1.6"
            opacity="1"
          />
        </svg>
    </>
  );
}

const CircleNewsRow = ({ savedNews, temSavedNews}) => {
  const [width,setWidth] = useState(0)
  useEffect(()=>{
   setWidth(savedNews.length > 0 ||  temSavedNews > 0 ? 16*2+((savedNews.length + temSavedNews.length)-1)*8:16)
  },[temSavedNews,savedNews])
  
  return(
   <CircleNewsRowWrap width={width}>
    {savedNews.map((key)=>{
      return(
       <CircleNews key={key}></CircleNews>
      )
    })}
    {temSavedNews.length === 0 ? '': <TemCircleNews></TemCircleNews>}   
   </CircleNewsRowWrap>
  )
}

export default CircleNewsRow;