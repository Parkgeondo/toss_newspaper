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
import FloatingNewsCards_background from '../FloatingNewsCards_background';

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

  // 공통 x 값 관리 (카드 가로 스크롤)
  const card_width = 265;
  const app_width = 375;
  const gap = 12;
  const card_gap_width = (card_width + gap);
  const offset = (app_width - card_width) * 0.5;
  const initialX = -card_gap_width + (offset - gap * 0.5);
  const maxScrollLeft = -(newsData.length + 1) * card_gap_width + (offset - gap * 0.5);
  
  const sharedX = useMotionValue(initialX);

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

  // 숫자페이지 위치값
  const number_y = useMotionValue(0);

  // 공통 yMinus 값 관리
  const sharedYMinus = useMotionValue(0);

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
      
      <FloatingNewsCards_background 
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
        sharedX={sharedX}
        sharedYMinus={sharedYMinus}
        card_width={card_width}
        app_width={app_width}
        card_gap_width={card_gap_width}
        initialX={initialX}
        maxScrollLeft={maxScrollLeft}
      />

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
        sharedX={sharedX}
        sharedYMinus={sharedYMinus}
        card_width={card_width}
        app_width={app_width}
        card_gap_width={card_gap_width}
        initialX={initialX}
        maxScrollLeft={maxScrollLeft}
      />

      
      <Header />
      <SaveBox savedNews={savedNews} temSavedNews={temSavedNews} progress={progress} />
      <AnimatedWave />
    </>
  );
}

export default Layout;

