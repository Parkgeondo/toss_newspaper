import Header from '../../Component/Header';
import Tab from '../Tab';
import News from '../News';
import { useState, useEffect, use } from 'react';

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

  //tab부분 스크롤링
  const [scroll, setScroll] = useState(0);

  useEffect(()=>{
    console.log(scroll)
  },[scroll])

  return (
    <>
      <Header></Header>
      <Tab tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} savedNews={savedNews} setSavedNews={setSavedNews} temSavedNews={temSavedNews} setTemSavedNews={setTemSavedNews} progress={progress} scroll={scroll}></Tab>
      <News tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} savedNews={savedNews} setSavedNews={setSavedNews} temSavedNews={temSavedNews} setTemSavedNews={setTemSavedNews} setProgress={setProgress} scroll={scroll} setScroll={setScroll}></News>
    </>
  );
}

export default Layout;
