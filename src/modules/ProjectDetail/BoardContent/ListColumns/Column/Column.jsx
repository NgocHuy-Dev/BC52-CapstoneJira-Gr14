import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListTasks from "./ListTasks/ListTasks";

export default function Column({ tasks, projectId }) {








  const navigate = useNavigate();

  console.log("column", tasks);
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
          {tasks?.statusName}
        </Typography>
        <Box></Box>
      </Box>

      {/* body  list card*/}

      <ListTasks listTask={tasks?.lstTaskDeTail} projectId={projectId}/>
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
        <Button
          startIcon={<AddCardIcon />}
          onClick={() => navigate("/create/task")}
        >
          Create Task
        </Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor: "grab" }} />
        </Tooltip>
      </Box>
    </Box>
  );
}
