

import styled from '@emotion/styled';
import ShowingList from './ShowingList/ShowingList';
import ShowingSelect from './ShowingSelect/ShowingSelect';







export const Slide = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;

  transition: all 0.5s;
`;


export const CusShowingSelect = styled(ShowingSelect)`
 
  z-index: 1;
 
  position: relative;
`;

export const CusShowingList = styled(ShowingList)`
 position: absolute;
 top:560px;
`;

export const Image = styled.img`
 
  width: 100vw;
  height: 70vh;
   padding-right:80px;
   padding-left:80px;
   
`;