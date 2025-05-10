import styled from '@emotion/styled';
import {motion} from 'framer-motion'


export const TabWrapper = styled.div`
  display: flex;
  width: 375px;
  height: 48px;
  padding: 0px 14px;
  background:white;
  border-bottom: 2px solid #E6E9EF;
  z-index:999;
  position: fixed;
  opacity:50%;
  transform: ${({ scrollHeight }) => `translateY(${Math.max(47, 94 - scrollHeight)}px)`};
`

export const Tab_underLine = styled.div`
    position: absolute;
    left:${({isActive})=>(isActive === true ? 14 : 187.5)}px;
    bottom:-2px;
    height: 2px;
    width: 173px;
    background-color: #343D4C;
    transition:cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s left;
`
