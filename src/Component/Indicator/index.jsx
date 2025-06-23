import { useEffect } from "react";
import {CardDetail_wrap, Indicator_wrap} from "./styles";
import { motion } from "framer-motion";
import { newsData } from '../../data/newsData';
import {CircleNews} from '../../Component/CircleNews'

export default function Indicator({ currentIndex }) {
  useEffect(() => {
    console.log(currentIndex)
  },[currentIndex])
  return (
    <>
      <Indicator_wrap>
        <CircleNews marginRight={0} id={currentIndex} />
        <div>
          {"AI 비서가 당신의 하루를 설계한다."} 
        </div>
      </Indicator_wrap>
    </>
  );
}