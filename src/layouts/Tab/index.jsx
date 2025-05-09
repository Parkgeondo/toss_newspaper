import TabButton from "../../Component/TabButton";
import { TabWrapper } from "./styles";
import CircleNewsRow from "../../Component/CircleNews";
import {Tab_underLine} from "./styles";


const Tab = ({tabs, selectedTab, setSelectedTab, savedNews, setSavedNews, temSavedNews, setTemSavedNews, progress,scroll }) => {

  return (
    <>
      <TabWrapper scroll2={scroll}>
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