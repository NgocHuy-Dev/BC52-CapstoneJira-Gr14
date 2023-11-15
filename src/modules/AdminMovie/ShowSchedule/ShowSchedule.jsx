import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addMovie, getMovie, getMovieDetails } from "../../../apis/movieAPI";
import { addShowtimes } from "../../../apis/bookTicketAPI";
import { getCinema, getInfoTheater } from "../../../apis/cinemaAPI";
import dayjs from "dayjs";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Button,
  ButtonGroup,
  Switch,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { mixed, object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import {CusButton}  from './ShowSchedule.styles'
//////////////////////////////////////////////////////////////////////
const showScheduleSchema = object({
  maPhim: number().required("Mã Phim không được để trống"),
  ngayChieuGioChieu: mixed().required("Ngày chiếu không được để trống"),
  maRap: number().required("Mô tả không được để trống"),
  giaVe: number().required("Hình ảnh không được để trống"),
});

export default function ShowSchedule({ handleClose }) {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // gọi useParams lấy dữ liệu movieId trên url (đã khai báo key trên url của Component App là movieId nên bó tách movieId)

  const { selectMovieId } = useParams();

  //----useQuery để call API thành công

  const {
    data: movieDetails = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieDetails", selectMovieId],
    queryFn: () => getMovieDetails(selectMovieId),
    enable: !!selectMovieId,
  });

  // Hệ thống rạp và Cụm rạp theo hệ thống

  const { data: heThongRap = [], isLoading: loading } = useQuery({
    queryKey: ["heThongRap"],
    queryFn: getCinema,
    onSuccess: (data) => {},
  });

  // const [selectedOptionRap, setSelectedOptionRap] = useState("");
  const [selectedOptionCumRap, setSelectedOptionCumRap] = useState("");
  const handleChange = (evt) => {
    // setSelectedOptionRap(event.target.value);
    const layThongTin = evt.target.value;
    // setSelectedOptionCumRap(layThongTin);
    // setSelectedOptionCumRap(layThongTin);
    cumRap(layThongTin);
  };
  // const lay = selectedOptionCumRap ? selectedOptionCumRap : [];

  const { mutate: cumRap } = useMutation({
    mutationFn: (payload) => {
      setSelectedOptionCumRap(getInfoTheater(payload));
    },
  });

  ////////////////////////////////////////////////////////////////////////////////

  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maPhim: 0,
      ngayChieuGioChieu: "",
      maRap: 0,
      giaVe: 0,
    },
    resolver: yupResolver(showScheduleSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (values) => {
      return addShowtimes(values);
    },

    onSuccess: (data) => {
      return getMovie(data);
    },
    onError: () => {},
  });

  const onSubmit = (values) => {
    Swal.fire("Tạo lịch chiếu thành công!", "", "success");

    mutate(values);
    console.log(values);
  };

  //////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {/* ////////////////////////////////////////////////////////// */}
      <Typography
        sx={{ color: "grey", fontSize: "35px", textAlign: "center" }}
        marginTop={15}
      >
        Tạo lịch chiếu
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        marginTop={5}
        marginBottom={10}
      >
        <Box
          sx={{
            backgroundImage: `url(${movieDetails.hinhAnh})`,
            height: "300px",
            width: "300px",

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",

            backgroundPosition: "center",
            marginRight: "160px",
          }}
        ></Box>

        <Box
          xs={12}
          md={4}
          sx={{
            height: "300px",
            width: "500px",
          }}
        >
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            Tên phim: {movieDetails.tenPhim}
          </Typography>
          <Typography
            sx={{
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Mô tả:
            </span>{" "}
            {movieDetails.moTa}
          </Typography>
          <Typography>
            <span
              style={{
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Đánh giá:{" "}
            </span>
            {movieDetails.danhGia}
          </Typography>
        </Box>
      </Box>

      {/* //////////////////////////////////////////////////////// */}
      <Box paddingLeft={20}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ marginBottom: "15px" }}>Hệ thống rạp</Typography>
          <Select fullWidth onChange={handleChange} placeholder="Hệ thống rạp">
            {heThongRap.length > 0 &&
              heThongRap.map((option) => {
                return (
                  <MenuItem
                    key={option.maHeThongRap}
                    value={option.maHeThongRap}
                  >
                    {option.tenHeThongRap}
                  </MenuItem>
                );
              })}
          </Select>
          <Typography sx={{ marginBottom: "15px", marginTop: "15px" }}>
            Cụm rạp
          </Typography>

          <Select fullWidth placeholder="Cụm rạp" value={selectedOptionCumRap}>
            {selectedOptionCumRap.length > 0 &&
              selectedOptionCumRap.map((item) => {
                console.log(selectedOptionCumRap);
                return (
                  <MenuItem key={item.maCumRap} value={item.maCumRap}>
                    {item.tenCumRap}
                  </MenuItem>
                );
              })}
          </Select>

          <div>
            <TextField
              type="date"
              placeholder="Ngày khởi chiếu"
              {...register("ngayKhoiChieu", {
                setValueAs: (value) => {
                  return dayjs(value).format("DD/MM/YYYY");
                },
              })}
              style={{
                marginTop: "19px",
              }}
            />
          </div>
          <div>
            <TextField
              sx={{ marginTop: "19px" }}
              id="trailer"
              label="Giá vé"
              variant="outlined"
              error={!!errors.trailer}
              helperText={errors.trailer?.message}
              {...register("trailer")}
              fullWidth
            />
            {/* <input placeholder="Trailer" {...register("trailer")} /> */}
          </div>
          <CusButton
           
            type="submit"
          >
            Tạo lịch chiếu
          </CusButton>
        </form>
      </Box>
    </>
  );
}
