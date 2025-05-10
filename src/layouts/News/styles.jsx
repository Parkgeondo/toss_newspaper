import styled from '@emotion/styled';
import { Scrollbar } from 'react-scrollbars-custom';
import { motion } from 'framer-motion';

export const NewsWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  // height: ${({ scroll }) => `${Math.min(719, 673 + scroll)}px`};
  height: 719px;
  -webkit-overflow-scrolling: touch; 
  width: 375px;
  // transform: ${({ scroll }) => `translateY(${Math.max(94, 88 - scroll)}px)`};
  transform: translateY(94px);
  // 앞쪽은 스크롤이 올라갔을때 최대 0에서 103만큼 내려옴, 기본은 141에서 스크롤이 내려감
  background-color: red;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChangeScreen = styled(motion.div)`
  position: relative;
  display: flex;
  width:calc(375px*2);
`;

export const StyledScrollbar = styled(Scrollbar)`
  .ScrollbarsCustom-TrackY {
    opacity: 0;
`;

