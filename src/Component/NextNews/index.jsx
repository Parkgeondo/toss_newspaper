import { newsData } from '../../data/newsData';
import { NextNews_wrap } from './styles';
import { NextNews_part_wrap } from './styles';
import { NextNews_number } from './styles';
import { useTransform, useMotionValueEvent, useSpring } from 'framer-motion';

const NextNews_part = () => {
  return (
    <NextNews_part_wrap>
      <img src={newsData[0].smallImage} alt="news"/>
      <div className="nextNews_part_text">
        <div className="nextNews_part_text_title">
          <span>{newsData[0].title}</span>
        </div>
        <div className="nextNews_part_text_category">
          <div className="badge">{newsData[0].category}</div>
          <div className="badge">{newsData[0].date}</div>
        </div>
      </div>
    </NextNews_part_wrap>
  )
}

const NextNews = () => {
  return (
    <NextNews_wrap>
      <NextNews_part/>
      <NextNews_part/>
      <NextNews_part/>
    </NextNews_wrap>
  );
};

// NextNews_number를 별도 컴포넌트로 분리
export const NextNewsNumber = ({ number_y }) => {
  // number_y를 y 위치로 변환 (바닥에서 나오는 형태)
  const transform_y = useTransform(number_y, (latest) => {
    // latest가 20이면 0 (보임), -100이면 100 (숨김)
    return latest === 20 ? 0 : 100;
  });

  // 부드러운 애니메이션을 위한 스프링 설정
  const smoothY = useSpring(transform_y, {
    stiffness: 120,
    damping: 20,
    mass: 0.1,
  });
    
  useMotionValueEvent(number_y, "change", (latest) => {
    console.log('NextNewsNumber y position:', latest);
  });

  return (
    <NextNews_number style={{ y: smoothY, x: `-50%` }}>
      <div className="nextNews_number_button">1</div>
      <div className="nextNews_number_button">2</div>
      <div className="nextNews_number_button">3</div>
    </NextNews_number>
  );
};

export default NextNews;