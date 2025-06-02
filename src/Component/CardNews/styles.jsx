import styled from '@emotion/styled';
import { motion } from "framer-motion";


export const CardNews_wrap = styled(motion.div)`
   width: 265px;
   height: 426px;
   background-color: #20262A;
   bottom: 0px;
   flex-shrink: 0;
   border-radius: 24px;
   padding: 24px;
   border: 1px white solid;
   position: relative;
   overflow: hidden;
   box-shadow: #C5D3F2 0px 6px 24px;

   & .card_effect{
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    z-index: 100;
   }
   & .text{
    top: 286px;
    width: 217px;
    position: absolute;
    z-index: 100;
    left: 26px;
   }
   & .title{
    font-weight: 500;
    color: #FFFFFF;
    font-size: 20px;
    margin-top: 6px;
    margin-bottom: 8px;
    line-height: 140%;
   }
   & .badge{
    color: ${({ theme }) => theme.colors.blue.light};
    font-size: 12px;
    font-weight: 400;
    display: inline;
    padding: 2px 8px;
    border-radius: 4px;
    margin-right: 6px;
    background-color: ${({ theme }) => theme.colors.blue.dark};
   }
   & .publisher{
    display: flex;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 3px;
    color: ${({ theme }) => theme.colors.blue.light};
   }
   & .publisher > img{
    width: 13px;
    height: 13px;
    border-radius: 7.5px;
   }
   & .gradient{
    background: linear-gradient(
      to bottom,
      rgba(184, 199, 208, 0) 0%,
      rgba(32, 38, 42, 0.52) 33%,
      rgba(32, 38, 42, 1) 64%
    );
    position: absolute;
    top: 190px;
    left: 0;
    right: 0;
    height: 236px;
    z-index: 99;
   }
   & .thumnail{
    position: absolute;
    left: 50%;
    top: -2px;
    transform: translateX(-50%);
    height: 354px;
   }
`