import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import TicketPage from "./TicketPage/TicketPage";
import Ticket from "./Ticket/Ticket";
import { getTicketMovie } from "../../apis/bookTicketAPI";
import TicketProvider from "../../contexts/TicketContext/TicketContext";
import Loading from "../../components/Loading/Loading";

export default function TicketMovie() {
  const { showtimeId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["ticketShowtimes"],
    queryFn: () => getTicketMovie(showtimeId),
    enabled: !!showtimeId,
  });

  const ticketInfo = data?.thongTinPhim || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TicketProvider>
      <Box
        sx={{
          backgroundImage: `url(${ticketInfo.hinhAnh})`,
          height: "100%",
          position: "relative",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          paddingBottom: "100px",

          "&::after": {
            backgroundColor: "#000000bd",
            display: "block",
            content: "''",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          },
        }}
      >
        <Container
          sx={{ paddingTop: "30px", zIndex: "100", position: "relative" }}
          xs={12}
          md={4}
        >
          <TicketPage showtimeId={showtimeId} ticketInfo={ticketInfo} />
        </Container>
      </Box>
    </TicketProvider>
  );
}
