import { NewsWrapper, StyledScrollbar, ChangeScreen } from './styles';
import NewsBox from '../../Component/NewsBox';
import { newsData } from '../../data/newsData';
import { useRef, useState, useEffect } from 'react';
import { useMotionValue, animate } from "framer-motion";

const News = ({selectedTab, setSelectedTab}) => {
  const scrollbarRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const timeoutRef = useRef(null);

  const handleScroll = () => {
    setScrolling(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setScrolling(false);
    }, 1000);
      setSelectedTab("saved")
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // 언마운트 시 타이머 정리
  }, []);

  const x = useMotionValue(0);

  const handleDragEnd = (e, info) => {

    //넘어갈때
    if (info.offset.x < -150 && selectedTab === 'news') {
      animate(x, -375, { type: "spring", stiffness: 300, damping: 30 });
      setSelectedTab('saved')
    console.log('넘어감')
    }else if(info.offset.x >= -150 && selectedTab === 'news'){
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      setSelectedTab('news')
    console.log('넘어가지 않음')
    }else if(info.offset.x > 150 && selectedTab === 'saved'){
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      setSelectedTab('news')
    console.log('넘어가지 않음')
    }else if(info.offset.x <= 150 && selectedTab === 'saved'){
      animate(x, -375, { type: "spring", stiffness: 300, damping: 30 });
      setSelectedTab('saved')
    console.log('넘어가지 않음')
    }
  }

  return (
    <ChangeScreen
      style={{ x }}
      drag="x"
      onDragEnd={handleDragEnd}
      dragConstraints={{ left: -375, right: 0 }}
      onDrag={(event, info) => {
        console.log("현재위치:", info.offset.x)
      }}
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
          {newsData.map((data) => (
            <NewsBox key={data.id} {...data} />
          ))}
        </StyledScrollbar>
      </NewsWrapper>
    </ChangeScreen>
  );
};

export default News;
