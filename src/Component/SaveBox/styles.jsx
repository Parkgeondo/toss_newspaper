import styled from '@emotion/styled';
import { motion } from "framer-motion";

export const SaveBox_front = styled(motion.div)`
    position: absolute;
    z-index: 200;
    left: 50%;
    transform: translateX(-50%);
    /* background-color: red; */
`

export const CircleNews_wrap = styled(motion.div)`
    display:flex;
    gap:4px;
    align-items:center;
    position: absolute;
    font-weight: 600;
    color: #424865;
    font-size: 16px;
    height: 40px;
    padding: 20px;
    border-radius: 20px;
    left: 50%;
    bottom: ${props => props.margin_text_bottom}px;
    transform: translate(-50%, 0px);
    /* background-color: yellow; */
`

export const Box_Svg = styled(motion.svg)`
    height: ${props => props.height}px;
    width: 347px;
    /* width: ${props => props.width}px; */
    transition:width 0.1s ease-out;
    /* border: 1px solid red; */
`

export const SaveBox_back = styled(motion.div)`
    position: absolute;
    z-index: 10;
    left: 50%;
    transform: translateX(-50%);
`