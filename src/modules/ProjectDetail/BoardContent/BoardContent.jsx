import React from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { DragDropContext } from "react-beautiful-dnd";

export default function BoardContent({ lstTask }) {
  return (
    <DragDropContext>
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
    </DragDropContext>
  );
}
