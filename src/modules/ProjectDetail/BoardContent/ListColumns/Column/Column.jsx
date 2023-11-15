import React from "react";

import Tooltip from "@mui/material/Tooltip";
import ListTasks from "./ListTasks/ListTasks";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Column({ tasks }) {
  // console.log("TASK IN COLUMN", tasks);

  const navigate = useNavigate();
  const projectId = useParams();
  // console.log("project id create task", projectId);

  // console.log("column", tasks);
  return (
    <Box
      sx={{
        minWidth: "260px",
        maxWidth: "260px",
        backgroundColor: "#fff011",
        ml: 2,
        borderRadius: "6px",
        height: "fit-content",
        maxHeight: (theme) =>
          `calc(${theme.detail.detailContentHeight} - ${theme.spacing(5)})`,
      }}
    >
      {/* header  */}
      <Box
        sx={{
          height: (theme) => theme.detail.coloumnHeaderHeight,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
        >
          {tasks.statusName}
        </Typography>
        <Box></Box>
      </Box>

      {/* body  list card*/}

      <ListTasks listTasks={tasks.lstTaskDeTail} />
      {/* footer  */}
      <Box
        sx={{
          height: (theme) => theme.detail.columnFooterHeight,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button startIcon={<AddCardIcon />}>Create Task</Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor: "grab" }} />
        </Tooltip>
      </Box>
    </Box>
  );
}
