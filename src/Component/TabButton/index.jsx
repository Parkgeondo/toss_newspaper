import { TabButtonWrapper } from "./styles";
import {Tab_underLine} from "./styles";


const TabButton = ({ children, onClick, isActive, style }) => {
  return (
    <TabButtonWrapper  onClick={onClick} isActive={isActive}>
      <span style={style}>
       {children}
      </span>
      {isActive && (<Tab_underLine layoutId="underline"></Tab_underLine>)}
    </TabButtonWrapper>
  );
};

export default TabButton;