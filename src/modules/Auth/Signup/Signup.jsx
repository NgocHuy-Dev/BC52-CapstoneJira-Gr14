import { React, useState } from "react";
import { signup } from "../../../apis/userAPI";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { AccountCircle } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";
import {
  CusAlert,
  CusBackGr,
  CusButton,
  CusImage,
  CusPaper,
} from "./Signup.styles";
import avt from "../../../assets/img/logosign.png";
import bg from "../../../assets/img/bg1.png";

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email của bạn"),

  passWord: yup
    .string()
    .required("Vui lòng nhập mật khẩu của bạn")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  name: yup.string().required("Vui lòng nhập tên của bạn"),
  phoneNumber: yup.string().required("Vui lòng nhập số điện thoại của bạn"),
});

export default function Signup() {
  // useNavigate manage navigate button
  const navigate = useNavigate();
  // useState manage show password and show ConfirmPassword
  const [showPassword, setShowPassword] = useState(false);

  //useForm manage form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    mode: "onTouched",

    resolver: yupResolver(signupSchema),
  });
  // useMutation manage handle signup
  const {
    mutate: handelSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => {
      signup(payload);
    },
    // chuyển sang trang đăng nhập (/signin)
    onSuccess: () => {
      navigate("/signin");
    },
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
              name="passWord"
              placeholder="Password"
              type={showPassword ? "text" : "passWord"}
              id="passWord"
              autoComplete="current-password"
              {...register("passWord")}
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
            {errors.passWord && (
              <CusAlert variant="a">{errors.passWord.message}</CusAlert>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              placeholder="Name"
              type="text"
              id="name"
              {...register("passWord")}
              InputProps={{
                startAdornment: <AccountCircle />,
              }}
            />
            {errors.name && (
              <CusAlert variant="a">{errors.name.message}</CusAlert>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              placeholder="Số diện thoại"
              type="text"
              id="phoneNumber"
              {...register("phoneNumber")}
              InputProps={{
                startAdornment: <LocalPhoneIcon />,
              }}
            />
            {errors.phoneNumber && (
              <CusAlert variant="a">{errors.phoneNumber.message}</CusAlert>
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
              <Typography fontSize={13}>
                Already have an account?
                <Button type="button" onClick={() => navigate("/sign-in")}>
                  <Typography fontSize={13} textTransform={"none"}>
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
