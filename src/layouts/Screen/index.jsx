import Header from '../../Component/Header';
import Tab from '../Tab';
import News from '../News';
import { useState } from 'react';

function Layout() {
  const tabs = ['news','saved']
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  return (
    <>
      <Header></Header>
      <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab}></Tab>
      <News selectedTab={selectedTab} setSelectedTab={setSelectedTab}></News>
    </>
  );
}

export default Layout;
