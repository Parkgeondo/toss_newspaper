import styled from '@emotion/styled';
import { motion } from "framer-motion";
import maskUrl from "../../img/mask.svg";

export const Folder = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 200;
  width: 100px;
  height: 40px;
  border-radius: 12px;
  transform-style: preserve-3d;
  transform-origin: center bottom;
  background-color: #D3D1E5;
  bottom: 75px;
  left: 50%;
  transform: translateX(-50%) rotateX(0deg);
  box-shadow: inset 0 2px 0px #F8F7FF, inset 0 0px 24px #E0DFF2;

  -webkit-mask-image: url(${maskUrl});
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;

  mask-image: url(${maskUrl});
  mask-repeat: no-repeat;
  mask-position: center;

  mask-size:auto;
  mask-clip: no-clip;
`;

export const Folder_back = styled(motion.div)`
    position: absolute;
    z-index: 50;
    width: 100px;
    height: 40px;
    border-radius: 12px;
    bottom: 75px;
    left: 50%;
    transform: rotateX(0deg) translateX(-50%); // ✅ 이건 고정된 위치니까 여기서 처리
    box-shadow: inset 0 0px 24px #7B84AB;
    background: linear-gradient(
    to bottom,
    #60678A,  /* 밝은 회보라 */
    #3A3E51   /* 어두운 남색 */
  );
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
    transform: translate(-50%, 0px);
    background-color: #D3D1E5;
`