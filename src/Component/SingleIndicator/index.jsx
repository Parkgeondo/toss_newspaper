import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Indicator_wrap } from '../Indicator/styles';
import { Indicator_SVG } from '../../layouts/Indicator_array/styles';
import { CircleNews } from '../CircleNews';
import { newsData } from '../../data/newsData';

function buildRoundedRectPath({ w, h, r }) {
  // 시작점을 "좌측 중앙"으로 잡은 라운드 사각형 path
  return `
    M 0 ${h/2}
    V ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    H ${w - r}
    A ${r} ${r} 0 0 1 ${w} ${r}
    V ${h - r}
    A ${r} ${r} 0 0 1 ${w - r} ${h}
    H ${r}
    A ${r} ${r} 0 0 1 0 ${h - r}
    V ${h/2}
  `;
}

function SingleIndicator({ progress, index, news }) {
  const ref = useRef(null);
  const [W, setW] = useState(264.06); // 기본값 설정
  const H = 39;
  const R = 19.5;

  // DOM이 마운트된 후 실제 너비 측정
  useEffect(() => {
    if (ref.current) {
      setW(ref.current.clientWidth);
    }
  }, []);

  const shape = {
    strokeWidth: 4,
    strokeLinecap: 'round',
    fill: 'transparent',
  };

  const raw = useMotionValue(0);
  const dasharray = useTransform(raw, (p) => `${p} ${1 - p}`);
  const dashoffset = useTransform(raw, (p) => p / 2);

  useEffect(() => {
    const targetProgress = progress || 0;
    const controls = animate(raw, targetProgress, {
    });
    return () => controls.stop();
  }, [progress]);

  const currentIndex = index + 1;
  const d = buildRoundedRectPath({ w: W, h: H, r: R });

  return (
    <Indicator_wrap ref={ref}>
      <Indicator_SVG>
        <motion.path
          d={d}
          pathLength={1}
          stroke="#0d63f8"
          style={{
            ...shape,
            strokeDasharray: dasharray,
            strokeDashoffset: dashoffset,
          }}
        />
      </Indicator_SVG>

      <CircleNews marginRight={0} id={currentIndex} />
      {newsData[currentIndex - 1] && (
        <div>{newsData[currentIndex - 1].title}</div>
      )}
    </Indicator_wrap>
  );
}

export default SingleIndicator;

