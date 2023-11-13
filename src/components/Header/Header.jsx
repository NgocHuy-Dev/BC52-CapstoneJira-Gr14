import { Avatar, Box } from "@mui/material";
import React from "react";
import logo from "../../assets/img/images.png";
import { CusLogo } from "./header.styled";

export default function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        height: (theme) => theme.detail.headerHeight,
      }}
    >
      <Box>
        <CusLogo src={logo} />
      </Box>
      <Box></Box>
    </Box>
  );
}
