import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../../apis/projectAPI";
import { red } from "@mui/material/colors";
import { blue } from "@mui/material/colors";

export default function Actions({ params }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: handleDeleteProject } = useMutation({
    mutationFn: (id) => {
      return deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: `Bạn muốn xóa Project  ${id}?`,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProject(id);
        Swal.fire("Đã xóa!", "", "success");
      }
    });
  };
  return (
    <Box sx={{ zIndex: "10000" }}>
      <Tooltip title="Edit Project">
        <IconButton
          sx={{ color: blue[500] }}
          onClick={() => navigate(`/edit/${params?.id}`)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Project">
        <IconButton
          sx={{ color: red[700] }}
          onClick={() => handleDelete(params?.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
