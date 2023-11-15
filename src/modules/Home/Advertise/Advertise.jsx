import React from "react";
import { BackGroundAdver } from "../../../components/styed/styledBg";
import { Box, Container,Grid } from "@mui/material";
import { TextTitle } from "../../../components/styed/styledText";
import { Button, ButtonMovie } from "../../../components/styed/styledButton";
import {Image,AvdCardMedia} from "./Advertise.styles";





export default function Advertise() {
  return (
    <BackGroundAdver id="application">



    <Container>
      <Grid container spacing={3}   marginTop={'20px'} >
        <Grid item xs={6} sm={6} >
        <img  container src='./iphone.png' width={'50%'} height={'80%'}/>
        </Grid>
        <Grid item xs={6} sm={6} >
                
      <Container sx={{ position: "relative", zIndex: "10" }}>
        <Box>
          <TextTitle as="h4" color={"#fff"} fw="700">
          Đặt vé xem phim trực tuyến với app DHN để nhận ngay nhiều ưu đãi hấp dẫn !!!    
          </TextTitle>
          <TextTitle color={"#fff"} as="p" fs="18px" p="20px 0 ">
          Bạn có thể thanh toán bằng nhiều phương thức khác nhau<br />{" "} và đảm bảo an toàn cho giao dịch của mình. 
          <br/>
          <img  container src='./qr.png' width={50} height={50}/>
          </TextTitle>
          <ButtonMovie m="0 0 17px 0 ">
            <Button p="20px 30px">App Miễn Phí - Tải về ngay</Button>
          </ButtonMovie>
          <TextTitle as="p" color={"#fff"} fs="18px">
          DHN nay đã có mặt trên 2 phiên bản{" "}
            <br/>
            <TextTitle as="a" color={"#fff"}>
                  <Image  container src='./appstoreimg.png'/>
            </TextTitle>{" "}
           
          </TextTitle>
        </Box>
      </Container>
        </Grid>
      </Grid>
    </Container>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </BackGroundAdver>
  );
}


