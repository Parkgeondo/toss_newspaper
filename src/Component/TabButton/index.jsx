import { TabButtonWrapper } from "./styles";


const TabButton = ({ children, onClick, isActive,style }) => {
  return (
    <TabButtonWrapper  onClick={onClick} isActive={isActive}>
      <span style={style}>
       {children}
      </span>
    </TabButtonWrapper>
  );
};

export default TabButton;