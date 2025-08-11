import styled from '@emotion/styled';
import { motion } from "framer-motion";

export const MaskedContainer_wrap = styled(motion.div)`
 & .gradiant_2{
    z-index: 99;
    position: absolute;
    width: 100%;
    height: 188px;
    background-color: #202629;
        background: linear-gradient(
        to bottom,
        #151717 10%,
        rgba(32, 38, 41, 0) 100%
        );
 }
` 