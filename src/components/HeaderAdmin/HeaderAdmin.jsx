import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  Container,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
export default function HeaderAdmin() {
  const navigate = useNavigate();

  const handleNavigateAdmin = (url) => {
    navigate(url);
  };

  const { currentUser, handleSignout } = useUserContext();
  return (
    <>
      <CssBaseline />
      <AppBar color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MovieFilterIcon
              sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
              color="error"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 120,
                display: { xs: "flex", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#d32f2f",
                textDecoration: "none",
              }}
              onClick={() => navigate("/")}
            >
              Admin
            </Typography>

            <Tooltip title="User">
              <IconButton
                sx={{
                  p: 0,
                  "&:hover": {
                    color: "#3f2fd3",
                    backgroundColor: "transparent",
                    my: 2,
                    color: "black",
                    display: "block",
                    margin: "0 10px",
                  },
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/logo.jpg"}
                  width={40}
                  height={40}
                  style={{
                    borderRadius: "50%",
                    border: "2px solid #FE6B8B",
                    marginRight: "5px",
                  }}
                />
                <Typography sx={{ color: "#3295b3", fontWeight: 700 }}>
                  {" "}
                  Welcome {currentUser.hoTen} !
                </Typography>
              </IconButton>
            </Tooltip>

            <IconButton
              sx={{
                "&:hover": {
                  color: "#3f2fd3",
                  backgroundColor: "transparent",
                },
              }}
              onClick={handleSignout}
            >
              <ExitToApp />
              <Typography>Đăng xuất</Typography>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
