import React from "react";

import Box from "@mui/material/Box";
import Column from "./Column";
import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function ListColumns({ lstTasks }) {
  // console.log("list Task in LIST COLUMN", lstTask);
  return (
    <Droppable
      droppableId="ROOT"
      type="group"
      direction="horizontal"
      mode="standard"
    >
      {(provided) => (
        <Box
          {...provided.droppableProps}
          ref={provided.innerRef}
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
          {lstTasks.map((tasks, index) => (
            <Draggable
              draggableId={tasks.statusId}
              index={index}
              key={tasks.statusId}
            >
              {(provided) => (
                <Box
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  <Column tasks={tasks} />
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
}
