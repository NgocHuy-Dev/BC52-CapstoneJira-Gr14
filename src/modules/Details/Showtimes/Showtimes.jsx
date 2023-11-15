import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieShowTimes } from "../../../apis/cinemaAPI";
import Loading from "../../../components/Loading/Loading";
import { data } from "dayjs";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { Giochieu } from "./Showtime.styles";

export const tableStyle = {
  border: "none",
  boxShadow: "none",
};

const tableContainerStyle = {
  boxShadow: "none",
};

const headerTableStyle = {
  border: "none",
};

export default function Showtimes() {
  //-----------------------gọi useNavigate và tạo handleTicket để điều hướng nút qua component Tickets--> phải để useNavigate ở đầu không sẽ báo lỗi

  const navigate = useNavigate();

  const handleTicket = (maLichChieuId) => {
    return navigate(`/tickets/${maLichChieuId}`);
  };

  // gọi useParams lấy dữ liệu movieId trên url (đã khai báo key trên url của Component App là movieId nên bó tách movieId)

  const { movieId } = useParams();

  //-------------------------------đặt state và tạo  hàm show mã hệ thồng rạp -->state phải đặt đầu tiên để không báo lỗi
  const [cinemas, setCinemas] = useState([]);

  //---------------------------xử lý dữ liệu API với useQuery-----------------------------
  // // để luôn hiển thị rạp đầu tiên thì dùng useEffect-->state phải đặt đầu tiên để không báo lỗi vì lấy dc dữ liệu
  //-----------hoặc------------ dùng thêm onSucess của useQuery để set giá trị đầu tiên khi call API thành công

  const {
    data: MovieShowtimes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["MovieShowtimes", movieId],
    queryFn: () => getMovieShowTimes(movieId),
    enable: !!movieId,
    onSuccess: (dataFirst) => {
      setCinemas(
        //thêm toán tử 3 ngôi để nếu lỡ heThongRapChieu không có thì map không báo lỗi
        dataFirst.length > 0 ? dataFirst?.heThongRapChieu[0].cumRapChieu : []
      );
    },
  });

  // Loading...
  if (isLoading) {
    {
      return (
        <>
          <Loading />
        </>
      );
    }
  }

  //----------------------- đặt biến cinemaSystems để map dữ liệu call từ API-->phải để ở đây vì sẽ báo báo lỗi MovieShowtimes chưa khỏi tạo nếu để trước khi dùng biến MovieShowtimes
  // để thêm || [] để ban đầu khi call API hàm map không báo lỗi do map cần 1 mảng
  const cinemaSystems = MovieShowtimes?.heThongRapChieu || [];

  //------------------------------- tạo  hàm show mã hệ thồng rạp từ state khi người dùng tương tác--> nhớ cần return trong hàm con hàm find

  const handleGetCinemaSystem = (cinemaSystemId) => {
    const found = cinemaSystems.find((item) => {
      return item.maHeThongRap === cinemaSystemId;
    });

    setCinemas(found.cumRapChieu);
  };

  // Phần render-----------------------------------------------------------------------------

  return (
    <div>
      <div className="row">
        <div className="d-flex">
          {/* -------------------------render hệ thống rạp- */}
          {cinemaSystems.map((item) => {
            return (
              <div>
                <Button key={item.maHeThongRap}>
                  <img
                    src={item.logo}
                    alt=""
                    width="50px"
                    height="50px"
                    onClick={() => {
                      handleGetCinemaSystem(item.maHeThongRap);
                    }}
                  />
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <Giochieu className="row">
        {/* ------------------------------render danh sách rạp và lịch chiếu- */}

        <TableContainer style={tableContainerStyle} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>

                {cinemas.map((cinema) => {
                  return (
                    <div key={cinema.tenCumRap}>
                      <TableCell style={headerTableStyle}>
                        {cinema.tenCumRap}
                      </TableCell>

                      {cinema.lichChieuPhim.map((showtime) => {
                        //----------dùng đối tượng date định dạng lại ngày,giờ,... cho dễ xem

                        const time = dayjs(showtime.ngayChieuGioChieu).format(
                          "DD-MM-YYYY ~ HH:mm"
                        );

                        return (
                          <TableCell style={headerTableStyle}>
                            <Button
                              onClick={() => {
                                handleTicket(showtime.maLichChieu);
                              }}
                            >
                              {time}
                            </Button>
                          </TableCell>
                        );
                      })}
                    </div>
                  );
                })}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Giochieu>
    </div>
  );
}
