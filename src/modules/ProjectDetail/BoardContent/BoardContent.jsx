import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../../../apis/projectAPI";

export default function BoardContent({ data, items }) {
  console.log("🚀 ~ file: BoardContent.jsx:9 ~ BoardContent ~ items:", items);
  console.log("🚀 ~ file: BoardContent.jsx:10 ~ BoardContent ~ data:", data);

  // useEffect(() => {
  //   if (projectDetail && projectDetail.lstTask) {
  //     const initialItems = {};
  //     projectDetail.lstTask.forEach((status) => {
  //       initialItems[status.statusId] = status.lstTaskDeTail || [];
  //     });
  //     setItems(initialItems);
  //   }
  // }, [projectDetail]);

  const [taskId, setTaskId] = useState("");
  const queryClient = useQueryClient();

  const { mutate: handleUpdateStatus, error } = useMutation({
    mutationFn: (payload) =>
      updateStatus({
        taskId: payload[0],
        statusId: payload[1],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("getProjectDetail");
    },
    onError: () => {
      alert(error);
    },
  });

  const handleDragAndDrop = (result) => {
    const { source, destination, draggableId, taskId } = result;
    console.log(
      "🚀 ~ file: BoardContent.jsx:40 ~ handleDragAndDrop ~ source:",
      source
    );

    console.log(
      "🚀 ~ file: BoardContent.jsx:40 ~ handleDragAndDrop ~ draggableId:",
      draggableId
    );
    console.log(
      "🚀 ~ file: BoardContent.jsx:40 ~ handleDragAndDrop ~ destination:",
      destination
    );
    console.log(
      "🚀 ~ file: BoardContent.jsx:40 ~ handleDragAndDrop ~ source:",
      source
    );

    // ngăn chặn lỗi
    if (!destination) {
      return;
    }

    // tìm trạng thái mới và cũ
    const sourceStatus = source.droppableId;

    const destinationStatus = destination.droppableId;

    // lấy tên từ draggableId (tên task bị kéo)
    const taskName = draggableId;

    console.log("Item", items);
    // Tìm item có taskName tương ứng trong danh sách items
    const draggedItem = Object.keys(items).find((status) =>
      status.find((item) => item.taskName === taskName)
    );

    // const findTaskId = draggedItem.find(
    //   (item) => item.taskName === draggableId
    // );

    // if (sourceStatus !== destinationStatus) {
    //   console.log("taskId: ", taskId);
    //   console.log("destinationStatus: ", destinationStatus);
    //   // Nếu công việc đã bị kéo vào một nhóm khác, gọi API để cập nhật trạng thái
    //   // handleUpdateStatus([findTaskId.taskId, destinationStatus]);
    // }

    // if (source.droppableId === destination.droppableId) {
    //   // Kéo mục trong cùng một nhóm
    //   const updatedItems = { ...items };
    //   const updatedGroup = [...updatedItems[source.droppableId]];

    //   updatedGroup.splice(source.index, 1);
    //   updatedGroup.splice(
    //     destination.index,
    //     0,
    //     items[source.droppableId][source.index]
    //   );

    //   updatedItems[source.droppableId] = updatedGroup;
    //   setItems(updatedItems);
    // } else {
    //   // Kéo mục qua các nhóm khác nhau
    //   const sourceGroup = [...items[source.droppableId]];
    //   const destGroup = [...items[destination.droppableId]];
    //   const [draggedItem] = sourceGroup.splice(source.index, 1);

    //   destGroup.splice(destination.index, 0, draggedItem);

    //   const updatedItems = {
    //     ...items,
    //     [source.droppableId]: sourceGroup,
    //     [destination.droppableId]: destGroup,
    //   };

    //   setItems(updatedItems);
    // }
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
        <ListColumns lstTask={data.lstTask} />
      </Box>
    </DragDropContext>
  );
}
