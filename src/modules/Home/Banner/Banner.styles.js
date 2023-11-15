import { Carousel } from "react-bootstrap";
 
  import styled from '@emotion/styled';
 
 

 export const CusCarousel = styled(Carousel)`
 .carousel-indicators button {
   border-radius: 50%;
   width: 1%;
   height: 10px;
   background-color:  #808080;
   border: 1px solid #5b6c7a;
 }

 .carousel-indicators .active {
   background-color: #fff;
 }


 .carousel-control-next {

  border-radius: 50%;
  color: #808080;
 
  
}
.carousel-control-prev {

border-radius: 50%;
color: #808080;


}
`;
