import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import CreateIcon from "@mui/icons-material/Create";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import NearMeIcon from "@mui/icons-material/NearMe";
import FolderIcon from "@mui/icons-material/Folder";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { Text, NavListButton, CusLogo } from "./styles";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

function handleClick(event, path, navigate) {
  event.preventDefault();
  navigate(path);
}

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Box>czxczx</Box>
        <Toolbar>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "black",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "32px",
            paddingBottom: "32px",
          }}
        >
          {" "}
          <CusLogo>
            <img
              src={process.env.PUBLIC_URL + "/logo.jpg"}
              width={40}
              height={40}
              style={{
                borderRadius: "50%",
                border: "2px solid #FE6B8B",
              }}
            />
            <Box>
              <Typography
                sx={{
                  marginRight: 2,
                  color: "white",
                  paddingTop: "8px",
                  paddingRight: "19px",
                }}
              >
                Cinema
              </Typography>
            </Box>
          </CusLogo>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <NavListButton
              onClick={(event) => handleClick(event, "/admin/users", navigate)}
            >
              <Text style={{ color: "white" }}>
                <AccountCircle sx={{ marginRight: 2, color: "white" }} />
                User
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem disablePadding>
            <NavListButton
              onClick={(event) => handleClick(event, "/admin/movies", navigate)}
            >
              <Text style={{ color: "white" }}>
                <DashboardIcon sx={{ marginRight: 2, color: "white" }} /> Films
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem disablePadding>
            <NavListButton
              onClick={(event) =>
                handleClick(event, "/admin/showtime", navigate)
              }
            >
              <Text style={{ color: "white" }}>
                <NoteAltIcon sx={{ marginRight: 2, color: "white" }} /> Showtime
              </Text>
            </NavListButton>
          </ListItem>
        </List>
        <Divider />
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
