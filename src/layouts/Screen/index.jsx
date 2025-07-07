import Header from '../../Component/Header';
import { useState, useEffect, use } from 'react';
import { newsData } from '../../data/newsData';
import AnimatedWave from '../../utile/wavyShader _background';
import FloatingNewsCards from '../FloatingNewsCards';
import { useMotionValue, useMotionValueEvent } from 'framer-motion';
import CardDetail from '../../Component/CardDetail';
import SaveBox from "../../Component/SaveBox";
import Indicator from '../../Component/Indicator';
import { NextNewsNumber } from '../../Component/NextNews';

function Layout({ setOnExpand, onExpand, containerRef }) {
  // 뉴스 저장 관련 상태
  const [savedNews, setSavedNews] = useState([]);
  const [temSavedNews, setTemSavedNews] = useState([]);

  // 애니메이션 관련 상태
  const progress = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const detailIsDragging = useMotionValue(false);
  const [isFadingOut, setIsFadingOut] = useState(true);

  // 카드 관련 상태
  const [currentIndex, setCurrentIndex] = useState(1);

  // 탭 진행율 상태
  const [tabLine, setTabLine] = useState(() => {
    const initialMap = new Map();
    newsData.forEach(news => {
      initialMap.set(news.id, 0);
    });
    return initialMap;
  });

  // 드래그 방향
  const [dragDirection, setDragDirection] = useState(null);

  // 숫자페이지
  const number_y = useMotionValue(0);

  useMotionValueEvent(progress, "change", (latest) => {
    // console.log(latest)
    });

  useEffect(() => {
    console.log("onExpand",onExpand)
  }, [onExpand])

  useEffect(() => {
    console.log("isFadingOut",isFadingOut)
  }, [isFadingOut])

  return (
    <>
      <Indicator progress={progress} currentIndex={currentIndex} />
      <NextNewsNumber number_y={number_y}/>
      
      {onExpand && (
        <CardDetail
          dragDirection={dragDirection}
          setDragDirection={setDragDirection}
          detailIsDragging={detailIsDragging}
          setDetailIsDragging={(value) => detailIsDragging.set(value)}
          isFadingOut={isFadingOut}
          setIsFadingOut={setIsFadingOut}
          currentIndex={currentIndex}
          setIsDragging={setIsDragging}
          containerRef={containerRef}
          setTabLine={setTabLine}
          tabLine={tabLine}
          setOnExpand={setOnExpand}
          isDragging={isDragging}
          id={currentIndex}
          progress={progress}
          number_y={number_y}
        />
      )}
      
      {onExpand && (
        <div
          key="background"
          className="background"
          style={{
            backgroundColor: "#20262A",
            opacity: isFadingOut ? 1 : 0,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 110
          }}
        />
      )}
      
      <FloatingNewsCards
        dragDirection={dragDirection}
        setDragDirection={setDragDirection}
        detailIsDragging={detailIsDragging}
        setDetailIsDragging={(value) => detailIsDragging.set(value)}
        isFadingOut={isFadingOut}
        setIsFadingOut={setIsFadingOut}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        setTemSavedNews={setTemSavedNews}
        savedNews={savedNews}
        setSavedNews={setSavedNews}
        progress={progress}
        setOnExpand={setOnExpand}
        onExpand={onExpand}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      
      <Header />
      <SaveBox savedNews={savedNews} temSavedNews={temSavedNews} progress={progress} />
      <AnimatedWave />
    </>
  );
}

export default Layout;

