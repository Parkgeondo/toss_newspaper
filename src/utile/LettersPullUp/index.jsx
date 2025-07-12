import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Export_wrap, LettersPullUp_wrap, Normals_wrap } from "./styles";

// 두 배열의 x, y 값이 다른 인덱스만 반환
function getDifferentIndices(arr1, arr2) {
  const diffIndices = [];
  const len = Math.min(arr1.length, arr2.length);
  for (let i = 0; i < len; i++) {
    if (!arr1[i] || !arr2[i]) continue;
    if (arr1[i].x !== arr2[i].x || arr1[i].y !== arr2[i].y - 10) {
      diffIndices.push(i);
    }
  }
  return diffIndices;
}

const LettersPullUp = ({ text, width }) => {

  //제목의 문자열을 받는 부분
  const [letters, setLetters] = useState([]);

  //일반 카드일때 넓이
  const currentWidth = width[0];
  //확장 카드일때 넓이
  const exportWidth = width[1];

  //실제 DOM요소에 접근할 수 있도록
  const letterRefs = useRef([]);
  const normalsLetterRefs = useRef([]);

  //각 글자들의 위치
  const [exportLetters, setExportLetters] = useState([]);
  const [normalsExportLetters, setNormalsExportLetters] = useState([]);

  useEffect(() => {
    setLetters(text.split(""));
  }, [text]);

  // 위치 측정 함수
  const updateLetterPositions = (refs, setState, width) => {
    const newPositions = letters.map((letter, index) => {
      const el = refs.current[index];
      if (!el) return { x: 0, y: 0, text: letter };
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentNode.getBoundingClientRect();
      return {
        x: rect.left - parentRect.left,
        y: rect.top - parentRect.top,
        text: letter === ' ' ? '\u00A0' : letter
      };
    });
    setState(newPositions);
  };

  useEffect(() => {
    updateLetterPositions(letterRefs, setExportLetters, currentWidth);
  }, [letters, currentWidth]);

  useEffect(() => {
    updateLetterPositions(normalsLetterRefs, setNormalsExportLetters, exportWidth);
  }, [letters, exportWidth]);

  const diffIndices = getDifferentIndices(exportLetters, normalsExportLetters);

  // 텍스트 나타나는 애니메이션
  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: ({ index, baseDelay }) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: baseDelay + index * 0.01,
      },
    }),
  };

  // 텍스트 나타나는 애니메이션
  const pulldownVariant = {
    initial: { y: 0, opacity: 1 },
    animate: ({ index, baseDelay }) => ({
      y: 10,
      opacity: 0,
      transition: {
        delay: baseDelay + index * 0.01,
      },
    }),
  };


  // 공통 렌더링 함수
  const renderLetters = (refs, isPullUp) =>
    letters.map((letter, index) => {
      const isDiff = diffIndices.includes(index);
      const isVisible = isPullUp || isDiff;
      // Export_wrap(=isPullUp이 false)일 때만 0.5초 추가
      const baseDelay = isPullUp ? 0.05 : 0;
      return (
        <motion.div
          key={index}
          ref={el => refs.current[index] = el}
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0
          }}
          variants={isPullUp ? pullupVariant : pulldownVariant}
          custom={{ index, baseDelay }}
          animate={isDiff ? "animate" : false}
          initial="initial"
        >
          {letter === ' ' ? <span>&nbsp;</span> : letter}
        </motion.div>
      );
    });

  return (
    <LettersPullUp_wrap>
      <Export_wrap style={{ width: currentWidth }}>
        {renderLetters(letterRefs, false)}
      </Export_wrap>

      {/* 먼저 사라지는 글씨 */}
      {/*위치가 같은 글씨는 투명도를 0으로 */}
      <Normals_wrap style={{ width: exportWidth }}>
        {renderLetters(normalsLetterRefs, true)}
      </Normals_wrap>
    </LettersPullUp_wrap>
  );
};

export default LettersPullUp;