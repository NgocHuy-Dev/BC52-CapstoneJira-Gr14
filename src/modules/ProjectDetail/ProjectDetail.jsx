import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "../../apis/projectAPI";
import AppBar from "./AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";

import BoardContent from "./BoardContent";


export default function ProjectDetail() {







  const { projectId } = useParams();

  const { data: projectDetail } = useQuery({
    queryKey: ["id", projectId],
    queryFn: () => getProjectDetail(projectId),
  });

  const name = projectDetail?.projectName || "";
  const creator = projectDetail?.creator || "";
  const member = projectDetail?.member || "";

  console.log("projectDetail", projectDetail);
  return (
    <Container disableGutters sx={{ height: "100vh", maxWidth: "85%" }}>
      <AppBar name={name} />
      <BoardBar creator={creator} member={member} />
      <BoardContent lstTask={projectDetail?.lstTask} projectId={projectId} />


     
      {/* <DetailTask projectId={projectId}  /> */}
    </Container>
  );
}
