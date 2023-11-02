import React from "react";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../apis/userAPI";
import { Grid, Paper, Typography, TextField } from "@mui/material";
import { CusPaper, CusImage, CusButton, CusBackGr, Alert } from "./styles";
import bg from "../../../assets/img/bg-signup.jpg";
import avt from "../../../assets/img/meme-khoc_33.webp";

const signupSchema = object({
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),

  passWord: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
  name: string().required("Tên không được để trống"),

  phoneNumber: string().required("Số điện thoại không được để trống"),
});
export default function Signup() {
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
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    // Gọi API đăng ký
    handleSignup(values);
  };

  return (
    <Grid container component="main">
      <Grid item xs={false} sm={4} md={7}>
        <CusBackGr src={bg} variant="square" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <CusPaper>
          <CusImage src={avt} />
          <Typography component="h1" variant="h5">
            Đăng Ký
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ===========Tài khoản =====  */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
            {errors.email && <Alert variant="a">{errors.email.message}</Alert>}
            {/* ===========Mật khẩu =====  */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("passWord")}
            />
            {errors.passWord && (
              <Alert variant="a">{errors.passWord.message}</Alert>
            )}
            {/* ===========Name =====  */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Họ tên"
              type="name"
              id="name"
              {...register("name")}
            />
            {errors.name && <Alert variant="a">{errors.name.message}</Alert>}

            {/* ===========số ddienj thoại =====  */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              label="Số Điện Thoại"
              type="text"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <Alert variant="a">{errors.phoneNumber.message}</Alert>
            )}
            <CusButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              Đăng Ký
            </CusButton>
          </form>
        </CusPaper>
      </Grid>
    </Grid>
  );
}
