import { NewsWrapper, StyledScrollbar, ChangeScreen } from './styles';
import NewsBox from '../../Component/NewsBox';
import { newsData } from '../../data/newsData';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const News = ({selectedTab, setSelectedTab}) => {
  const scrollbarRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const timeoutRef = useRef(null);

  const handleScroll = () => {
    setScrolling(true);

    // 만약 기존의 타이머가 존재한다면 지우기
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setScrolling(false);
    }, 1000); // 스크롤 멈춘 후 1초 뒤 사라짐
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // 언마운트 시 타이머 정리
  }, []);

  return (
    <ChangeScreen>
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
          {newsData.map((data) => (
            <NewsBox key={data.id} {...data} />
          ))}
        </StyledScrollbar>
      </NewsWrapper>
    </ChangeScreen>
  );
};

export default News;
