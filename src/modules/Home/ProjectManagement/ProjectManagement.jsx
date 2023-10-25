import React from "react";

import { DataGrid, daDK } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "../../../apis/projectAPI";

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
  const { data: allProject = [] } = useQuery({
    queryKey: ["project"],
    queryFn: getAllProject,
  });
  console.log("data", allProject);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={allProject}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
