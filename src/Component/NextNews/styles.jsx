import styled from '@emotion/styled';
import { motion } from "framer-motion";

export const NextNews_wrap = styled.div`
width: 100%;
margin-top: 30px;
`

export const NextNews_number = styled(motion.div)`
position: absolute;
z-index: 10000;
bottom: 20px;
color: #fff;
left: 50%;
display: flex;
& .nextNews_number_button {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #788DA3;
}& .nextNews_number_button.active {
    color: #fff;
    background-color: #2B3740;
  }
`

export const NextNews_part_wrap = styled.div`
display: flex;
border-radius: 24px 24px 0px 0px;
background-color: #242C32;
border: 1px solid #3A4F5C;
padding: 18px 18px 500px 18px;
gap: 9px;
color: #fff;
font-size: 14px;
margin-top: -480px;
&:first-child {
  margin-top: 0;
}

& .nextNews_part_text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
& img {
    width: 38px;
    height: 42px;
    border-radius: 9px;
}
`