import styled from '@emotion/styled';
import { motion } from "framer-motion";

export const Switch_Button_wrap = styled.div`
  position:relative;
& button {
  background-color: #ADB3D5CC;
  color: #ffffff;
  width: 80px;
  height:31px;
  border: none;
  border-radius:40px;
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding:13px;
  & img{
   position: relative;
   z-index:99;
   height: 9px;
  }
}
`
export const Switch_Button_inner = styled(motion.div)`
  top:2px;
  left:2px;
  position:absolute;
  width: 40px;
  height:27px;
  border-radius:20px;
  background-color: #293468;
  z-index:0;
`