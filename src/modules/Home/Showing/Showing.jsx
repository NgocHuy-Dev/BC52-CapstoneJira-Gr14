import React from "react";
import {Image} from "./Showing.styles";

import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../../apis/movieAPI";
import { Box,Grid,Container,Paper,Typography } from "@mui/material";
import ShowingList from "./ShowingList/ShowingList";
import ShowingSelect from "./ShowingSelect/ShowingSelect";

export default function Showing() {
  const { data = [] } = useQuery({
    queryKey: ["film"],
    queryFn: getMovie,
  });

  return (






    <Box id="showing" >
     
    <Image  container src='./bgadv.jpg'/>
    
    
    <Container>
      <Grid container spacing={3}  direction="row" justify="center" alignItems="center" m={2}>
        <Grid item xs={4} sm={6} className="d-flex">
         
               <Box className="mx-4" sx={{ borderLeft: '10px solid navy' }}> <Typography sx={{fontWeight: 'bold', fontSize: '20px' }}>PHIM</Typography></Box> 
               <Box className="mx-4"> <Typography sx={{fontWeight: 'bold', fontSize: '20px' }}>Đang chiếu</Typography></Box> 
               <Box className="mx-4"> <Typography sx={{fontWeight: 'bold', fontSize: '20px' }}>Sắp chiếu</Typography></Box> 
               <Box className="mx-4"> <Typography sx={{fontWeight: 'bold', fontSize: '20px' }}>Toàn quốc</Typography></Box> 
               
      
   
         
        </Grid>
                       
        <ShowingSelect listFilms={data} />



<ShowingList />
   
      </Grid>
    </Container>

      
          
      
          
          
          
          
         
   

           
    </Box>
  );
}
