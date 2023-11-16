import React from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { DndContext } from "@dnd-kit/core";

export default function BoardContent({ lstTask }) {
  console.log("list Task", lstTask);
  const handleDragEnd = (event) => {
    console.log("handleDragEnd", event);
  };
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        height: (theme) => theme.detail.detailContentHeight,
        p: "10px 0",
      }}
    >
      <ListColumns lstTask={lstTask} />
    </Box>
  );
}
