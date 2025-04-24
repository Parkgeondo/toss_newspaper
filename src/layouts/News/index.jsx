import { NewsWrapper, StyledScrollbar, ChangeScreen } from './styles';
import NewsBox from '../../Component/NewsBox';
import { newsData } from '../../data/newsData';
import { useRef, useState, useEffect } from 'react';
import { useMotionValue, animate } from "framer-motion";

const News = ({selectedTab, setSelectedTab, savedNews, setSavedNews}) => {
  const scrollbarRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);
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
              {newsData.map((data) => (
                <NewsBox key={data.id} {...data} />
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
