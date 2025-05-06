import styled from '@emotion/styled';
import { Scrollbar } from 'react-scrollbars-custom';
import { motion } from 'framer-motion';

export const NewsWrapper = styled.div`
  display: flex;
  position: relative;
  // top: 85px;
  top: 85px;
  flex-direction: column;
  height: 673px;
  -webkit-overflow-scrolling: touch; 
  width: 375px;
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

