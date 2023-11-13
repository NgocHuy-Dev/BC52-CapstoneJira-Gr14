import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React from "react";
import EditProject from "./EditProject";
import { getProjectDetail, updateProject } from "../../apis/projectAPI";
import EditDetail from "./EditDetail";

export default function Text() {
  const { projectId } = useParams();
  console.log("ID", projectId);
  const { data = {}, isLoading } = useQuery({
    queryKey: ["projectId", projectId],
    queryFn: () => getProjectDetail(projectId),
    refetchOnWindowFocus: false,
  });

  console.log("ahahaha", data);
  return <>{Object.keys(data).length > 0 && <EditDetail data={data} />}</>;
}
