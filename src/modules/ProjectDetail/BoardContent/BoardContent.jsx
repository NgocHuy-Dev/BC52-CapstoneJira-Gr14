import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../../../apis/projectAPI";

export default function BoardContent({ data, items, handleUpdateStatus }) {
  // console.log("DATA", data);

  const handleDragAndDrop = (result) => {
    const { source, destination, draggableId, type, taskId } = result;
    console.log("DESTINATION", destination);

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

    // tìm trạng thái mới và cũ
    const sourceStatus = source.droppableId;

    const destinationStatus = destination.droppableId;
    // lấy tên từ draggableId (tên task bị kéo)
    const taskName = draggableId;

    // Tìm item có taskName tương ứng trong danh sách items
    const draggedItem = Object.values(items).find((status) => {
      return Object.values(status).find((item) => item.taskName === taskName);
    });

    const findTaskId = draggedItem.find(
      (item) => item.taskName === draggableId
    );

    if (sourceStatus !== destinationStatus) {
      console.log("khác nhau");
      // Nếu công việc đã bị kéo vào một cột khác, gọi API để cập nhật trạng thái
      handleUpdateStatus([findTaskId.taskId, destinationStatus]);
    }
  };

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
        <ListColumns lstTask={data.lstTask} />
      </Box>
    </DragDropContext>
  );
}
