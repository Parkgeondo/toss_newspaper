import styled from '@emotion/styled';
import { motion } from "framer-motion";

export const FloatingNewsCards_wrap = styled(motion.div)`
  position: absolute;
  height: 740px;
  z-index: 100;
  display: flex;
  top: 0px;
  align-items: center;
  gap: 12px;
  /* padding: 6px; */
  padding: 110px 6px 0px 6px;
`