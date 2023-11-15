import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  ListItem,
  ListItemText,
  Divider,
  List,
} from "@mui/material";
import {
  TableCellStyle,
  TableStyle,
  Text,
  TextColor,
  Row,
  TextSeat,
  Screen,
} from "./TicketPage.styles";
import { useTicketContext } from "../../../contexts/TicketContext/TicketContext";
import { getTicketMovie } from "../../../apis/bookTicketAPI";
import Loading from "../../../components/Loading/Loading";
import {
  GridCustom,
  ButtonSeat,
  StyledTableCell,
  StyledTableRow,
} from "./TicketPage.styles";
import { useUserContext } from "../../../contexts/UserContext/UserContext";
import { Spring } from "react-spring";
import Ticket from "../Ticket/Ticket";

const createData = (col1, col2, col3) => {
  return { col1, col2, col3 };
};

const rows = [
  createData("Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"),
  createData("Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"),
];

export default function TicketPage({ showtimeId, ticketInfo }) {
  console.log(ticketInfo);

  //
  const { currentUser, handleSignout } = useUserContext();
  //
  const { selectedSeats, handleSelect, totalPrice } = useTicketContext();

  const { data, isLoading } = useQuery({
    queryKey: ["ticketShowtimes"],
    queryFn: () => getTicketMovie(showtimeId),
    enabled: !!showtimeId,
  });

  const listSeat = data?.danhSachGhe || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid>
      <Grid item xs={12} marginBottom={5}>
        <Box
          sx={{
            backgroundColor: "white",
            width: "100%",
            height: "10px",
            borderRadius: "3px",
          }}
        ></Box>
        <Typography sx={{ textAlign: "center", color: "white" }}>
          Màn hình
          {/* Details*/}
          <Typography className="bookingMovie text-success fw-30 pt-2 fs-1">
            <TextColor>{ticketInfo.tenPhim}</TextColor>
          </Typography>
          <p className=" text-left fs-6">
            Please check details below and select your seats
          </p>
          <Container
            sx={{
              paddingTop: "30px",
              zIndex: "100",
              position: "relative",
              left: "150px",
            }}
          >
            <Grid
              container
              spacing={10}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Flim Details */}

              <Grid item xs={12} md={4}>
                <img src={ticketInfo.hinhAnh} width={'75%'} height={310}/>
              </Grid>
              {/* Flim  Location Details*/}

              <Grid
                item
                xs={12}
                md={8}
                sx={{ overflow: "hidden", maxWidth: "80%" }}
              >
                <List
                  sx={{
                    width: "80%",
                    maxWidth: '50%',
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem button>
                    <ListItemText>
                      <Row>
                        <Text>Cụm Rạp:</Text>
                        <TextColor>{ticketInfo.tenCumRap}</TextColor>
                      </Row>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem button divider>
                    <ListItemText>
                      <Row>
                        <Text>Địa chỉ:</Text>
                        <TextColor>{ticketInfo.diaChi}</TextColor>
                      </Row>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Row>
                        <Text>Rạp:</Text>
                        <TextColor>{ticketInfo.tenRap}</TextColor>
                      </Row>
                    </ListItemText>
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <ListItemText>
                      <Row>
                        <Text>Thời gian chiếu:</Text>
                        <TextColor>
                          {ticketInfo.ngayChieu} - {ticketInfo.gioChieu} GMT+7
                        </TextColor>
                      </Row>
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Container>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: "30px",
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  margin: "15px",
                  width: "85px",
                  backgroundColor: "#e6141e",
                }}
              >
                Đã đặt
              </Paper>
              <Paper
                elevation={4}
                sx={{
                  margin: "15px",
                  width: "85px",
                  backgroundColor: "white",
                  fontSize: "15px",
                }}
              >
                Thuờng
              </Paper>
              <Paper
                elevation={4}
                sx={{
                  margin: "15px",
                  width: "85px",
                  backgroundColor: "yellow",
                }}
              >
                VIP
              </Paper>
              <Paper
                elevation={4}
                sx={{
                  margin: "15px",
                  width: "85px",
                  backgroundColor: "#3ae374",
                }}
              >
                Đang chọn
              </Paper>
            </div>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#ffaf4087",
                fontStyle: "italic",
              }}
            ></Typography>
          </Grid>
          {/* SeatItem */}
          <h3 className="now pb-2"> Please select your Seats NOW!</h3>
          <Screen></Screen>
          <br />
          <GridCustom>
            {/* render depends on condition */}
            {listSeat.map((seat) => {
              const isSelected = selectedSeats.find(
                (chair) => chair.maGhe === seat.maGhe
              );
              let isDisable = seat.daDat;
              let color = "";

              if (seat.daDat) {
                color = "#e6141e";
              } else if (isSelected) {
                color = "#3ae374";
              } else if (seat.loaiGhe === "Thuong") {
                color = "white";
              } else {
                color = "yellow";
              }
              return (
                <ButtonSeat
                  onClick={() => {
                    // setIsSelected(!isSelected);
                    handleSelect({ ...seat, isSelected: !isSelected });
                  }}
                  onTouchEnd={() => {
                    handleSelect({ ...seat, isSelected: !isSelected });
                  }}
                  disabled={isDisable || isLoading}
                  style={{
                    backgroundColor: color,
                    width: "40px",
                    height: "40px",
                    padding: "5px",
                  }}
                  key={seat.tenGhe}
                >
                  {seat.daDat ? "X" : seat.tenGhe}
                </ButtonSeat>
              );
            })}
          </GridCustom>
          {/* Table Total */}
          <TableContainer>
            <TableStyle sx={{ width: "80%", borderRadius: "20px" }}>
              <TableHead>
                <TableRow>
                  <TableCellStyle
                    className="headerStyle fs-4 fw-bold "
                    sx={{ color: "#fff5", fontWeight: 700 }}
                  >
                    Tên
                  </TableCellStyle>
                  <TableCellStyle
                    className="headerStyle fs-4 fw-bold"
                    sx={{ color: "#fff5", fontWeight: 700 }}
                  >
                    Ghế chọn
                  </TableCellStyle>
                  <TableCellStyle
                    className="headerStyle fs-4 fw-bold"
                    sx={{ color: "#fff5", fontWeight: 700 }}
                  >
                    Tổng tiền
                  </TableCellStyle>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCellStyle className="cellStyle">
                    <Typography sx={{ color: "#fff", fontWeight: 700 }}>
                      {" "}
                      {currentUser.hoTen}
                    </Typography>
                  </TableCellStyle>
                  <TableCellStyle className="cellStyle">
                    {selectedSeats.map((item, index) => {
                      const separator =
                        index === selectedSeats.length - 1 ? "" : ", ";
                      return (
                        <TextSeat key={item.stt}>
                          {item.tenGhe} {separator}
                        </TextSeat>
                      );
                    })}
                  </TableCellStyle>
                  <TableCellStyle
                    className="cellStyle"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {" "}
                    {totalPrice.toLocaleString()} VND
                  </TableCellStyle>
                  <TableCellStyle className="cellStyle fs-4 fw-bold">
                    <Ticket ticketInfo={ticketInfo} />
                  </TableCellStyle>
                </TableRow>
              </TableBody>
            </TableStyle>
          </TableContainer>
        </Typography>
      </Grid>
    </Grid>
  );
}
