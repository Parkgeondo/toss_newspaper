import CardDetail_part from "../../Component/CardDetail_part";
import { newsData } from '../../data/newsData';
import { CardDetail_wrap } from "../../Component/CardDetail/styles";
import { useEffect, useRef, useState } from "react";

// 개별 뉴스 아이템 컴포넌트
function NewsItem({ data, index, savedNewsHeight, setSavedNewsHeight }) {
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      const height = itemRef.current.getBoundingClientRect().height;
      setSavedNewsHeight(prev => {
        const newArray = [...prev];
        newArray[index] = height;
        return newArray;
      });
    }
  }, []);

  return (
    <div ref={itemRef} style={{ padding: '0px 0px 60px 0px' }}>
      <CardDetail_part 
        data={data} 
        id={index} 
        index={index} 
        y={index * 100}
      />
    </div>
  );
}

function SavedNews({ setProgressGraph, savedNews, setScrollValue, savedNewsHeight, setSavedNewsHeight }) {
  const savedNewsData = newsData.filter(news => savedNews.includes(news.id));

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.getBoundingClientRect().height;
      setScrollValue(height);
    }
  }, [setScrollValue]);

  return (
    <CardDetail_wrap ref={contentRef} style={{paddingBottom: 100}}>
      {savedNewsData.map((data, index) => (
        <NewsItem
          key={data.id}
          data={data} 
          index={index} 
          savedNewsHeight={savedNewsHeight}
          setSavedNewsHeight={setSavedNewsHeight}
          setProgressGraph={setProgressGraph}
        />
      ))}
    </CardDetail_wrap>
  );
}

export default SavedNews;