import TabButton from "../../Component/TabButton";
import { TabWrapper } from "./styles";
import CircleNewsRow from "../../Component/CircleNews";


const Tab = ({tabs, selectedTab, setSelectedTab, savedNews, temSavedNews, progress }) => {

  return (
    <>
      <TabWrapper>
          <TabButton onClick={() => setSelectedTab(tabs[0])} isActive={selectedTab === tabs[0]}>
          뉴스
          </TabButton>
          <TabButton style={{transform:'translateX(2px)'}} onClick={() => setSelectedTab(tabs[1])} isActive={selectedTab === tabs[1]} savedNews>
          저장한 뉴스
          <CircleNewsRow savedNews={savedNews} temSavedNews={temSavedNews} progress={progress}/>
        </TabButton>
      </TabWrapper>
    </>
  );
};

export default Tab;