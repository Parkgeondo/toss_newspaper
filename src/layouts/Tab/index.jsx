import TabButton from "../../Component/TabButton";
import { MotionTabReadingLine, TabWrapper } from "./styles";
import CircleNewsRow from "../../Component/CircleNews";
import {Tab_underLine} from "./styles";
import {Tab_readingLine} from "./styles";
import { useMotionValue, animate, AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import useLongPressTimer from "../../utile/useLongPressTimer";
import WavyShader_Tab from "../../utile/wavyShader_tab";
import { newsData } from "../../data/newsData";



const Tab = ({tabLine, tabNavi, tabs, selectedTab, setSelectedTab, savedNews, temSavedNews,progress,setTabControl ,tabControl, scroll }) => {

  // 부드러운 애니메이션 설정
  
  useEffect(()=>{
    if(selectedTab === tabs[0]){
      setTabControl(scroll[0])
    }else if(selectedTab === tabs[1]){
      setTabControl(scroll[1])
    }
  },[scroll, tabLine])

  return (
    <>
      <TabWrapper scrollHeight={tabControl}>
          <TabButton onClick={() => setSelectedTab(tabs[0])} isActive={selectedTab === tabs[0]}>
          뉴스
          </TabButton>
          <TabButton tabNavi={tabNavi} style={{transform:'translateX(2px)'}} onClick={() => setSelectedTab(tabs[1])} isActive={selectedTab === tabs[1]} savedNews>
          저장한 뉴스
          <CircleNewsRow savedNews={savedNews} temSavedNews={temSavedNews} progress={progress}/>
        </TabButton>
        <Tab_underLine tabNavi={tabNavi} isActive={selectedTab === tabs[0]}></Tab_underLine>
        {savedNews.map((id) => {
          const percent = tabLine.get(id) ?? 0;
          const width = 231.33 * ((100 - percent) / 100); // 100%일 때 231.33px

          return (
            <MotionTabReadingLine
              key={id}
              animate={{ width }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <WavyShader_Tab />
            </MotionTabReadingLine>
          );
        })}
      </TabWrapper>
    </>
  );
};

export default Tab;