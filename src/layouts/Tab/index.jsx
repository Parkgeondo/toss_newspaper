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
import useColorPicker from "../../utile/useColorPicker";
import TabTitle from "../../Component/TabTitle";



const Tab = ({tabLine, tabNavi, tabs, selectedTab, setSelectedTab, savedNews, temSavedNews,progress,setTabControl ,tabControl, scroll }) => {

  const coloredNews = useColorPicker();

  // 부드러운 애니메이션 설정
  useEffect(()=>{
    if(selectedTab === tabs[0]){
      setTabControl(scroll[0])
    }else if(selectedTab === tabs[1]){
      setTabControl(scroll[1])
    }
  },[scroll, tabLine])

  const isTabWided = tabControl > 48 && selectedTab === tabs[1]

  return (
    <>
      <TabWrapper scrollHeight={tabControl}>
        <TabButton onClick={() => setSelectedTab(tabs[0])} isActive={selectedTab === tabs[0]}>
          뉴스
        </TabButton>
        <TabButton tabNavi={isTabWided} onClick={() => setSelectedTab(tabs[1])} isActive={selectedTab === tabs[1]} savedNews>
         <TabTitle
            title={
              (newsData.find((n) => n.id === savedNews[0])?.title ?? "저장된 뉴스")
            }
            tabNavi={isTabWided}
            savedNews={savedNews}
            temSavedNews={temSavedNews}
            progress={progress}
          />
          {savedNews.slice(1).map((id) => {
            const title = newsData[id].title;
            return(<TabTitle
            title={title}
            key={id}
            id={id}
            tabNavi={isTabWided}
            savedNews={savedNews}
            temSavedNews={temSavedNews}
            progress={progress}
            />)
        })}
        </TabButton>
        <Tab_underLine tabNavi={isTabWided} isActive={selectedTab === tabs[0]}></Tab_underLine>
        {isTabWided && savedNews.map((id) => {
          const percent = tabLine.get(id) ?? 0;
          const width = 231.33 * ((percent) / 100);
          const newsItem = coloredNews.find((n) => n.id === id);
          const color = newsItem.color;
          return (
            <MotionTabReadingLine
              key={id}
              animate={{ width }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <WavyShader_Tab color={color} />
            </MotionTabReadingLine>
          );
        })}
      </TabWrapper>
    </>
  );
};

export default Tab;