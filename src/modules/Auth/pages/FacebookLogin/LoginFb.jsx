import { React, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from 'react-hook-form'
import { TextField, Button, IconButton, FormControl,Box} from "@mui/material";
import { FormControlStyle,Background } from "./LoginFb.styles";
import FacebookIcon from '@mui/icons-material/Facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";






const loginFBSchema = yup.object().shape({
 

  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
    
    
});


//FB init
// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : 'YOUR_APP_ID',
//     cookie     : true,
//     xfbml      : true,
//     version    : 'v11.0'
//   });
// };



export default function LoginFb() {


 // useState manage show password and show ConfirmPassword

 const [showPassword, setShowPassword] = useState(false);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(loginFBSchema),
    
  });

  const onSubmit = (data) => {
    console.log(data);
  }

  const responseFacebook = (response) => {
    console.log(response);
  }
  return (

<Background>
    <FormControlStyle>
    <FormControl
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: { sx: 80, sm: 80, md: 190, lg: 280, xl: 330 } }}
    >
      <Box
        border={2}
        pl={4}
        paddingBottom={4}
        borderRadius={3}
        sx={{ width: { sx: 80, sm: 80, md: 190, lg: 280, xl: 330 } }}
      >
       <TextField
          label="Email"
          variant="outlined"
          {...register("email")}
          error={!!errors.email}
          helperText={errors?.email?.message}
          sx={{ mt: 2, width: { sx: 1.0, sm: 50, md: 170, lg: 250, xl: 300 } }}
        />
          <TextField
          label="Mật khẩu"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          helperText={errors?.password?.message}
          sx={{ paddingBottom: 2,mt:2, width: { sx: 1.0, sm: 50, md: 170, lg: 250, xl: 300 } }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
    
      
 <FacebookLogin
        appId="your-app-id"
        fields="name,email,picture"
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
       
          variant="contained"
          color="primary"
          startIcon={<FacebookIcon />}
          onClick={renderProps.onClick}
          type="submit">
          Đăng nhập với Facebook
        </Button>
        )}
      />

      </Box>
      </FormControl>
    </FormControlStyle>

    </Background>
    
  );
}