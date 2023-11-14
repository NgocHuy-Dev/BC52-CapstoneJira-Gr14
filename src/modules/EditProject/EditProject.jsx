import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectDetail } from "../../apis/projectAPI";
import EditDetail from "./EditDetail";

export default function EditProject() {
  const { projectId } = useParams();

  const { data = {} } = useQuery({
    queryKey: ["projectId", projectId],
    queryFn: () => getProjectDetail(projectId),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {Object.keys(data).length > 0 && (
        <EditDetail projectId={projectId} data={data} />
      )}
    </>
  );
}
