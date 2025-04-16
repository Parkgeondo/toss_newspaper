import TabButton from "../../Component/TabButton";
import { TabWrapper } from "./styles";
import {Tab_underLine} from "./styles";

const Tab = ({selectedTab, setSelectedTab}) => {
  return (
    <>
      <TabWrapper>
        <TabButton onClick={() => setSelectedTab('news')} isActive={selectedTab === 'news'}>
          뉴스
          {'news' === selectedTab ?(<Tab_underLine layoutId="underline"></Tab_underLine>) : null}
          </TabButton>
        <TabButton onClick={() => setSelectedTab('saved')} isActive={selectedTab === 'saved'}>
          저장한 뉴스
          {'saved' === selectedTab ?(<Tab_underLine layoutId="underline"></Tab_underLine>) : null}
        </TabButton>
      </TabWrapper>
    </>
  );
};

export default Tab;