import styled from '@emotion/styled';

export const StatusBarstyle = styled.div`
position:absolute;
top:0;
z-index:999;
/* background-color: #20262A; */
    & .gradiant{
        z-index: 99;
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
    & .gradiant_2{
        top: 0;
        width: 100%;
        height: 188px;
        position: absolute;
        background-color: #202629;
        background: linear-gradient(
        to bottom,
        #151717 10%,
        rgba(32, 38, 41, 0) 100%
        );
    }

`