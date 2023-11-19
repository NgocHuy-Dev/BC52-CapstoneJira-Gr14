import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import Navbar from "../../components/Navbar";
import "./style.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function ProjectLayout() {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Navbar />
      </Grid>
      <Grid item xs={10}>
        {/* <div className="dummy-element"></div> */}
        <Outlet />

        {/* <Footer /> */}
      </Grid>
    </Grid>
  );
}
