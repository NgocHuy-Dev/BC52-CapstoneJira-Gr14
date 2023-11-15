import {React,useState} from 'react'
import {getMovie} from'../../../../apis/movieAPI'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer  from 'react-player';
import Loading from '../../../../components/Loading/Loading';
import { Modal, Button } from 'react-bootstrap';
import {Container,ModalBody,HoverDiv,HiddenDiv,GradientButton,CusModal,Image,CusSlider} from './ShowList.styles'




// cài đặt slick-carousel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow:4,
  slidesToScroll: 4
};



export default function ShowingList() {

  
  const [show, setShow] = useState(false);


 //tạo biến cập nhật state cho video được nhận từ modal

 const [srcvideo, setsrcvideo] = useState('');

 // tạo biến cập nhật state cho trạng thái modal
  const handleClose = () => setShow(false);
  

  const handleShow = (trailerId) => {
    
    
    setsrcvideo(trailerId);
    
    
    setShow(true)
  
  
  };
  
// cài đặt useNavigate đẻ điều hướng

const navigate=useNavigate();


//---------------------------xử lý dữ liệu API với useQuery-----------------------------
  

  
const { data : movies=[], isLoading, error } = useQuery({queryKey:['movies'], queryFn:getMovie});
if (isLoading) {
  
    
    
  {return (

    <>
              <Loading/>
        
    
    </>

   )}


}
// map dữ liệu vào carousel


  return (


    
 



              
      
   <div className='container' style={{ position: 'relative' }}>
       
    <CusSlider {...settings}>
       
       {movies.map(item=>{
           
           
           return(
                        <div key={item.maPhim}>

                            
                               {/* button bật modal cảu nó phải trong map để nhận giá trị trailer */}
                               
                                  <Button  onClick={()=>handleShow(item.trailer)} variant='white' >
                                    <HoverDiv>
                                       <Image src={item.hinhAnh} />
                                       <HiddenDiv>
                                        <GradientButton onClick={()=>{navigate(`/movies/${item.maPhim}`)}} >Đặt vé</GradientButton>
                                        <br/>
                                        <br/>
                                        <GradientButton onClick={()=>handleShow(item.trailer)}>Trailer</GradientButton>
                                      </HiddenDiv>
                                    </HoverDiv>
                                  </Button>
                                  <br/>
                                  <br/>
                                  <p className='fw-bold text-center'>{item.tenPhim}</p>
                           
   
                         </div>
                        

           )
        
                                 
        })}    


    </CusSlider>
{/* Modal */}
{/* phải để modal ngoài hàm map để không nhận giá trị vòng lặp nhưng button bật modal cảu nó phải trong map để nhận giá trị trailer mà nhận giá trị state của hàm stsrcvideo  */}
    
    <Container>  
          <CusModal show={show} onHide={handleClose} >
           
                  <ModalBody >
                  
                        <Button onClick={handleClose} style={{ position: 'absolute', top: '0', right: '0' , color:'white'}} variant='white'>X</Button>
                 
                        <ReactPlayer url={srcvideo}  controls={true} playing={true} width='500px' height='500px' />
                   
                  </ModalBody>
              
       </CusModal>
    </Container>
  


   </div>


 

 
  )
}
