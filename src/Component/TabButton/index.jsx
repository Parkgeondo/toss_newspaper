import { TabButtonWrapper } from "./styles";


const TabButton = ({ children, onClick, isActive,style }) => {
  return (
    <TabButtonWrapper  onClick={onClick} isActive={isActive}>
      <span>
       {children}
      </span>
    </TabButtonWrapper>
  );
};

export default TabButton;