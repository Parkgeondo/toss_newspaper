import TabButton from "../../Component/TabButton";
import { TabWrapper } from "./styles";
import {Tab_underLine} from "./styles";
import CircleNewsRow from "../../Component/CircleNews";


const Tab = ({tabs, selectedTab, setSelectedTab, savedNews, setSavedNews, temSavedNews, setTemSavedNews }) => {

  return (
    <>
      <TabWrapper>
          <TabButton onClick={() => setSelectedTab(tabs[0])} isActive={selectedTab === tabs[0]}>
          뉴스
          {tabs[0] === selectedTab ?(<Tab_underLine layoutId="underline"></Tab_underLine>) : null}
          </TabButton>
          
          <TabButton style={{transform:'translateX(16px)'}}onClick={() => setSelectedTab(tabs[1])} isActive={selectedTab === tabs[1]} savedNews>
          저장한 뉴스
          {tabs[1] === selectedTab ?(<Tab_underLine layoutId="underline"></Tab_underLine>) : null}
          <CircleNewsRow savedNews={savedNews} temSavedNews={temSavedNews}/>
        </TabButton>
      </TabWrapper>
    </>
  );
};

export default Tab;