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
import { Text, NavListButton } from "./styles";
import { useNavigate } from "react-router-dom";

const drawerWidth = 300;

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>hehe</Toolbar>
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
            <NavListButton onClick={navigate("/")}>
              <Text>
                <SettingsIcon sx={{ marginRight: 2 }} /> Project Management
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem disablePadding>
            <NavListButton>
              <Text>
                <CreateIcon sx={{ marginRight: 2 }} /> Create Project
              </Text>
            </NavListButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <NavListButton>
              <Text>
                <LocalShippingIcon sx={{ marginRight: 2 }} /> Release
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem>
            <NavListButton>
              <Text>
                <LineStyleIcon sx={{ marginRight: 2 }} /> Issues and fillter
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem>
            <NavListButton>
              <Text>
                <NoteAltIcon sx={{ marginRight: 2 }} /> Pages
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem>
            <NavListButton>
              <Text>
                <NearMeIcon sx={{ marginRight: 2 }} /> Report
              </Text>
            </NavListButton>
          </ListItem>
          <ListItem>
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
