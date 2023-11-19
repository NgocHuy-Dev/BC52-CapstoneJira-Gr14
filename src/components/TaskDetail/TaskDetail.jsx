import { Container, Box, Select, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTaskDetail, getTaskType } from "../../apis/projectAPI";

export default function TaskDetail({ handleClose, projectId, task }) {
  const { data: taskType = [] } = useQuery({
    queryKey: ["taskType"],
    queryFn: getTaskType,
  });

  console.log("task Type", task);
  return (
    <Container>
      {/* HEADER  */}
      <Box>
        <Box>
          <TextField value={task.taskTypeDetail?.taskType} />
        </Box>
        <Box></Box>
      </Box>
      <Box></Box>
    </Container>
  );
}
