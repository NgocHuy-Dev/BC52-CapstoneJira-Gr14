import React from "react";
import { Grid, Stack } from "@mui/material";
import Navbar from "../../components/Navbar";
import "./style.css";
import { Outlet } from "react-router-dom";

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
