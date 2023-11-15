import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import {CusContainer} from './Cinema.style'
import dayjs from "dayjs";
import { Item } from "../../styledModules";
import { ButtonCinema } from "../../../components/styed/styledButton";
import {
  getCinema,
  getInfoTheater,
  getTheaterShowtimes,
} from "../../../apis/cinemaAPI";
import cover from "./../../../components/assets/cinemaBg.avif";





export default function Cinema({ theaterId }) {
  const [infoTheaters, setInfoTheater] = useState([]);

  const [listMovies, setListMovies] = useState([]);

  const [selectedTenCumRap, setSelectedTenCumRap] = useState(0);

  const [selectedTab, setSelectedTab] = useState(0);

  const navigate = useNavigate();

  const { data: theaterSystems = [], isLoading } = useQuery({
    queryKey: ["logo", theaterId],
    queryFn: () => getCinema(theaterId),
  });

  const handleChangeTab = async (theaterSystemsId) => {
    try {
      const infoTheaters = await getInfoTheater(theaterSystemsId);
      setInfoTheater(infoTheaters);
      setSelectedTab(theaterSystemsId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetListMovie = async (infoTheaterId, tenCumRap) => {
    try {
      const listMovies = await getTheaterShowtimes(infoTheaterId);
      setListMovies(listMovies);
      setSelectedTenCumRap(tenCumRap);
    } catch (error) {
      console.log(error);
    }
  };

  //Set default value when no value has been selected
  useEffect(() => {
    if (theaterSystems.length > 0) {
      handleChangeTab(theaterSystems[0].maHeThongRap);
    }
  }, [theaterSystems]);

  useEffect(() => {
    if (infoTheaters.length > 0) {
      handleGetListMovie(
        infoTheaters[0].maHeThongRap,
        infoTheaters[0].tenCumRap
      );
    }
  }, [infoTheaters]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <Box sx={{
      backgroundImage: `url(${cover})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundBlendMode:"rgba(0, 0,0, 0.4)",
      height: "585px",


    }}>
    <Container
      sx={{
        margin: "100px auto",
        marginBottom: "100px",
        borderRadius: "5px",
        height: "80vh",
        overflow: "hidden",
        boxShadow: " rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        // backgroundColor: "rgba(0, 0,0, 0.4)",
       
      }}
      id="cinema"
    >
   
      <h1 className="text-center fw-bold text-white">LỊCH CHIẾU</h1>
      <Grid container>
        <Grid item xs={1}>
          <Box sx={{ marginTop: "10px" }}>
            <Grid spacing={1} container>
              {theaterSystems.map((item) => (
                <Grid item key={item.maHeThongRap} xs={12}>
                  <Item
                    backgroundColor={
                      selectedTab === item.maHeThongRap
                        ? "#e829005e"
                        : "transparent"
                    }
                    onClick={() => handleChangeTab(item.maHeThongRap)}
                  >
                    <img src={item.logo} alt="logo" width={50} height={50} />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ height: "80vh", overflowY: "scroll" }}>
          <Box sx={{ padding: "0 10px", marginTop: "10px" }}>
            <Grid spacing={1} container>
              {infoTheaters.map((infoTheater) => (
                <Grid item key={infoTheater.maCumRap} xs={12}>
                  <Item
                    backgroundColor={
                      selectedTenCumRap === infoTheater.tenCumRap
                        ? "#e829005e"
                        : "transparent"
                    }
                    p="12px 0"
                    onClick={() =>
                      handleGetListMovie(
                        infoTheater.maHeThongRap,
                        infoTheater.tenCumRap
                      )
                    }
                  >
                    <Typography sx={{ color: "#ffff", fontWeight: "bold" }}>
                      {infoTheater.tenCumRap}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(17, 110, 153, 0.301)"}}>
                      {infoTheater.diaChi}
                    </Typography>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={7} sx={{ height: "80vh", overflowY: "scroll" }}>
          <Box>
            {listMovies.map((rap) =>
              rap.lstCumRap.map((cumRap) =>
                cumRap.danhSachPhim.map(
                  (phim) =>
                    // Normalize strings before comparing
                    selectedTenCumRap &&
                    selectedTenCumRap.toLowerCase() ===
                      cumRap.tenCumRap.toLowerCase() && (
                      <Grid
                        container
                        sx={{
                          borderBottom: "1px dashed #cd84f1",
                        }}
                        key={phim.maPhim}
                      >
                        <Grid item xs={4} sx={{ padding: "15px" }}>
                          <img src={phim.hinhAnh} alt="hinhAnh" width="50%" />
                        </Grid>
                        <Grid item xs={8}>
                          <Box sx={{ marginLeft: "10px" }}>
                            <Box display={"flex"} alignItems={"center"}>
                              <Typography
                                sx={{
                                  color: "#e33a48",
                                  fontSize: "25px",
                                  fontWeight: "bold",
                                }}
                              >
                                {phim.tenPhim}
                              </Typography>
                              {phim.hot && (
                                <Chip
                                  label="HOT"
                                  color="error"
                                  variant="outlined"
                                  size="small"
                                  sx={{ fontWeight: "bold", ml: 2 }}
                                />
                              )}
                            </Box>

                            {phim.lstLichChieuTheoPhim.map((lichChieu) => (
                              <ButtonCinema
                                onClick={() =>
                                  navigate(`/tickets/${lichChieu.maLichChieu}`)
                                }
                                key={lichChieu.maLichChieu}
                                variant="body2"
                              >
                                {dayjs(lichChieu.ngayChieuGioChieu).format(
                                  "DD-MM-YYYY ~ HH:mm"
                                )}
                              </ButtonCinema>
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    )
                )
              )
            )}
          </Box>
        </Grid>
      </Grid>
      
    </Container>
    </Box>
  );
}