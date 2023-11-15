import React from 'react'
import {MovieCard,MovieCardContent,MovieCardMedia,Rating,GradientButton}from './MovieProfile.styles'
import { Box, Grid, Typography,Button } from '@mui/material';
import Showtimes from '../Showtimes';
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {getMovieDetails} from'../../../apis/movieAPI'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Loading from '../../../components/Loading/Loading';

import 'bootstrap/dist/css/bootstrap.min.css';





export default function MovieProfile() {

// cài đặt useNavigate đẻ điều hướng

const navigate=useNavigate();

// gọi useParams lấy dữ liệu movieId trên url (đã khai báo key trên url của Component App là movieId nên bó tách movieId)

const {movieId} = useParams();
//-------------------------------đặt state và tạo  hàm show mã hệ thồng rạp -->state phải đặt đầu tiên để không báo lỗi

//---------------------------xử lý dữ liệu API với useQuery-----------------------------
  // // để luôn hiển thị rạp đầu tiên thì dùng useEffect-->state phải đặt đầu tiên để không báo lỗi vì lấy dc dữ liệu
//-----------hoặc------------ dùng thêm onSucess của useQuery để set giá trị đầu tiên khi call API thành công
  
const { data =[], isLoading, error } =useQuery({queryKey:['MovieShowtimes',movieId], queryFn:()=>getMovieDetails(movieId),enable: !!movieId});






// Loading...
if (isLoading) {


{return (

      <>
      
             <Loading/>
      
      </>

)}
          
}


//----------------------- đặt biến cinemaSystems để map dữ liệu call từ API-->phải để ở đây vì sẽ báo báo lỗi MovieShowtimes chưa khỏi tạo nếu để trước khi dùng biến MovieShowtimes
// để thêm || [] để ban đầu khi call API hàm map không báo lỗi do map cần 1 mảng
const cinemaSystems= data || []




//--------------format ngày tháng

const time = dayjs(cinemaSystems.ngayKhoiChieu).format("DD-MM-YYYY ~ HH:mm");     


  

console.log(cinemaSystems)



  return (
    


<Box sx={{ flexGrow: 1, paddingTop: '70px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={9}>
          <MovieCard>



          <MovieCardMedia
              component="img"
              image={cinemaSystems.hinhAnh}
              alt="Random movie poster"
              
            />
            <MovieCardContent >
              <Typography variant="h5" component="h2">
                {cinemaSystems.tenPhim}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                 {time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                 <Box width={'70%'}>{cinemaSystems.moTa}</Box>
              </Typography>
              <Rating variant="body2" color="text.secondary">
                ★★★★☆
              </Rating>
              <Typography variant="body2" color="text.secondary">
                <Showtimes/>
              </Typography>
       
            </MovieCardContent> 


          </MovieCard>
        </Grid>
        
      </Grid>
    </Box>


// {

//       
   
  )
}
