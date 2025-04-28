import { NewsWrapper, StyledScrollbar, ChangeScreen } from './styles';
import NewsBox from '../../Component/NewsBox';
import { newsData } from '../../data/newsData';
import { useRef, useState, useEffect } from 'react';
import { useMotionValue, animate } from "framer-motion";

//selectedTab 현재 선택되어 있는 탭
//savedNews는 현재 저장되어 있는 뉴스들

const News = ({tabs, selectedTab, setSelectedTab, savedNews, setSavedNews,temSavedNews,setTemSavedNews}) => {

  
  const scrollbarRef = useRef(null);

  //지금 스크롤하고 있는지
  const [scrolling, setScrolling] = useState(false);

  //스크롤 타이머
  const timeoutRef = useRef(null);

  //스크롤한후, 1초뒤 스크롤 없앰
  const handleScroll = () => {
    setScrolling(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setScrolling(false);
    }, 1000);
  
  };

  //페이지 이동 함수
  const pageMove = (moveLocation) => {
    animate(x, moveLocation, { type: "spring", stiffness: 300, damping: 30 });
  }

  //페이지 나가면 삭제
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  //탭의 변화를 감지하고 페이지 넘기기
  useEffect(() => {
    if (selectedTab === tabs[1]) {
      pageMove(-375);
    } else if (selectedTab === tabs[0]) {
      pageMove(0);
    }
  }, [selectedTab]);

  //다른 곳에서도 사용할수있도록 만듬
  const x = useMotionValue(0);

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

  return (
    <ChangeScreen
      style={{ x }}
      drag="x"
      onDragEnd={handleDragEnd}
      dragConstraints={{ left: -375, right: 0 }}
      >
      <NewsWrapper>
          <StyledScrollbar
            ref={scrollbarRef}
            onScroll={handleScroll}
            className={scrolling ? 'scrolling' : ''}
            trackYProps={{
              style: {
                borderRadius: '4px',
                width: '6px',
                right: '2px',
              },
            }}
            thumbYProps={{
              style: {
                backgroundColor: '#616881',
                borderRadius: '4px',
              },
            }}
          >
              {newsData.map((data) => (
                <NewsBox key={data.id} {...data} savedNews={savedNews} setSavedNews={setSavedNews} temSavedNews={temSavedNews} setTemSavedNews={setTemSavedNews}/>
              ))}
          </StyledScrollbar>
      </NewsWrapper>
      <NewsWrapper>
        <StyledScrollbar
            ref={scrollbarRef}
            onScroll={handleScroll}
            className={scrolling ? 'scrolling' : ''}
            removeTracksWhenNotUsed
            disableTracksWidthCompensation
            trackYProps={{
              style: {
                borderRadius: '4px',
                width: '6px',
                right: '2px',
              },
            }}
            thumbYProps={{
              style: {
                backgroundColor: '#616881',
                borderRadius: '4px',
              },
            }}
          >
          
        </StyledScrollbar>
      </NewsWrapper>
    </ChangeScreen>
  );
};

export default News;
