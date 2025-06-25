import { useEffect } from "react";
import {CardDetail_wrap, Indicator_wrap} from "./styles";
import { motion, useSpring, useTransform } from "framer-motion";
import { newsData } from '../../data/newsData';
import {CircleNews} from '../../Component/CircleNews'

export default function Indicator({ progress, currentIndex }) {

  const transform_top = useTransform(progress, (latestX) => {
    return latestX <= -212 ? 36 : -40;
  });

  const smoothY = useSpring(transform_top, {
    stiffness: 120, // 낮을수록 더 부드러움
    damping: 20,    // 높을수록 덜 출렁임
    mass: 0.5,      // 더 작으면 반응 빠름
  });

  return (
    <>
      <Indicator_wrap style={{y : smoothY , x : `-50%`}}>
        <CircleNews marginRight={0} id={currentIndex} />
        <div>
          {"AI 비서가 당신의 하루를 설계한다."} 
        </div>
      </Indicator_wrap>
    </>
  );
}