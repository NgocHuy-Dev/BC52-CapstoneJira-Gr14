
import styled from '@emotion/styled';
import {Box,Button} from '@mui/material'
import { Modal } from 'react-bootstrap';
import Slider from "react-slick";
import '@fortawesome/fontawesome-free/css/all.css';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display:none;
  
`;
export const CusModal = styled(Modal)({
    marginTop:'80px',
  });
export const ModalBody = styled.div`
  background-color: transparent;
 
`;

//hover nút


export const HoverDiv = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: 'tranparents',
  '&:hover': {
    '& > div': {
      display: 'block',
    },
  },
});

export const HiddenDiv = styled(Box)({
  position: 'absolute',
  top: '40%',
  left: '0%',
  width: '100%',
  height: '50px',
  backgroundColor: 'tranparents',
  display: 'none',
});

export const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 40,
  width:90,
  fontSize: 15,

});



export const Image = styled.img`
  border-radius: 10px;
  width: 220px;
  height: 400px;
  transition: transform .2s ease-in-out;
  
  &:hover {
    opacity: 0.7;
    transform: scale(1.1);
    border-radius: 10px;
  }
`;

export const CusSlider = styled(Slider)` 

.slick-dots li button:before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    font-size: 10px;
    content: "\f111";
    color: #fff;
    opacity: .5;
  }
  
  .slick-dots li.slick-active button:before {
    opacity: 1;
    background-color:  #FF8E53 ;
    border-radius: 50%;
  }
`;
  
  
