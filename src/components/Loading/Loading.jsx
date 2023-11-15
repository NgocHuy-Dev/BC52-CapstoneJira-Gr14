import React from "react";
import Box from "@mui/material/Box";
import "./styles.css";

export default function Loading() {
  return (
    <Box
      sx={{
        with: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="main">
        <div className="loader"></div>
      </div>
    </Box>
  );
}
