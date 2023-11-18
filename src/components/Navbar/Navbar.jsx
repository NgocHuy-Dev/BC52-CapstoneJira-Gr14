import React from "react";
import { Box, Avatar, Button, Typography, Tooltip } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import CreateIcon from "@mui/icons-material/Create";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import NearMeIcon from "@mui/icons-material/NearMe";
import FolderIcon from "@mui/icons-material/Folder";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Text, NavListButton } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import avt from "../../assets/img/meme-khoc_33.webp";
import cyberlogo from "../../assets/img/cybersoft logo.jpeg";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DrawIcon from "@mui/icons-material/Draw";
import { red } from "@mui/material/colors";

const drawerWidth = 270;

export default function Navbar() {
  const { currentUser, handleSignout } = useUserContext();
  const { projectId } = useParams();

  const navigate = useNavigate();

  const handleSignin = () => {
    navigate(`/sign-in`);
  };
  const handleSignup = () => {
    navigate(`/sign-up`);
  };
  const handleGohome = () => {
    navigate(`/`);
  };

  return (
    <Box sx={{ display: "flex", marginTop: "30px" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          minWidth: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ height: "80px" }}>
            <Avatar
              src={cyberlogo}
              variant="square"
              sx={{ height: "100%", width: "100%" }}
            />
          </Box>
          <Box>
            {currentUser && (
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Button>
                    <Avatar src={avt}>{currentUser.name}</Avatar>
                  </Button>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      color: "primary.main",
                    }}
                  >
                    {currentUser.name}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    sx={{ fontSize: "0.675rem", marginBottom: "5px" }}
                    variant="outlined"
                    onClick={handleSignout}
                  >
                    <LogoutIcon />
                    Đăng Xuất
                  </Button>
                </Box>
              </Box>
            )}
            {!currentUser && (
              <Box>
                <Button
                  sx={{ margin: 1, fontSize: "0.8" }}
                  onClick={handleSignin}
                  variant="outlined"
                  startIcon={<LoginIcon />}
                >
                  Đăng nhập
                </Button>
                <Button
                  sx={{ margin: 1, fontSize: "0.8" }}
                  onClick={handleSignup}
                  variant="outlined"
                  startIcon={<HowToRegIcon />}
                >
                  Đăng Ký
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <NavListButton>
              <Text>
                <DashboardIcon sx={{ marginRight: 2 }} /> Cyber Board
              </Text>
            </NavListButton>
          </ListItem>

          <ListItem disablePadding>
            <NavListButton onClick={handleGohome}>
              <Text>
                <SettingsIcon sx={{ marginRight: 2 }} /> Project Management
              </Text>
            </NavListButton>
          </ListItem>

          <ListItem disablePadding>
            <NavListButton onClick={() => navigate("/createproject")}>
              <Text>
                <CreateIcon sx={{ marginRight: 2 }} /> Create Project
              </Text>
            </NavListButton>
          </ListItem>

          {projectId && Object.keys(projectId).length > 0 && (
            <ListItem disablePadding>
              <NavListButton
                onClick={() => navigate(`/createtask/${projectId}`)}
              >
                <Text>
                  <DrawIcon sx={{ marginRight: 2 }} /> Create Task
                </Text>
              </NavListButton>
            </ListItem>
          )}

          <ListItem disablePadding>
            <NavListButton onClick={() => navigate("/usermanagement")}>
              <Text>
                <CreateIcon sx={{ marginRight: 2 }} /> User Management
              </Text>
            </NavListButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <NavListButton>
              <Text>
                <LocalShippingIcon sx={{ marginRight: 2 }} /> Release
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem disablePadding>
            <NavListButton>
              <Text>
                <LineStyleIcon sx={{ marginRight: 2 }} /> Issues and fillter
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem disablePadding>
            <NavListButton>
              <Text>
                <NoteAltIcon sx={{ marginRight: 2 }} /> Pages
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem disablePadding>
            <NavListButton>
              <Text>
                <NearMeIcon sx={{ marginRight: 2 }} /> Report
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem disablePadding>
            <NavListButton>
              <Text>
                <FolderIcon sx={{ marginRight: 2 }} /> Components
              </Text>
            </NavListButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
