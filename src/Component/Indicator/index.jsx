import { useEffect } from "react";
import { CardDetail_wrap, Indicator_wrap } from "./styles";
import { motion, useSpring, useTransform } from "framer-motion";
import { newsData } from '../../data/newsData';
import { CircleNews } from '../../Component/CircleNews';
import { useLayout } from '../../contexts/LayoutContext'; 
import { Indicator_position } from "./styles";

export default function Indicator({ progress, currentIndex }) {
  const { System_CONFIG } = useLayout();
  const indicator_y_visible = 36;
  const indicator_y_hide = -40;

  const transform_top = useTransform(progress, (latestX) => {
    return latestX <= -System_CONFIG.DefaultCard_To_Top ? indicator_y_visible : indicator_y_hide;
  });

  // 부드러운 애니메이션을 위한 스프링 설정
  const smoothY = useSpring(transform_top, {
    stiffness: 120, // 낮을수록 더 부드러움
    damping: 20,    // 높을수록 덜 출렁임
    mass: 0.5,      // 더 작으면 반응 빠름
  });

  return (
    <Indicator_position style={{ y: smoothY, x: `-50%` }}>
      <Indicator_wrap>
        <CircleNews marginRight={0} id={currentIndex} />
        {newsData[currentIndex-1] && (
          <div>
            {newsData[currentIndex-1].title}
          </div>
        )}
      </Indicator_wrap>
    </Indicator_position>
  );
}