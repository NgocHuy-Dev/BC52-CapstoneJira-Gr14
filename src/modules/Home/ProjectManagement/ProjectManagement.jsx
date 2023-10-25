import React from "react";

import { DataGrid, daDK } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "../../../apis/projectAPI";
import Loading from "../../../components/Loading/Loading";

const columns = [
  { field: "categoryId", headerName: "ID", width: 100 },
  { field: "projectName", headerName: "Project Name", width: 200 },
  { field: "categoryName", headerName: "category", width: 200 },
  {
    field: "creator",
    headerName: "creator",
    width: 120,
  },
  {
    field: "members",
    headerName: "Member",
    width: 160,
  },
  { field: "action", headerName: "Action", with: 100 },
];

export default function ProjectManagement() {
  const { data: allProject = [], isLoading } = useQuery({
    queryKey: ["project"],
    queryFn: getAllProject,
  });
  console.log("data", allProject);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div style={{ height: 580, width: "100%" }}>
      <DataGrid
        rows={allProject}
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
