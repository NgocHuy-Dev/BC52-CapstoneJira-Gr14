import React, { useCallback, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "../../apis/projectAPI";
import Loading from "../../components/Loading/Loading";
import { AvatarGroup, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import { Creator, Member, MemberAdd } from "./style";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleEdit = useCallback((id) => {
    console.log("id là:", id);
    navigate(`/edit/${id}`);
  });

  const handleDelete = (id) => {
    console.log("id cần xóa là:", id);
  };

  // useEffect(() => {
  //   handleEdit();
  //   handleDelete();
  // }, []);

  const { data: allProject = [], isLoading } = useQuery({
    queryKey: ["project"],
    queryFn: getAllProject,
  });

  console.log("data:", allProject);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },

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
          <AvatarGroup max={3}>
            {params.value.map((item, index) => (
              <Member key={index} alt={item.name} />
            ))}
          </AvatarGroup>

          <MemberAdd>+</MemberAdd>
        </Stack>
      ),
      cellClassName: "member",
    },

    {
      field: "action",
      headerName: "Action",
      with: 100,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => navigate(`/edit/${params.row.id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      style={{ height: 580, width: "97%", marginLeft: "2%", marginRight: "1%" }}
    >
      <DataGrid
        rows={allProject}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // pageSizeOptions={[9, 10]}
        checkboxSelection={false}
      />
    </div>
  );
}
