import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React from "react";

import { getProjectDetail } from "../../apis/projectAPI";
import EditDetail from "./EditDetail";

export default function EditProject() {
  const { projectId } = useParams();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["projectId", projectId],
    queryFn: () => getProjectDetail(projectId),
    refetchOnWindowFocus: false,
  });

  console.log("ahahaha", data);
  return (
    <>
      {Object.keys(data).length > 0 && (
        <EditDetail projectId={projectId} data={data} />
      )}
    </>
  );
}
