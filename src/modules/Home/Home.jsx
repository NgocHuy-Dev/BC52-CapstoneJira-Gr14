import React, { useCallback } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProject, getAllProject } from "../../apis/projectAPI";
import Loading from "../../components/Loading/Loading";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
import { Creator, MemberAdd } from "./style";
import { useNavigate } from "react-router-dom";

import Zoom from "@mui/material/Zoom";

export default function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: allProject = [], isLoading } = useQuery({
    queryKey: ["project"],
    queryFn: getAllProject,
  });

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

  const columns = [
    { field: "id", headerName: "ID", width: 100 },

    {
      field: "projectName",
      headerName: "Project Name",
      width: 200,
      renderCell: (params) => (
        <Tooltip
          title="Show Detail"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/projectdetail/${params.row.id}`)}
        >
          <Typography>{params.row.projectName}</Typography>
        </Tooltip>
      ),
    },

    {
      field: "categoryName",
      headerName: "Category",
      width: 200,
    },

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
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    {
      field: "members",
      headerName: "Member",
      width: 260,
      renderCell: (params) => (
        <Tooltip
          style={{ overflowX: "hidden" }}
          TransitionComponent={Zoom}
          title={
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Avatar</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {params.value.map((member) => (
                    <TableRow>
                      <TableCell>{member.userId}</TableCell>
                      <TableCell>
                        <Avatar
                          sx={{ width: 20, height: 20 }}
                          src={member.avatar}
                        />
                      </TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>
                        <HighlightOffIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        >
          <Stack direction="row">
            <AvatarGroup max={3}>
              {params.value.map((member) => (
                <Avatar
                  key={member.userId}
                  alt={member.name}
                  src={member.avatar}
                />
              ))}
            </AvatarGroup>
            <Tooltip title="Add Member">
              <MemberAdd>+</MemberAdd>
            </Tooltip>
          </Stack>
        </Tooltip>
      ),

      cellClassName: "member",
    },
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    {
      field: "action",
      headerName: "Action",
      with: 100,
      renderCell: (params) => (
        <Box sx={{ zIndex: "10000" }}>
          <Tooltip title="Edit Project">
            <IconButton onClick={() => navigate(`/edit/${params.row.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Project">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  // const handleCellClick = (params) => {
  //   navigate(`/projectdetail/${params.row.id}`);
  // };
  return (
    <div
      style={{ height: 580, width: "97%", marginLeft: "2%", marginRight: "1%" }}
    >
      <DataGrid
        // onCellClick={handleCellClick}
        rows={allProject}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        checkboxSelection={false}
      />
    </div>
  );
}
