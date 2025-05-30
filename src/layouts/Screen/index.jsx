import Header from '../../Component/Header';
import Tab from '../Tab';
import News from '../News';
import { useState, useEffect, use } from 'react';
import { newsData } from '../../data/newsData';
import AnimatedWave from '../../utile/wavyShader _background';

function Layout() {

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
  const initialMap = new Map();
  newsData.forEach(news => {
    initialMap.set(news.id, 0);
  });
  return initialMap;
});

  useEffect(()=>{
    console.log(tabLine)
    console.log(savedNews)
  },[tabLine])

  return (
    <>
      <AnimatedWave></AnimatedWave>
      <Header></Header>
      {/* <Tab tabLine={tabLine} tabNavi={tabNavi} tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} savedNews={savedNews} temSavedNews={temSavedNews} progress={progress} scroll={scroll} tabControl={tabControl} setTabControl={setTabControl}></Tab>
      <News setTabLine={setTabLine} tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} savedNews={savedNews} setSavedNews={setSavedNews} temSavedNews={temSavedNews} setTemSavedNews={setTemSavedNews} setProgress={setProgress} scroll={scroll} setScroll={setScroll} setTabControl={setTabControl}></News> */}
    </>
  );
}

export default Layout;
