import styled from '@emotion/styled';
import { motion } from "framer-motion";


export const Indicator_wrap = styled(motion.div)`
    position: absolute;
    z-index: 1000;
    background-color: #0000007b;
    padding: 10px 15px;
    font-size: 16px;
    color: white;
    border-radius: 40px;
    left: 50%;
    transform: translate(-50%, 0%);
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