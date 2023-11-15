import { React, useState } from "react";
import { signup } from "./../../../../apis/userAPI";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {object, string} from 'yup'
import {
  TextField,
  Button,
  IconButton,
  Box,
  Grid,
  Typography,
  Paper

} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { AccountCircle } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import { CusAlert, CusBackGr, CusButton, CusImage, CusPaper } from "./Signup.styles";
import avt from "./../../../../components/assets/logo.jpg";
import bg from "./../../../../components/assets/bg-signup.jpg";
import { useNavigate } from 'react-router-dom';

const signupSchema = yup.object().shape({
  taiKhoan: string().required('Tài khoản không được để trống'),
     matKhau: string().required('Mật khẩu không được để trống').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,"Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"),
     email: string().required('Email không được để trống').email("Email không đúng định dạng"),
     hoTen:string().required('Họ Tên không được để trống').matches(/^[a-zA-Z]+$/ ,"Họ Tên chỉ dùng kí tự alphabe"),
     soDt:string().required('Số điện thoại không được để trống').matches(/^(\+84|0)\d{9,10}$/,"Vui lòng nhập số điện thoại Việt Nam"),
});

export default function Signup() {
  // useNavigate manage navigate button

  const navigate = useNavigate();

  // useState manage show password and show ConfirmPassword

  const [showPassword, setShowPassword] = useState(false);
 
  // useMutation manage handle signup

    const {mutate:handelSignup,error,isLoading}=useMutation(

      {mutationFn:(payload)=>{signup(payload)},
        // chuyển sang trang đăng nhập (/signin)
       onSuccess:()=>{navigate('/signin')}

      }
      

  )

  //useForm manage form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{taiKhoan:"",matKhau:"",email:"",hoTen:"",soDt:""},
    mode: "onTouched",
    
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (values) => {
    // Gọi api đăng ký
    handelSignup(values);
    console.log(values);
  };






  return (
    
    <Grid container component="main">
    <Grid item xs={12} sm={4} md={7}>
      <CusBackGr variant="square" src={bg} />
    </Grid>
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <CusPaper>
        <CusImage src={avt} />
        <Typography component="h1" variant="h5">
          Đăng Ký
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          

           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="taiKhoan"
            placeholder="Tài khoản"
            type="text"
            id="taiKhoan"
            {...register("taiKhoan")}
            InputProps={{
             
              startAdornment: <AccountCircle />,
            }}
          />
          {errors.taiKhoan && (
            <CusAlert variant="a">{errors.taiKhoan.message}</CusAlert>
          )}
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="matKhau"
            placeholder="Mật khẩu"
            type={showPassword ? "text" : "passWord"}
            id="matKhau"
            autoComplete="current-password"
            {...register("matKhau")}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
              startAdornment: <LockIcon />,
            }}
          />
          {errors.matKhau && (
            <CusAlert variant="a">{errors.matKhau.message}</CusAlert>
          )}
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="Email"
            name="email"
            autoFocus
            {...register("email")}
            InputProps={{
              startAdornment: <EmailIcon />,
            }}
          />
          {errors.email && (
            <CusAlert variant="a">{errors.email.message}</CusAlert>
          )}
      
<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="hoTen"
            placeholder="Name"
            type="text"
            id="hoTen"
            {...register("hoTen")}
            InputProps={{
             
              startAdornment: <AccountCircle />,
            }}
          />
          {errors.hoTen && (
            <CusAlert variant="a">{errors.hoTen.message}</CusAlert>
          )}

   
<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="soDt"
            placeholder="Số diện thoại"
            type="text"
            id="soDt"
            {...register("soDt")}
            InputProps={{
             
              startAdornment: <LocalPhoneIcon />,
            }}
          />
          {errors.soDt && (
            <CusAlert variant="a">{errors.soDt.message}</CusAlert>
          )}

          <CusButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Đăng ký
          </CusButton>
          {error && <CusAlert variant="a">{errors}</CusAlert>}


          {/* Button Signgin */}
          <Box display={"flex"} justifyContent={'center'} mt={2} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography fontSize={13}>
                Already have an account?
                <Button
                  type="button"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  <Typography fontSize={13} textTransform={"none"}>
                    {" "}
                    Signin now
                  </Typography>
                </Button>
              </Typography>
          </Box>
            {/* Button Login with Social */}

          <Box
              display={"flex"}
              justifyContent={"center"}
              mt={2}
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
              <Button
                type="button"
                onClick={() => {
                  navigate("/loginfb");
                }}
              >
                <FacebookIcon />
              </Button>

              <Button
                type="button"
                onClick={() => {
                  navigate("/loginfb");
                }}
              >
                <TwitterIcon />
              </Button>
          </Box>
         

          
        </form>
      </CusPaper>
    </Grid>
  </Grid>
  );
}
