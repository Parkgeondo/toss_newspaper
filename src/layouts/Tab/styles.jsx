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
  transform: ${({ scrollHeight }) => `translateY(${Math.max(48, 93 - scrollHeight)}px)`};
  transition: transform 0.08s cubic-bezier(0.165, 0.84, 0.44, 1);
`

export const Tab_underLine = styled.div`
    position: absolute;
    left:${({isActive})=>(isActive === true ? 14 : 187.5)}px;
    bottom:-2px;
    height: 2px;
    width: 173px;
    background-color: #343D4C;
    transition:left 0.3s ease, width 0.3s ease, transform 0.3s ease;
    transform: scaleY(1);
    ${({ tabNavi }) =>
      tabNavi &&
      `
      left:129.67px;
      width: 231.33px;
      height: 3px;
      transform: scaleY(1.5);
  `}
`

export const MotionTabReadingLine = styled(motion.div)`
  position: absolute;
  left: 129.67px;
  bottom: -2px;
  height: 3px;
  overflow: hidden;
  border-radius: 2px;
  width: 0px;
  transform-origin: left center;
`;