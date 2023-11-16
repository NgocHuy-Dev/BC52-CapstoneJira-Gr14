import React from "react";

import Box from "@mui/material/Box";
import Column from "./Column";
import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function ListColumns({ lstTask }) {
  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar-track": {
          m: 2,
        },
      }}
    >
      {/* ADD THÊM COLUMN Ở ĐÂY  */}
      {lstTask?.map((tasks) => (
        <Column key={tasks.statusId} tasks={tasks} />
      ))}

      <Tooltip title="Create column">
        <Box
          sx={{
            minWidth: "50px",
            maxWidth: "50px",
            mx: 2,
            borderRadius: "6px",
            height: "fit-content",
            bgcolor: "#ffffff3d",
          }}
        >
          <Button
            startIcon={<AddIcon />}
            sx={{
              color: "white",
              width: "100%",
              height: "100%",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1.5,
            }}
          ></Button>
        </Box>
      </Tooltip>
    </Box>
  );
}
