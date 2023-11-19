import React, { useState } from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditTask from "../../../../../../../components/EditTask/EditTask";
import { getProjectDetail } from "../../../../../../../apis/projectAPI";
import { Tooltip } from "@mui/material";

export default function Task({ task }) {
  const { projectId } = useParams();

  const { data: projectDetail = [] } = useQuery({
    queryKey: ["projectId", projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  });
  // Edit Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Edit Modal

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 5px",
              marginBottom: "10px",
            }}
          >
            <Tooltip title="See more">
              <Typography
                gutterBottom
                sx={{
                  "&:hover": {
                    color: "#0055CC",
                    fontWeight: "bold",
                  },
                }}
              >
                {task.taskName}
              </Typography>
            </Tooltip>
            <Tooltip title="Edit Task">
              <EditIcon sx={{ color: "#0055CC" }} />
            </Tooltip>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 5px",
            }}
          >
            <Typography sx={{ color: "#F44336" }}>
              {task.priorityTask.priority}
            </Typography>
            <AvatarGroup max={3}>
              {task.assigness?.map((user) => (
                <Avatar key={user.id} alt={user.name} src={user.avatar} />
              ))}
            </AvatarGroup>
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            with: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
            m: 1,
          }}
        >
          <EditTask
            projectDetail={projectDetail}
            handleClose={handleClose}
            projectId={projectId}
            taskId={task.taskId}
          />
        </Box>
      </Modal>
    </>
  );
}
