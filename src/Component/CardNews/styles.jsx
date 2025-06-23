import styled from '@emotion/styled';
import { motion } from "framer-motion";

export const CardNews_drag = styled(motion.div)`
  box-shadow: #C5D3F2 0px 6px 24px;
  position: relative;
  & .plus{
    top: 0;
    width: 100%;
    position: absolute;
    background-color: #20262A;
    z-index: -1;
    & .drag_Button{
      font-weight: 600;
      color: #424865;
      left: 50%;
      transform: translateX(-50%);
      width: 207px;
      height: 50px;
      position: absolute;
      background-color: #DBD9E8;
      border-radius: 0px 0px 24px 24px;
      bottom: -50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 16px;
      padding-bottom: 3px;
      & img{
        width: 26px;
      }
    }
  }
  & .card_effect{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
   }
  & .textBody{
    transform-origin: center top;
    left: 50%;
    padding: 0px 26px;
    width: 375px;
    margin-top: -10px;
    position: absolute;
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;

    & .subtitle{
      font-size: 16px;
      font-weight: 600;
      color: #C5D6E9;
      margin-bottom: 16px;
    }
    & .content{
      text-align: justify;
      font-size: 14px;
      font-weight: 500;
      color: #788DA3;
      line-height: 160%;
      margin-bottom: 26px;
    }
  }
`
export const CardNews_wrap = styled(motion.div)`
   height: 426px;
   bottom: 0px;
   flex-shrink: 0;
   border-radius: 24px;
   position: relative;
   overflow: hidden;
   & .text{
    top: 286px;
    width: 217px;
    position: absolute;
    left: 26px;
    z-index: 0;
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
    z-index: -1;
   }
   & .thumnail{
    position: absolute;
    z-index: -2;
    left: 50%;
    transform: translateX(-50%);
    top: -2px;
    height: 354px;
   }

`