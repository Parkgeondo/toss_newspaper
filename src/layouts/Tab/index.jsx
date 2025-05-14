import TabButton from "../../Component/TabButton";
import { TabWrapper } from "./styles";
import CircleNewsRow from "../../Component/CircleNews";
import {Tab_underLine} from "./styles";
import { useEffect, useState } from "react";
import useLongPressTimer from "../../utile/useLongPressTimer";

const Tab = ({tabs, selectedTab, setSelectedTab, savedNews, temSavedNews,progress,setTabControl ,tabControl, scroll }) => {

  useEffect(()=>{
    if(selectedTab === tabs[0]){
      setTabControl(scroll[0])
    }else if(selectedTab === tabs[1]){
      setTabControl(scroll[1])
    }
  },[scroll])

  return (
    <>
      <TabWrapper scrollHeight={tabControl}>
      {/* <TabWrapper scrollHeight={selectedTab === tabs[0] ? tabControl[0] : tabControl[1]}> */}
      {/* <TabWrapper scrollHeight = {tabsControl}> */}
          <TabButton onClick={() => setSelectedTab(tabs[0])} isActive={selectedTab === tabs[0]}>
          뉴스
          </TabButton>
          <TabButton style={{transform:'translateX(2px)'}} onClick={() => setSelectedTab(tabs[1])} isActive={selectedTab === tabs[1]} savedNews>
          저장한 뉴스
          <CircleNewsRow savedNews={savedNews} temSavedNews={temSavedNews} progress={progress}/>
        </TabButton>
        <Tab_underLine isActive={selectedTab === tabs[0]}></Tab_underLine>
      </TabWrapper>
    </>
  );
};

export default Tab;