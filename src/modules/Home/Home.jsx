import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "../../apis/projectAPI";
import Loading from "../../components/Loading/Loading";
import { Typography, Box, Paper, InputBase } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Creator } from "./style";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import Actions from "./Actions";
import Members from "./Members/Members";

export default function Home() {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const { data: allProject = [], isLoading } = useQuery({
    queryKey: ["project"],
    queryFn: getAllProject,
  });

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
          <Typography sx={{ color: "#556CD6", cursor: "pointer" }}>
            {params.row.projectName}
          </Typography>
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
      width: 180,
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
      cellClassName: "member",
      renderCell: (params) => (
        <Members members={params?.value} projectId={params?.row.id} />
      ),
    },

    {
      field: "action",
      headerName: "Action",
      with: 100,
      renderCell: (params) => <Actions params={params?.row}></Actions>,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          margin: "5px",
        }}
      >
        <Typography
          sx={{ fontSize: "30px", fontWeight: "bold", color: "#556CD6" }}
        >
          PROJECT MANAGEMENT
        </Typography>
        <Paper
          component="form"
          sx={{
            p: "4px 4px",
            mr: 1,
            display: "flex",
            alignItems: "center",
            width: 200,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <DataGrid
        sx={{ margin: "5px 20px", height: "580px" }}
        rows={allProject.filter((row) =>
          Object.values(row).some(
            (value) => String(value).indexOf(searchText) > -1
          )
        )}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        checkboxSelection={false}
      />
    </>
  );
}
