import styled from '@emotion/styled';

export const HeaderWraper = styled.div`
display:flex;
padding: 0px 26px;
align-items: center;
width:100%;
justify-content: space-between;
position:absolute;
top:34px;
z-index:${props => props.isSavedNewsMode ? 1000 : 99};
 & h1{
    font-size: 20px;
    font-weight: 600;
    color: #293468;
 }
`