import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectManagement from "../../modules/Home/ProjectManagement/ProjectManagement";
import { Grid } from "@mui/material";
import Navbar from "../../components/Navbar";

import "./style.css";

export default function ProjectLayout() {
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Navbar />
        </Grid>
        <Grid xs={10}>
          <Header />
          <div className="dummy-element"></div>
          <ProjectManagement />
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
