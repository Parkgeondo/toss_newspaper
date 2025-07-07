import styled from '@emotion/styled';
import { motion } from "framer-motion";


export const CardDetail_wrap = styled(motion.div)`
   width: 100%;
   padding: 0px 0px 0px 0px;
   background-color: #20262A;
   position: absolute;
   z-index:120;
   display: flex;
   flex-direction: column;
   align-items: center;
    & .drag {
      background-color: #20262A;
    }
   & .textBody{
    margin-top: 54px;
      & .subtitle{
      font-size: 16px;
      font-weight: 600;
      color: #C5D6E9;
      margin-bottom: 16px;
    }
    & > .content{
      text-align: justify;
      font-size: 14px;
      font-weight: 500;
      color: #788DA3;
      line-height: 160%;
      margin-bottom: 26px;
    }
   }

   & .card_effect{
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    z-index: 100;
   }
   & .text{
    margin-top: -140px;
    padding: 0px 26px;
    z-index: 100;
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
    margin-top: -164px;
    height: 236px;
    z-index: 99;
   }
   & .thumnail{
    width: 100%;
    top: -2px;
    height: 354px;
    object-fit: cover;
    object-position: center;
   }

   & .home-button {
    width: 52px;
    height: 52px;
    background-color: #2B3740;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-top: 55px;
   }
`