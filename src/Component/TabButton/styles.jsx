import styled from '@emotion/styled';
import {motion} from 'framer-motion'

export const TabButtonWrapper = styled.div`
  flex: 1;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size:16px;
  font-weight: 600;
  position:relative;
  color: ${({ isActive }) => (isActive ? "#343D4C" : "#8C919A")};
  transition: color 0.3s ease;
  & > span {
  display:flex; 
  gap:4px;
  }
  ${({ tabNavi }) =>
    tabNavi &&
    `
    flex: 2;
  `}
`