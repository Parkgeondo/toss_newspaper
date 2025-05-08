import styled from '@emotion/styled';
import { Scrollbar } from 'react-scrollbars-custom';
import { motion } from 'framer-motion';

export const NewsWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: ${({ scroll }) => `${Math.min(711, 673 + scroll)}px`};
  -webkit-overflow-scrolling: touch; 
  width: 375px;
  transform: ${({ scroll }) => `translateY(${Math.max(103, 141 - scroll)}px)`};
  // 앞쪽은 스크롤이 올라갔을때 최대 0에서 103만큼 내려옴, 기본은 141에서 스크롤이 내려감
`;

export const ChangeScreen = styled(motion.div)`
  position: relative;
  display: flex;
  width:calc(375px*2);
`;

export const StyledScrollbar = styled(Scrollbar)`
  .ScrollbarsCustom-TrackY {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.scrolling .ScrollbarsCustom-TrackY {
    opacity: 1;
  }

  .ScrollbarsCustom-Scroller {
  }
`;

