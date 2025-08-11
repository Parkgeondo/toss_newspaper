import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Indicator_array_wrap = styled(motion.div)`
    padding: 0 26px;
    gap: 14px;
    position: absolute;
    z-index: 1001;
    top: 86px;
    display: flex;
`

export const Indicator_SVG = styled(motion.svg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`