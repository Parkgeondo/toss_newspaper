import { TabButtonWrapper } from "./styles";
import {Tab_underLine} from "./styles";


const TabButton = ({ tabNavi, children, onClick, isActive }) => {
  return (
    <TabButtonWrapper tabNavi={tabNavi} onClick={onClick} isActive={isActive}>
      <span>
       {children}
      </span>
    </TabButtonWrapper>
  );
};

export default TabButton;