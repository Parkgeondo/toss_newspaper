import styled from '@emotion/styled';

export const CircleNewsRowWrap = styled.div`
   display:flex;
   width: ${props => props.width}px;
   /* width: 120px; */
   min-height: 160px;
   transition:width 0.1s ease-out;
   position: relative;
   align-items: center;
   overflow: visible;
   display: flex;
   z-index: 210;
`