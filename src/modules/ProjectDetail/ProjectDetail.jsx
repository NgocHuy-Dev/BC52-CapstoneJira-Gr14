import { Box, Container } from "@mui/material";
import React from "react";
import AppBar from "./AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";

import BoardContent from "./BoardContent";

export default function ProjectDetail() {
  return (
    <Container disableGutters sx={{ height: "100vh", maxWidth: "85%" }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  );
}
