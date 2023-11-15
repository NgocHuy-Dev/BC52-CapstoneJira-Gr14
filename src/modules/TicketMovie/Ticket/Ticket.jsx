import React, { useState } from "react";
import { Divider, Paper, Typography } from "@mui/material";
import { Text, TextColor, Row, TextSeat } from "./Ticket.styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ButtonMain } from "../../../components/ButtonMain";
import { useTicketContext } from "../../../contexts/TicketContext/TicketContext";
import { bookTicket } from "../../../apis/bookTicketAPI";
import { ModalContent, ModalSuccess } from "../../../components/Modal";

export default function Ticket({ ticketInfo }) {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { selectedSeats, totalPrice } = useTicketContext();

  const queryClient = useQueryClient();

  const listTicket = selectedSeats.map((item) => ({
    maGhe: item.maGhe,
    giaVe: item.giaVe,
  }));

  const { mutate: handleBookTickets } = useMutation({
    mutationFn: () =>
      bookTicket({
        maLichChieu: ticketInfo.maLichChieu,
        danhSachVe: listTicket,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketShowtimes"] });
    },
  });

  const handlepay = () => {
    if (selectedSeats.length === 0) return alert("Vui lòng chọn ghế");
    handleBookTickets();
    setShowSuccessModal(true);
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };
  const Co = selectedSeats.length;
  if (Co) {
    return (
      <>
        {/* //////////////////////////////////////////////////////////////////////////////// */}

        <ButtonMain
          onClick={handlepay}
          style={{ width: "50%", height: "20%", fontSize: "16px" }}
        >
          Đặt vé
        </ButtonMain>
        {showSuccessModal && (
          <ModalSuccess>
            <ModalContent>
              <img
                style={{ width: "120px", marginTop: "10px" }}
                src="/Animation_1697533657854.gif"
                alt="confirm"
              />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Đặt vé thành công
              </Typography>
              <Typography
                sx={{ fontSize: "20px", marginY: "10px", opacity: "0.5" }}
              >
                Vui lòng xem lịch sử đặt vé ở profile
              </Typography>

              <ButtonMain onClick={handleClose}>Đồng ý</ButtonMain>
            </ModalContent>
          </ModalSuccess>
        )}
      </>
    );
  } else return null;
}
