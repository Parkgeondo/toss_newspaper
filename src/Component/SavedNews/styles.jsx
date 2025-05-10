import styled from '@emotion/styled';
import { motion } from "framer-motion";


//물결원 범위
export const SavedNewsWrapper = styled(motion.div)`
background-color:white;
display:flex;
flex-direction: column;
padding: 20px 14px 0px 14px;
border-bottom: 1px solid #E6E9EF;
s

& > img{
  border-radius: 8px;
}


& > div{
}

& > .title{
  font-size: 26px;
  font-weight: 600;
  color: #181F27;
  line-height: 140%;
  margin-bottom:4px;
}

& > .publishData{
  display: flex;
  align-items: center;
  font-size:12px;
  gap:4px;
  margin-bottom:12px;
  & > img{
    width:20px;
    height:20px;
    border-radius: 20px;
  }
  & > .dot{
    width: 2px;
    height: 2px;
    background-color: #3F4249;
  }
}

& > .textBody{
 margin: 34px 4px 0px 4px;
  & > .subtitle{
    font-size: 16px;
    font-weight: 600;
    color: #181F27;
    margin-bottom: 16px;
  }
  & > .content{
    text-align: justify;
    font-size: 14px;
    font-weight: 500;
    color: #343e48;
    line-height: 160%;
    margin-bottom: 26px;
  }
}
`;