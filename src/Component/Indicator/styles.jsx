import styled from '@emotion/styled';
import { motion } from "framer-motion";


export const Indicator_wrap = styled(motion.div)`
    background-color: #0000007b;
    padding: 10px 15px;
    font-size: 16px;
    color: white;
    border-radius: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-backdrop-filter: blur(50px);
    backdrop-filter: blur(50px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap:8px;
    transition: translate 0.4s ease-in-out;
`

export const Indicator_position = styled(motion.div)`
    position: absolute;
    left: 50%;
    z-index: 1000;
`