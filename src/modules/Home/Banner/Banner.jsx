import React from "react";

import { Carousel } from "react-bootstrap";
import { CusCarousel } from './Banner.styles'
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "../../../apis/movieAPI";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Banner() {
  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["banners"], queryFn: getBanner });

  if (isLoading) {
    <h1>Loading...</h1>;
  }
  return (
    
   
      <CusCarousel >
      {banners.map((banner) => {
        return (
          <Carousel.Item key={banner.maBanner} style={{ height: "80vh" }}>
            <img
              src={banner.hinhAnh}
              alt=""
              className="img-fluid"
              width="100%"
            />
          </Carousel.Item>
        );
      })}
      </CusCarousel>
   
    
  );
}
