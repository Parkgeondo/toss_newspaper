import styled from '@emotion/styled';

export const StatusBarstyle = styled.div`
position:absolute;
top:0;
z-index:999;
/* background-color: #20262A; */
    & .gradiant{
        top: 0;
        width: 100%;
        height: 73px;
        position: absolute;
        background-color: #202629;
        background: linear-gradient(
        to bottom,
        #22262A 0%,
        rgba(32, 38, 41, 0) 70%
        );
    }

`