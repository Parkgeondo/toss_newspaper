import Header from '../../Component/Header';
import Tab from '../Tab';
import News from '../News';
import { useState, useEffect, use } from 'react';
import { newsData } from '../../data/newsData';
import AnimatedWave from '../../utile/wavyShader _background';
import FloatingNewsCards from '../FloatingNewsCards';
import { AnimatePresence } from 'framer-motion';
import CardDetail from '../../Component/CardDetail';

function Layout({setOnExpand, onExpand}) {

  //현재 탭 상태 확인(뉴스면 news 저장한 뉴스면 saved)(굳이 텍스트를 쓸 필요가 있나?)
  const tabs = ['news','saved']
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  //뉴스 저장 확인
  const [savedNews, setSavedNews] = useState([])

  //뉴스 임시저장
  const [temSavedNews, setTemSavedNews] = useState([])

  //뉴스 저장시 진행 그래프
  const [progress, setProgress] = useState(0);

  //내용부분 스크롤링
  const [scroll, setScroll] = useState([0,0]);
  
  //tab의 위치값을 저장하는 변수 하나 추가, 이걸 하나로 만들어야하나?
  const [tabControl, setTabControl] = useState([0])

  //tab 네비게이션 확장
  const [tabNavi, setTabNavi] = useState(false)

  //savedNew 진행율
  const [tabLine, setTabLine] = useState(() => {
  
  //그래프 진행율 맵인것같은데
  const initialMap = new Map();
    newsData.forEach(news => {
      initialMap.set(news.id, 0);
    });
    return initialMap;
  });
//--------------------
  //현재 선택된 카드
  const [currentIndex,setCurrentIndex] = useState(1)

  return (
    <>
      <AnimatePresence>
          {onExpand && <CardDetail data = {newsData[currentIndex-1]} id={currentIndex}></CardDetail>}
      </AnimatePresence>
      <FloatingNewsCards setOnExpand={setOnExpand} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}></FloatingNewsCards>
      <Header></Header>
      <AnimatedWave></AnimatedWave>
    </>
  );
}

export default Layout;
