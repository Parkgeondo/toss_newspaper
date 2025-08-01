import { NewsWrapper, StyledScrollbar, ChangeScreen } from './styles';
import NewsBox from '../../Component/NewsBox';
import SavedNews from '../../Component/SavedNews';
import Tab from '../Tab';

import { newsData } from '../../data/newsData';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useMotionValue, animate } from "framer-motion";

import ScrollTracker from '../../utile/useScrollTraker';
import Syn from '../../utile/syn';

// selectedTab: 현재 선택되어 있는 탭
// savedNews: 현재 저장되어 있는 뉴스들

const News = ({
  setTabLine, 
  tabs, 
  selectedTab, 
  setSelectedTab, 
  savedNews, 
  setSavedNews,
  temSavedNews,
  setTemSavedNews, 
  setProgress, 
  scroll, 
  setScroll, 
  setTabControl
}) => {
  // 다른 곳에서도 사용할수있도록 만듬
  const x = useMotionValue(0);
  
  // 스크롤 제어 Ref
  const newsScrollbarRef = useRef(null);
  const savedScrollbarRef = useRef(null);

  // 페이지 이동 함수
  const pageMove = (moveLocation) => {
    animate(x, moveLocation, { type: "spring", stiffness: 300, damping: 30 });
  };

  // 탭의 변화를 감지하고 페이지 넘기기
  useEffect(() => {
    if (selectedTab === 'saved') {
      pageMove(-375);
    } else if (selectedTab === 'news') {
      pageMove(0);
    }
  }, [selectedTab]);

  // 드래그를 놓으면 함수가 실행
  const handleDragEnd = (e, info) => {
    if (info.offset.x < -150 && selectedTab === tabs[0]) {
      pageMove(-375);
      setSelectedTab(tabs[1]);
    } else if (info.offset.x >= -150 && selectedTab === tabs[0]) {
      pageMove(0);
      setSelectedTab(tabs[0]);
    } else if (info.offset.x > 150 && selectedTab === tabs[1]) {
      pageMove(0);
      setSelectedTab(tabs[0]);
    } else if (info.offset.x <= 150 && selectedTab === tabs[1]) {
      pageMove(-375);
      setSelectedTab(tabs[1]);
    }
  };

  // 드래그를 시작하면 함수 지정
  const [dragging, setDragging] = useState(false);

  // 현재 저장된 뉴스들의 스크롤 값 변경
  const handleProgressUpdate = useCallback((id, value) => {
    setTabLine(prev => {
      if (prev.get(id) === value) return prev;
      const next = new Map(prev);
      next.set(id, value);
      return next;
    });
  }, [setTabLine]);

  return (
    <ChangeScreen
      style={{ x }}
      drag="x"
      onDragEnd={(e, info) => {
        setDragging(false);
        handleDragEnd(e, info);
      }}
      onDragStart={() => {
        setDragging(true);
      }}
      dragConstraints={{ left: -375, right: 0 }}
    >
      <NewsWrapper scroll={scroll[0]} ref={newsScrollbarRef}>
        <ScrollTracker 
          scrollRef={newsScrollbarRef} 
          tabs={tabs} 
          newsScrollbarRef={newsScrollbarRef} 
          savedScrollbarRef={savedScrollbarRef} 
          scroll={scroll} 
          setScroll={setScroll} 
          otherRef={savedScrollbarRef} 
          id={0} 
          setTabControl={setTabControl} 
          dragging={dragging} 
          selectedTab={selectedTab}
        />
        {newsData.map((data, index) => (
          <NewsBox 
            key={data.id} 
            {...data} 
            index={index} 
            savedNews={savedNews} 
            setSavedNews={setSavedNews} 
            temSavedNews={temSavedNews} 
            setTemSavedNews={setTemSavedNews} 
            setProgress={setProgress}
          />
        ))}
      </NewsWrapper>
      <NewsWrapper scroll={scroll[1]} ref={savedScrollbarRef}>
        <ScrollTracker 
          scrollRef={savedScrollbarRef} 
          tabs={tabs} 
          newsScrollbarRef={newsScrollbarRef} 
          savedScrollbarRef={savedScrollbarRef} 
          scroll={scroll} 
          setScroll={setScroll} 
          otherRef={newsScrollbarRef} 
          id={1} 
          setTabControl={setTabControl} 
          dragging={dragging} 
          selectedTab={selectedTab}
        />
        {savedNews.map((data) => (
          <SavedNews 
            onProgress={handleProgressUpdate} 
            key={data} 
            id={data} 
            savedScrollbarRef={savedScrollbarRef}
          />
        ))}
      </NewsWrapper>
    </ChangeScreen>
  );
};

export default News;
