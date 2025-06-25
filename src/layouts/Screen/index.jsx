import Header from '../../Component/Header';
import Tab from '../Tab';
import News from '../News';
import { useState, useEffect, use } from 'react';
import { newsData } from '../../data/newsData';
import AnimatedWave from '../../utile/wavyShader _background';
import FloatingNewsCards from '../FloatingNewsCards';
import { AnimatePresence, useMotionValue } from 'framer-motion';
import CardDetail from '../../Component/CardDetail';
import SaveBox from "../../Component/SaveBox";
import SvgMorphToggle from '../../Component/test';
import Test from '../../Component/test';
import Indicator from '../../Component/Indicator';



function Layout({setOnExpand, onExpand}) {

  const tabs = ['news','saved']
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  //뉴스 저장 확인
  const [savedNews, setSavedNews] = useState([])

  //뉴스 임시저장
  const [temSavedNews, setTemSavedNews] = useState([])

  //뉴스 저장시 진행 그래프
 const progress = useMotionValue(0)

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
 // 카드 확대와 일반을 매끄럽게 드래그, false면 주도권을 deatil에게 true면 일반card에게
  const [isDragging, setIsDragging] = useState(false);  

  //현재 선택된 카드
  const [currentIndex,setCurrentIndex] = useState(1)

  return (
    <>
      <Indicator progress={progress} currentIndex={currentIndex}></Indicator>
      <AnimatePresence>
          {onExpand && <CardDetail setOnExpand={setOnExpand} isDragging={isDragging} id={currentIndex} progress={progress}></CardDetail>}
      </AnimatePresence>
      <FloatingNewsCards setIsDragging={setIsDragging} setTemSavedNews={setTemSavedNews} savedNews = {savedNews} setSavedNews={setSavedNews} progress={progress} setOnExpand={setOnExpand} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}></FloatingNewsCards>
      <Header></Header>
      <SaveBox savedNews={savedNews} temSavedNews={temSavedNews} box_progress={progress}></SaveBox>
      <AnimatedWave></AnimatedWave>
    </>
  );
}

export default Layout;

