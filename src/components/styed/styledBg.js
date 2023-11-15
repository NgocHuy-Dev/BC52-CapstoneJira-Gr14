import styled from "styled-components";

export const BackGroundSign = styled.section`
  background-image: url("cinemapg2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  /* padding-top: 64px; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:;
    display: block;
  }
`;

export const BackGroundAdver = styled.section`
background-image: url("footerbg2.jpg");
background-repeat: none;
background-size: cover;
height: 95%;
display: flex;
align-items: center;
justify-content: center;
position: relative;
&::after{
  content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ;
    display: block;
}
`;

export const BackGroundFooter = styled.section`
background-color:#2121;
padding-top: 50px;
height: 50vh;


`
