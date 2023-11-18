import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { object, string } from "yup";
import { signin } from "../../../apis/userAPI";
import { useUserContext } from "../../../contexts/UserContext/UserContext";
import avt from "../../../assets/img/meme-khoc_33.webp";
import bg from "../../../assets/img/bg-signin.jpg";
import Swal from "sweetalert2";
import { Grid, Paper, Typography, TextField, Box, Button } from "@mui/material";
import { CusAlert, CusBackGr, CusButton, CusImage, CusPaper } from "./styles";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const signinSchema = object({
  email: string().required("Emal không được để trống"),
  passWord: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
});

export default function Signin() {
  const navigate = useNavigate();
  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();

  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      passWord: "",
    },
    resolver: yupResolver(signinSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      onSigninSuccess(data);
    },
    onError: () => {
      Swal.fire("Lỗi!");
    },
  });

  const onSubmit = (values) => {
    Swal.fire("Đăng nhập thành công!", "", "success");
    handleSignin(values);
  };

  // currentUser khác null => user đã đăng nhập => điều hướng về Home
  if (currentUser) {
    console.log("đã đăng nhập");
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
  }

  return (
    <Grid container component="main">
      <Grid item xs={12} sm={4} md={7}>
        <CusBackGr variant="square" src={bg} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <CusPaper>
          <CusImage src={avt} />
          <Typography component="h1" variant="h5">
            Đăng Nhập
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoFocus
              {...register("email")}
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
              label="Password"
              type="passWord"
              id="passWord"
              autoComplete="current-password"
              {...register("passWord")}
            />
            {errors.passWord && (
              <CusAlert variant="a">{errors.passWord.message}</CusAlert>
            )}
            <CusButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              Đăng nhập
            </CusButton>
            {error && <CusAlert variant="a">{errors}</CusAlert>}
          </form>
          {/* Button Signgup */}
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
              Do not have an account?
              <Button
                type="button"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                <Typography fontSize={13} textTransform={"none"}>
                  {" "}
                  Signup now
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
        </CusPaper>
      </Grid>
    </Grid>
  );
}
