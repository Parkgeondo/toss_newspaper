import { TabButtonWrapper } from "./styles";

const TabButton = ({ children, onClick, isActive }) => {
  return (
    <TabButtonWrapper onClick={onClick} isActive={isActive}>
      {children}
    </TabButtonWrapper>
  );
};

export default TabButton;