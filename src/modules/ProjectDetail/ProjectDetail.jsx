import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "../../apis/projectAPI";
import AppBar from "./AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";

import BoardContent from "./BoardContent";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [items, setItems] = useState({});

  const { data: projectDetail = [] } = useQuery({
    queryKey: ["id", projectId],
    queryFn: () => getProjectDetail(projectId),
  });

  useEffect(() => {
    if (projectDetail && projectDetail.lstTask) {
      const initialItems = {};
      projectDetail.lstTask.forEach((status) => {
        initialItems[status.statusId] = status.lstTaskDeTail || [];
      });
      setItems(initialItems);
    }
  }, [projectDetail]);

  return (
    <>
      {Object.keys(projectDetail).length > 0 && (
        <Container disableGutters sx={{ height: "100vh", maxWidth: "85%" }}>
          <AppBar name={projectDetail.projectName} />
          <BoardBar
            creator={projectDetail.creator}
            member={projectDetail.member}
          />
          <BoardContent data={projectDetail} items={items} />
        </Container>
      )}
    </>
  );
}
