import styled from '@emotion/styled';
import { motion } from "framer-motion";


//물결원 범위
export const NewsBoxWapper = styled(motion.div)`
   padding: 8px 7px 8.5px 7px;
   display:flex;
   gap:12px;
   cursor: pointer;
   position:relative;
   overflow: hidden;
   border-radius: 12px;

   & .smallImage {
    border-radius: 6px;
    width:80px;
    height:80px;
   }

   & .publisher {
    font-size:12px;
    color:#3F4249;
    display: flex;
    gap: 5px;

    & > img{
     width:16px;
     border: 1px rgba(19, 31, 87, 0.18) solid;
     border-radius: 13px;
    }
   }
   & .title {
    font-size:16px;
    color:#181F27;
    font-weight: 600;
    line-height: 140%;
    margin-top:6px;
    margin-bottom:2px;
   }
   & .text {
    width: 255px;
    flex: 1;
    display: flex;
    flex-direction: column;
   }
   & .body {
   font-size:13px;
   color:#8C949E;
   font-weight: 500;
   line-height: 140%;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
   word-break: break-word;
   margin-bottom: 6px;
   }
   & .tags {
   display:flex;
   gap: 6px;
   font-size:11px;
      & .category{
       background-color:#E1E3E9;
       color:#293254;
       padding:3px 8px;
       border-radius: 4px;

      }
      & .day{
       background-color:#ECF1F2;
       color:#637073;
       padding:3px 8px;
       border-radius: 4px;
      }
   }
`

export const NewsBoxline = styled(motion.div)`
   border-bottom: 1px solid #E0E7F5;
   position: relative;
`
//물결원
export const Ripple = styled(motion.span)`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  pointer-events: none;
  background-color:#415FA2;
`;

export const Ripplearea = styled(motion.div)`
   padding: 8px 7px 8.5px 7px;
   // padding: 16px 14px 17px 14px;
`;