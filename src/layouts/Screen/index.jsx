import Header from '../../Component/Header';
import Tab from '../Tab';
import News from '../News';
import { useState } from 'react';

function Layout() {

  //현재 탭 상태 확인(뉴스면 news 저장한 뉴스면 saved)(굳이 텍스트를 쓸 필요가 있나?)
  const tabs = ['news','saved']
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  //뉴스 저장 확인
  const [savedNews, setSavedNews] = useState([])

  //뉴스 임시저장
  const [temSavedNews, setTemSavedNews] = useState([])

  return (
    <>
      <Header></Header>
      <Tab tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} savedNews={savedNews} setSavedNews={setSavedNews} temSavedNews={temSavedNews} setTemSavedNews={setTemSavedNews}></Tab>
      <News tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} savedNews={savedNews} setSavedNews={setSavedNews} temSavedNews={temSavedNews} setTemSavedNews={setTemSavedNews}></News>
    </>
  );
}

export default Layout;
