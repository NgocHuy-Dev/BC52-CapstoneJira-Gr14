import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../../../apis/projectAPI";

export default function BoardContent({ data, setItems, handleUpdateStatus }) {
  const [tasks, setTasks] = useState(data);
  console.log("TASK DATA", data);

  const handleDragAndDrop = (result) => {
    const { source, destination, type } = result;
    console.log();
    console.log("destination", destination.droppableId);
    console.log();

    // ngăn chặn lỗi ko có điểm đến --> ko làm gì cả
    if (!destination) {
      return;
    }
    // kéo về bị trí ban đầu ---> ko làm gì cả
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // KÉO CỘT
    if (type === "group") {
      const reorderedtasks = [...tasks];
      const tasksSourceIndex = source.index;
      console.log("tasksSourceIndex:", tasksSourceIndex);

      const tasksDestinatonIndex = destination.index;
      console.log("tasksDestinatonIndex", tasksDestinatonIndex);
      const [removeTasks] = reorderedtasks.splice(tasksSourceIndex, 1);
      reorderedtasks.splice(tasksDestinatonIndex, 0, removeTasks);
      console.log("RESULT reorderedtasks", reorderedtasks);

      return setTasks(reorderedtasks);
    }

    // kéo task (item cho dễ nhìn) trong column
    // const itemSourceIndex = source.index;
    // const itemDestinationIndex = destination.index;
    // const tasksSourceIndex = tasks.findIndex(
    //   (task) => +task.taskName === +source.droppableId
    // );
    // console.log("tasksSourceIndex", tasksSourceIndex);
    // console.log("SOURCE", source);

    // const tasksDestinationIndex = tasks.findIndex(
    //   (task) => +task.taskName === +destination.droppableId
    // );
    // console.log("tasksDestinationIndex", tasksDestinationIndex);
    // console.log("DESTINATION", destination);

    // const newSourceItems = [...tasks[tasksSourceIndex]];
    // console.log("newSourceItems", newSourceItems);
  };

  // console.log("main Stores", stores);
  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: (theme) => theme.detail.detailContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns lstTasks={data} />
      </Box>
    </DragDropContext>
  );
}
