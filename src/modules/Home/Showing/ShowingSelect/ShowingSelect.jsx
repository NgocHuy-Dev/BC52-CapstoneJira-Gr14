import React from "react";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/styed/styledButton";
import { useQuery } from "@tanstack/react-query";
import { getMovieShowTimes } from "../../../../apis/cinemaAPI";
import dayjs from "dayjs";
import { Label } from "@mui/icons-material";

export default function ShowingSelect({ listFilms }) {
  const [film, setFilm] = React.useState("");
  const [cinema, setCinema] = React.useState("");
  const [dayTime, setDayTime] = React.useState("");
  // const [cinemaList, setCinemaList] = React.useState([]);
  const [dateCinemas, setDateCinemas] = React.useState([]);
  const navigate = useNavigate();

  const { data: listCinema = [] } = useQuery({
    queryKey: ["cinema", film],
    queryFn: () => getMovieShowTimes(film),
    enabled: !!film,
  });

  // console.log(dateCinemas);

  const handleChangeFilm = (event) => {
    setFilm(event.target.value);
    setCinema(""); // Reset giá trị của rạp về rỗng
    // setCinemaList([]); // Reset danh sách rạp về rỗng
    setDayTime("");
  };

  const handleChangeCinema = (event) => {
    setCinema(event.target.value);
    const selectedCinema = event.target.value;
    const selectedCinemaObject = listCinema.heThongRapChieu?.find(
      (itemCinema) => itemCinema.maHeThongRap === selectedCinema.maHeThongRap
    );
    if (selectedCinemaObject) {
      setDateCinemas(selectedCinemaObject.cumRapChieu);
      // setCinemaList(selectedCinemaObject.cumRapChieu);
    } else {
      setDateCinemas([]);
      // setCinemaList([]);
    }
    setDayTime("");
  };

  const handleChangeDayTime = (event) => {
    setDayTime(event.target.value);
  };

  return (
    <Container sx={{ padding: "10px" }} style={{ position: 'absolute' , top: '490px', left: '150px', zIndex: '9'}}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{ padding: "5px" }}
      >
        <Box sx={{ minWidth: 1 / 4 }}  bgcolor={'antiquewhite'} >
          <FormControl fullWidth>
            <InputLabel id="label-phim">Phim</InputLabel>
            <Select
              labelId="label-phim"
              id="phim"
              value={film}
              placeholder="Phim"
              onChange={handleChangeFilm}
            >
              <MenuItem value={0}>Chọn phim</MenuItem>
              {listFilms.map((itemFilm) => {
                return (
                  <MenuItem key={itemFilm.maPhim} value={itemFilm.maPhim}>
                    {itemFilm.tenPhim}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 1 / 4 }}  bgcolor={'antiquewhite'}>
          <FormControl fullWidth>
            <InputLabel id="label-rap">Rạp</InputLabel>
            <Select
              labelId="label-rap"
              id="rap"
              value={cinema}
              placeholder="Rạp"
              onChange={handleChangeCinema}
            >
              <MenuItem value="">Chọn rạp</MenuItem>

              {listCinema.heThongRapChieu?.map((itemCinema) => {
                return (
                  <MenuItem key={itemCinema.maHeThongRap} value={itemCinema}>
                    {itemCinema.tenHeThongRap}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 1 / 4 }}  bgcolor={'antiquewhite'} >
          <FormControl fullWidth >
            <InputLabel id="label-time">Ngày giờ chiếu</InputLabel>
            <Select
              labelId="label-time"
              id="time"
              value={dayTime}
              placeholder="Ngày giờ chiếu"
              onChange={handleChangeDayTime}
             
            >
              <MenuItem value="">Chọn ngày giờ chiếu</MenuItem>
              {dateCinemas.map((listShowTime) => {
                return listShowTime.lichChieuPhim.map((itemShowTime) => {
                  const time = dayjs(listShowTime.ngayChieuGioChieu).format(
                    "DD-MM-YYYY ~ HH:mm"
                  );
                  return (
                    <MenuItem
                      key={itemShowTime.maLichChieu}
                      value={itemShowTime.maLichChieu}
                    >
                      {time}
                    </MenuItem>
                  );
                });
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 1 / 5 }} marginRight={25}>
          <Button
            width="100%"
            height="100%"
            onClick={() => navigate(`tickets/${dayTime}`)}
          >
            Mua vé nhanh
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
