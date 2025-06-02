import styled from '@emotion/styled';
import { motion } from "framer-motion";

export const FloatingNewsCards_wrap = styled(motion.div)`
  position: absolute;
  height: 88%;
  z-index: 100;
  display: flex;
  bottom: 0;
  align-items: center;
  gap: 12px;
  /* background-color: white; */
  padding: 6px;
`