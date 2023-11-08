import React, { useCallback } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "../../apis/projectAPI";
import Loading from "../../components/Loading/Loading";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Creator } from "./style";
import { useNavigate } from "react-router-dom";

import Actions from "./Actions";
import Members from "./Members/Members";

export default function Home() {
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
        pageSizeOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        checkboxSelection={false}
      />
    </div>
  );
}
