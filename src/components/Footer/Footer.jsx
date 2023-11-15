import React from "react";
import { BackGroundFooter } from "../styed/styledBg";
import { Box, Container, Grid } from "@mui/material";
import { TextFooter, TextTitle } from "../styed/styledText";
import { LogoFooter } from "../styed/styledFooter";
import { getCinema } from "../../apis/cinemaAPI";
import { useQuery } from "@tanstack/react-query";
import GitHubIcon from "@mui/icons-material/GitHub";
import FaceBook from "@mui/icons-material/Facebook";
import Facebook from "@mui/icons-material/Facebook";

export default function Footer() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["footerCinema"],
    queryFn: getCinema,
  });

  return (
    //
    <>
      <BackGroundFooter>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <ul
                style={{
                  listStyleType: "none",
                  textDecoration: "none",
                  lineHeight: "2",
                }}
              >
                <TextTitle as="h4" color="dark" fs="18px" fw="bold">
                  GIỚI THIỆU
                </TextTitle>
                <li> Về chúng tôi</li>
                <li>Thỏa thuận sử dụng</li>
                <li>Quy chế hoạt động</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ul
                style={{
                  listStyleType: "none",
                  textDecoration: "none",
                  lineHeight: "2",
                }}
              >
                <TextTitle as="h4" color="dark" fs="18px" fw="bold">
                  GÓC ĐIỆN ẢNH
                </TextTitle>
                <li>Thể loại phim</li>
                <li>Bình luận phim</li>
                <li>Blog điện ảnh</li>
                <li>Phim hay tháng</li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ul
                style={{
                  listStyleType: "none",
                  textDecoration: "none",
                  lineHeight: "2",
                }}
              >
                <TextTitle as="h4" color="dark" fs="18px" fw="bold">
                  HỖ TRỢ
                </TextTitle>
                <li>Góp ý</li>
                <li>Sale & Services</li>
                <li>Rạp/Giá vé</li>
                <li>Tuyển dụng</li>
                <li>FAQ</li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img
                src="./logo.jpg"
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
              />

              {/* Add your logo here */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 120px)",
                }}
              >
                <Box>
                  <LogoFooter
                    href="#"
                    target="_blank"
                    display="flex"
                    alignItems="center"
                  >
                    <GitHubIcon fontSize="large" />
                    <TextFooter ml="10px">GitHub</TextFooter>
                  </LogoFooter>
                </Box>
                <Box>
                  <LogoFooter
                    href="#"
                    target="_blank"
                    display="flex"
                    alignItems="center"
                  >
                    <Facebook fontSize="large" />
                    <TextFooter ml="10px">FaceBook</TextFooter>
                  </LogoFooter>
                </Box>

                {data.map((item) => {
                  return (
                    <LogoFooter key={item.maHeThongRap}>
                      <img
                        src={item.logo}
                        alt={item.tenHeThongRap}
                        width="100%"
                        height="100%"
                        style={{ display: "inline-block" }}
                      />
                    </LogoFooter>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Container>
        <p
          style={{
            textAlign: "center",
            paddingTop: "32px",
          }}
        >
          © 2018 Movie Seat Selection . All Rights Reserved | Design by
          <a href="#" target="_blank">
            DHN Cinema
          </a>
        </p>
      </BackGroundFooter>
    </>
  );
}
