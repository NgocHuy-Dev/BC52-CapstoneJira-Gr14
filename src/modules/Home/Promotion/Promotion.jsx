import React from "react";
import { Box, Grid, Container, Paper, Typography } from "@mui/material";
import { Carousel } from "react-bootstrap";
import { CusCarousel } from "./Promotion.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Promotion() {
  return (
    <Container className="mt-3 mb-3">
      <Box className="mx-4 mb-3" sx={{ borderLeft: "10px solid navy" }}>
        {" "}
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          TIN KHUYẾN MÃI
        </Typography>
      </Box>

      <Carousel
        style={{ width: "400px", height: "200px", margin: "auto" }}
        className="pb-3"
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./promotion1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./promotion2.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./promotion3.webp"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./promotion4.webp"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./promotion5.webp"
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
