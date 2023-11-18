import React from "react";

import { DataGrid, daDK } from "@mui/x-data-grid";

import { getUsers, deleteUser } from "./../../../apis/userAPI";
import Loading from "./../../../components/Loading/Loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarGroup,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function UserManagement() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // tạo collumns

  const columns = [
    { field: "userId", headerName: "ID", width: 100 },
    { field: "name", headerName: "Tên", width: 200 },

    {
      field: "avatar",
      headerName: "Ảnh đại diện",
      width: 130,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ height: 50, borderRadius: "50%" }}
        />
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 200 },

    {
      field: "action",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => (
        <div>
          <Tooltip title="Delete User">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit User">
            <IconButton onClick={() => navigate(`/edit/${params.row.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  // xóa user

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id) => {
      return deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleDelete = (id) => {
    // Xử lý xóa dữ liệu với ID được cung cấp
    Swal.fire({
      title: `Bạn muốn xóa Project  ${id}?`,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id);
        Swal.fire("Đã xóa!", "", "success");
      }
    });
  };

  // edit user
  // const handleEdit = (id) => {
  //   // Xử lý sửa dữ liệu với ID được cung cấp
  // };

  //
  const { data: allUser = [], isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });
  console.log(allUser);

  if (isLoading) {
    return <Loading />;
  }

  const rows = allUser;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ height: 580, width: "100%" }}>
      <DataGrid
        // rows={rows}
        rows={rows}
        getRowId={(row) => row.userId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        // pageSizeOptions={[9, 10]}
        checkboxSelection
      />
    </div>
  );
}
