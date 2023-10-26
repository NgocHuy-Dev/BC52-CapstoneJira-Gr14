import React from "react";

import { DataGrid, daDK } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "../../../apis/projectAPI";
import Loading from "../../../components/Loading/Loading";
import { Stack, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import { Creator, Member, MemberAdd } from "./style";

export default function ProjectManagement() {
  const { data: allProject = [], isLoading } = useQuery({
    queryKey: ["project"],
    queryFn: getAllProject,
  });

  // const maxAvatars = 3;
  // const displayedUsers = users.slice(0, maxAvatars); // Lấy tối đa 3 người dùng
  // const remainingCount = users.length - maxAvatars; // Số lượng người dùng còn lại
  // === thêm nút chức năng
  function ActionsCell(params) {
    const handleEdit = () => {
      // Xử lý sự kiện chỉnh sửa
      console.log(`Chỉnh sửa hàng với ID: ${params.row.id}`);
    };

    const handleDelete = () => {
      // Xử lý sự kiện xóa
      console.log(`Xóa hàng với ID: ${params.row.id}`);
    };

    return (
      <div>
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }

  const columns = [
    { field: "categoryId", headerName: "ID", width: 100 },
    { field: "projectName", headerName: "Project Name", width: 200 },
    { field: "categoryName", headerName: "Category", width: 200 },
    {
      field: "creator",
      headerName: "Creator",
      width: 120,
      valueGetter: (params) => params.row.creator.name,
      renderCell: (params) => (
        <Creator variant="outlined">{params.value}</Creator>
      ),
      cellClassName: "creator",
    },
    {
      field: "members",
      headerName: "Member",
      width: 260,
      valueGetter: (params) =>
        params.row.members.map((user) => user.name.charAt(0).toUpperCase()),
      renderCell: (params) => (
        <Stack direction="row">
          {params.value.map((item) => (
            <Member>{item}</Member>
          ))}
          <Member>{"..."}</Member>
          <MemberAdd>+</MemberAdd>
        </Stack>
      ),
      cellClassName: "member",
    },
    {
      field: "action",
      headerName: "Action",
      with: 100,
      renderCell: ActionsCell,
    },
  ];

  console.log("data", allProject);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div style={{ height: 580, width: "95%", marginLeft: "5%" }}>
      <DataGrid
        rows={allProject}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        // pageSizeOptions={[9, 10]}
        checkboxSelection={false}
      />
    </div>
  );
}
