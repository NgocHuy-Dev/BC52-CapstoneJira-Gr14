import { React, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useSearchParams,useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { signin } from "../../../../apis/userAPI";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";
import avt from "../../../../assets/img/logosign.png";
import bg from "../../../../assets/img/bg1.png";
import Swal from "sweetalert2";
import { Grid, Paper, Typography, TextField, Alert,IconButton,Box,Button, } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { CusAlert, CusBackGr, CusButton, CusImage, CusPaper } from "./Signin.styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const signinSchema = object({
  email: string().required("Email không được để trống"),
  passWord: string().required("Mật khẩu không được để trống"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  //   "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
  // ),
});

export default function Signin() {

const navigate = useNavigate();
  // useState manage show password and show ConfirmPassword

  const [showPassword, setShowPassword] = useState(false);
 

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
  });

  const onSubmit = (values) => {
    // Swal.fire("Đăng nhập thành công!", "", "success");
    toast.success('Đăng nhập thành công!', {
      position: toast.POSITION.TOP_CENTER,
    });
    handleSignin(values);
    console.log(values)
  };

  // currentUser khác null => user đã đăng nhập => điều hướng về Home
  if (currentUser) {
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
            <CusButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Đăng nhập
            </CusButton>
            {error && <CusAlert variant="a">{errors}</CusAlert>}

              {/* Button Signgup */}
          <Box display={"flex"} justifyContent={'center'} mt={2} xs={12} sm={12} md={6} lg={6} xl={6}>
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


          </form>
        </CusPaper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
 
}
