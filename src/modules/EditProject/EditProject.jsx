import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "../../apis/projectAPI";
import { useParams } from "react-router-dom";

export default function EditProject() {
  const { projectId } = useParams();
  console.log("projectId", projectId);
  // const { data: projectDetail = [] } = useQuery({
  //   queryKey: ["id".projectId],
  //   queryFn: () => getProjectDetail(projectId),
  // });
  // console.log("projectDetail", projectDetail);
  return <div>EditProject</div>;
}
