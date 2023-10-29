import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProjectDetail, getProjectEdit } from "../../apis/projectAPI";

export default function EditProject() {
  const projectId = 13461;
  const { data: projectDetail = [] } = useQuery({
    queryKey: ["projectId", projectId],
    queryFn: () => getProjectDetail(projectId),
  });
  console.log("detail:", projectDetail);
  return <div>EditProject</div>;
}
