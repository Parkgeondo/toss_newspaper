import styled from '@emotion/styled';
import {motion} from 'framer-motion'


export const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 0px 14px;
  margin-top: 8px;
  background:white;
  border-bottom: 2px solid #E6E9EF;
  top:85px;
  z-index:999;
  position: relative;
`

export const Tab_underLine = styled(motion.div)`
    position: absolute;
    left:0;
    bottom:-2px;
    height: 2px;
    width: 173px;
    background-color: #343D4C;
`