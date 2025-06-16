import styled from '@emotion/styled';
import { motion } from "framer-motion";

export const SaveBox_front = styled(motion.div)`
    position: absolute;
    z-index: 200;
    bottom: 75px;
    left: 50%;
    transform: translateX(-50%);
`

export const CircleNews_wrap = styled(motion.div)`
    display:flex;
    gap:4px;
    align-items:center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
    font-weight: 600;
    color: #424865;
    font-size: 16px;
    background-color: #D3D1E5;
    height: 40px;
    padding: 20px;
    border-radius: 20px;
`

export const SaveBox_back = styled(motion.div)`
    position: absolute;
    z-index: 100;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
`