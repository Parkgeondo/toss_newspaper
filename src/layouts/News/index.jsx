import { NewsWrapper, StyledScrollbar, ChangeScreen } from './styles';
import NewsBox from '../../Component/NewsBox';
import SavedNews from '../../Component/SavedNews'
import Tab from '../Tab';

import { newsData } from '../../data/newsData';
import { useRef, useState, useEffect } from 'react';
import { useMotionValue, animate } from "framer-motion";

import ScrollTracker from'../../utile/useScrollTraker';

//selectedTab 현재 선택되어 있는 탭
//savedNews는 현재 저장되어 있는 뉴스들

const News = ({tabs, selectedTab, setSelectedTab, savedNews, setSavedNews,temSavedNews,setTemSavedNews, progress, setProgress, scroll, setScroll}) => {

  const newsScrollbarRef = useRef(null);
  const savedScrollbarRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const timeoutRef = useRef(null);

  //스크롤한후, 1초뒤 스크롤 없앰
  const handleScroll = (e) => {
    setScrolling(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setScrolling(false);
    }, 1000);
  };

  //그 페이지 이동 함수
  const pageMove = (moveLocation) => {
    animate(x, moveLocation, { type: "spring", stiffness: 300, damping: 30 });
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  //탭의 변화를 감지하고 페이지 넘기기
  useEffect(() => {
    if (selectedTab === 'saved') {
      pageMove(-375);
    } else if (selectedTab === 'news') {
      pageMove(0);
    }
  }, [selectedTab]);

  //다른 곳에서도 사용할수있도록 만듬
  const x = useMotionValue(0);

  //드래그를 놓으면 함수가 실행
  const handleDragEnd = (e, info) => {
    if (info.offset.x < -150 && selectedTab === 'news') {
      pageMove(-375);
      setSelectedTab('saved')
    }else if(info.offset.x >= -150 && selectedTab === 'news'){
      pageMove(0);
      setSelectedTab('news')
    }else if(info.offset.x > 150 && selectedTab === 'saved'){
      pageMove(0);
      setSelectedTab('news')
    }else if(info.offset.x <= 150 && selectedTab === 'saved'){
      pageMove(-375);
      setSelectedTab('saved')
    }
  }


  return (

    //양옆으로 페이지 슬라이드
    <ChangeScreen
      style={{ x }}
      drag="x"
      onDragEnd={handleDragEnd}
      dragConstraints={{ left: -375, right: 0 }}
      >
      <Tab tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} savedNews={savedNews} setSavedNews={setSavedNews} temSavedNews={temSavedNews} setTemSavedNews={setTemSavedNews} progress={progress} scroll={scroll}></Tab>
      <NewsWrapper scroll={scroll}>
          <StyledScrollbar
            ref={newsScrollbarRef}
            disableTracksWidthCompensation
          >
            {/* 스크롤 계산 */}
            <ScrollTracker scrollRef={newsScrollbarRef} setScroll={setScroll}/>
              {newsData.map((data) => (
                <NewsBox key={data.id} {...data} savedNews={savedNews} setSavedNews={setSavedNews} temSavedNews={temSavedNews} setTemSavedNews={setTemSavedNews} setProgress={setProgress}/>
              ))}
          </StyledScrollbar>
      </NewsWrapper>
      <NewsWrapper scroll={scroll}>
        <StyledScrollbar
            ref={savedScrollbarRef}
            disableTracksWidthCompensation
          >
            {/* 스크롤 계산 */}
            <ScrollTracker scrollRef={savedScrollbarRef} setScroll={setScroll}/>
          {savedNews.map((data) => (
            <SavedNews key={data} id={data}></SavedNews>
          ))}
        </StyledScrollbar>
      </NewsWrapper>
    </ChangeScreen>
  );
};

export default News;
