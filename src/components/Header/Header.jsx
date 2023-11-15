import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import React, { useState } from "react";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import TheatersIcon from '@mui/icons-material/Theaters';
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { SigninAndSignup, SpanHeader } from "./styledHeader";
import PropTypes from "prop-types";


function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Header(props) {
  const pages = [
    { id: "showing", label: "Lịch chiếu" },
    { id: "cinema", label: "Cụm rạp" },
    { id: "tintuc", label: "Tin tức" },
    { id: "application", label: "Ứng dụng" },
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();
  const { currentUser, handleSignout } = useUserContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    navigate(`/`);
    const element = document.getElementById(`${page.id}`);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      handleSignout();
    }
  };
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar color="default">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
             
              <img src="./logo.jpg" width={40} height={40}/>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 900,
                  letterSpacing: ".3rem",
                  color: "#3295b3",
                  textDecoration: "none",
                }}
              >
                Cinema
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  ))}

                  {currentUser?.maLoaiNguoiDung === "QuanTri" &&   <MenuItem
                      onClick={() => navigate(`/admin/movies`)}
                    >
                      <Typography textAlign="center">Trang Quản Trị</Typography>
                    </MenuItem> }
                </Menu>
              </Box>


              <MovieFilterIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                color="error"
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#3f2fd3",
                  textDecoration: "none",
                }}
              >
                Movie
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
                justifyContent="center"
              >
                {pages.map((page) => (
                  <Button
                    key={page.id}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      margin: "0 10px",
                    }}
                  >
                    {page.label}
                  </Button>
                ))}
                 {currentUser?.maLoaiNguoiDung === "QuanTri" &&   <Button
                      onClick={() => navigate(`/admin/movies`)}
                    >
                     Trang Quản Trị
                    </Button> }
              </Box>

              {/* Account */}
              {currentUser ? (
                <>
                  <Box
                    sx={{ flexGrow: 0, borderRight: 1, pr: 2 }}
                    display={"inline-block"}
                  >
                    <Tooltip title="User">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{
                          p: 0,
                          "&:hover": {
                            color: "#3f2fd3",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                       
                        <img src="./logo.jpg" width={40} height={40}/>
                        <Typography sx={{ color: "#3295b3",  fontWeight: 700,}}> Welcome {currentUser.hoTen} !</Typography>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={() => handleCloseUserMenu(setting)}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

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
                </>
              ) : (
                <>
                  {/* Signin */}
                  <Box sx={{ flexGrow: 0 }}>
                    <SigninAndSignup
                      onClick={() => navigate(`/signin`)}
                      borderRight="1px solid #9e9e9e"
                    >
                      <Tooltip title="Đăng nhập">
                        <AccountCircle fontSize="large" />
                      </Tooltip>
                      <SpanHeader>Đăng nhập</SpanHeader>
                    </SigninAndSignup>
                  </Box>

                  {/* Signup */}
                  <Box sx={{ flexGrow: 0 }}>
                    <SigninAndSignup onClick={() => navigate(`/signup`)}>
                      <Tooltip title="Đăng kí">
                        <AccountCircle fontSize="large" />
                      </Tooltip>
                      <SpanHeader>Đăng kí</SpanHeader>
                    </SigninAndSignup>
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </>
  );
}
