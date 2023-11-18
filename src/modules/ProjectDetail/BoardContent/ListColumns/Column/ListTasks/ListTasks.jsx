import React from "react";

import Box from "@mui/material/Box";

import Task from "./Task/Task";
import { Draggable } from "react-beautiful-dnd";

export default function ListTasks({ listTasks }) {
  console.log("list task ", listTasks);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "0 5px",
        m: "0 5px",
        gap: 1,
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.detail.detailContentHeight} - ${theme.spacing(5)} - ${
            theme.detail.columnFooterHeight
          } - ${theme.detail.coloumnHeaderHeight})`,
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ced0da",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bfc2bf",
        },
      }}
    >
      {/* LIST TASK  */}
      {listTasks?.map((task, index) => {
        return (
          <Draggable
            key={task.taskName}
            draggableId={task.taskName}
            index={index}
          >
            {(provided, snapshot) => (
              <Box
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
              >
                <Task key={task.taskId} task={task} />
              </Box>
            )}
          </Draggable>
        );
      })}

      {/* LIST TASK  */}
    </Box>
  );
}
