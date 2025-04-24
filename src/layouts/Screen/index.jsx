import Header from '../../Component/Header';
import Tab from '../Tab';
import News from '../News';
import { useState } from 'react';

function Layout() {

  //현재 탭 상태 확인
  const tabs = ['news','saved']
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  //뉴스 저장 확인
  const [savedNews, setSavedNews] = useState([])

  return (
    <>
      <Header></Header>
      <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} savedNews={savedNews} setSavedNews={setSavedNews}></Tab>
      <News selectedTab={selectedTab} setSelectedTab={setSelectedTab} savedNews={savedNews} setSavedNews={setSavedNews}></News>
    </>
  );
}

export default Layout;
