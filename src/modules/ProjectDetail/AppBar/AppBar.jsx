import React from "react";
import { Box } from "@mui/material";

export default function AppBar() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.light",
        width: "100%",
        height: (theme) => theme.detail.appBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      APp bar
    </Box>
  );
}
