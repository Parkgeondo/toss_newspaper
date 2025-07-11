import { newsData } from '../../data/newsData';
import { NextNews_wrap } from './styles';
import { NextNews_part_wrap } from './styles';
import { NextNews_number } from './styles';
import { useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import React, { useState } from 'react';

const NextNews_part = ({ data }) => {
  return (
    <NextNews_part_wrap>
      <img src={data.smallImage} alt="news"/>
      <div className="nextNews_part_text">
        <div className="nextNews_part_text_title">
          <span>{data.title}</span>
        </div>
        <div className="nextNews_part_text_category">
          <div className="badge">{data.category}</div>
          <div className="badge">{data.date}</div>
        </div>
      </div>
    </NextNews_part_wrap>
  )
}

const NextNews = ({ currentIndex }) => {


  // 3개씩 순환해서 데이터 추출
  const getDisplayData = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(newsData[(currentIndex + i) % newsData.length]);
    }
    return result;
  };

  const displayData = getDisplayData();

  return (
    <NextNews_wrap>
      {displayData.map((data, idx) => (
        <NextNews_part key={idx} data={data} />
      ))}
    </NextNews_wrap>
  );
};

// NextNews_number를 별도 컴포넌트로 분리
export const NextNewsNumber = ({ number_y }) => {
  const [selected, setSelected] = useState(1); // 기본값 1

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
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`nextNews_number_button${selected === num ? ' active' : ''}`}
          onClick={() => setSelected(num)}
        >
          {num}
        </div>
      ))}
    </NextNews_number>
  );
};

export default NextNews;