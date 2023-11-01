import React from "react";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../../apis/userAPI";
import { Grid, Paper, Typography, TextField } from "@mui/material";
import { CusPaper, CusImage, CusButton, CusBackGr, Alert } from "./styles";
import bg from "../../../../assets/img/bg-signup.jpg";
import avt from "../../../../assets/img/sign-up.png";

const signupSchema = object({
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  hoTen: string().required("Họ tên không được để trống"),
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
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
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
}
