import { TabButtonWrapper } from "./styles";
import {Tab_underLine} from "./styles";


const TabButton = ({ tabNavi, children, onClick, isActive, style }) => {
  return (
    <TabButtonWrapper tabNavi={tabNavi} onClick={onClick} isActive={isActive}>
      <span style={style}>
       {children}
      </span>
    </TabButtonWrapper>
  );
};

export default TabButton;