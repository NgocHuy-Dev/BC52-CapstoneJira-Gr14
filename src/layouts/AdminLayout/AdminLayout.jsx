// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Footer from '../../components/Footer'
// import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'

// export default function AdminLayout() {
//   return (
//     <div>
//         <HeaderAdmin/>

//         <Outlet/>

//         <Footer/>
//     </div>
//   )
// }
//////////////////////////////

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import { Grid, Box } from "@mui/material";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { CusDummyElement, CusBox } from "./AdminLayout.styles";

export default function AdminLayout() {
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <CusBox>
            <Navbar />
          </CusBox>
        </Grid>
        <Grid xs={10}>
          <HeaderAdmin />
          <CusDummyElement>
            <Outlet />
          </CusDummyElement>
        </Grid>
      </Grid>
    </>
  );
}
