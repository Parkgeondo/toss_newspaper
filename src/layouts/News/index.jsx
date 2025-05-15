import { NewsWrapper, StyledScrollbar, ChangeScreen } from './styles';
import NewsBox from '../../Component/NewsBox';
import SavedNews from '../../Component/SavedNews'
import Tab from '../Tab';

import { newsData } from '../../data/newsData';
import { useRef, useState, useEffect } from 'react';
import { useMotionValue, animate } from "framer-motion";

import ScrollTracker from'../../utile/useScrollTraker';
import Syn from '../../utile/syn';

//selectedTab 현재 선택되어 있는 탭
//savedNews는 현재 저장되어 있는 뉴스들

const News = ({tabs, selectedTab, setSelectedTab, savedNews, setSavedNews,temSavedNews,setTemSavedNews, setProgress, scroll, setScroll, setTabControl}) => {
  
    //다른 곳에서도 사용할수있도록 만듬
    const x = useMotionValue(0);
  
  //스크롤 제어 Ref
  const newsScrollbarRef = useRef(null);
  const savedScrollbarRef = useRef(null);

  //그 페이지 이동 함수
  const pageMove = (moveLocation) => {
    animate(x, moveLocation, { type: "spring", stiffness: 300, damping: 30 });
  }

  //탭의 변화를 감지하고 페이지 넘기기
  useEffect(() => {
    if (selectedTab === 'saved') {
      pageMove(-375);
    } else if (selectedTab === 'news') {
      pageMove(0);
    }
  }, [selectedTab]);


  //드래그를 놓으면 함수가 실행
  const handleDragEnd = (e, info) => {
    if (info.offset.x < -150 && selectedTab === tabs[0]) {
      pageMove(-375);
      setSelectedTab(tabs[1])
    }else if(info.offset.x >= -150 && selectedTab === tabs[0]){
      pageMove(0);
      setSelectedTab(tabs[0])
    }else if(info.offset.x > 150 && selectedTab === tabs[1]){
      pageMove(0);
      setSelectedTab(tabs[0])
    }else if(info.offset.x <= 150 && selectedTab === tabs[1]){
      pageMove(-375);
      setSelectedTab(tabs[1])
    }
  }

  //드래그를 시전하면 함수 지정
  const [dragging, setDragging] = useState(false);

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
            <ScrollTracker scrollRef={newsScrollbarRef} tabs={tabs} newsScrollbarRef={newsScrollbarRef} savedScrollbarRef={savedScrollbarRef} scroll={scroll} setScroll={setScroll} otherRef={savedScrollbarRef} id={0} setTabControl={setTabControl} dragging={dragging} selectedTab={selectedTab}/>
              {newsData.map((data) => (
                <NewsBox key={data.id} {...data} savedNews={savedNews} setSavedNews={setSavedNews} temSavedNews={temSavedNews} setTemSavedNews={setTemSavedNews} setProgress={setProgress}/>
              ))}
      </NewsWrapper>
      <NewsWrapper scroll={scroll[1]} ref={savedScrollbarRef}>
            <ScrollTracker scrollRef={savedScrollbarRef} tabs={tabs} newsScrollbarRef={newsScrollbarRef} savedScrollbarRef={savedScrollbarRef} scroll={scroll} setScroll={setScroll} otherRef={newsScrollbarRef} id={1} setTabControl={setTabControl} dragging={dragging} selectedTab={selectedTab}/>
              {savedNews.map((data) => (
                <SavedNews key={data} id={data}></SavedNews>
              ))}
      </NewsWrapper>
    </ChangeScreen>
  );
};

export default News;
