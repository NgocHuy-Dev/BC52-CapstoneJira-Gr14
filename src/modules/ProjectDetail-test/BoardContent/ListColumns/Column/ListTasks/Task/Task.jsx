import React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function Task({ task }) {
  // console.log("TASK ID", task.taskId);
  const navigate = useNavigate();
  return (
    <Card
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
          <Typography gutterBottom variant="h5" component="div">
            {task.taskName}
          </Typography>
          <EditIcon onClick={() => navigate(`/edittask/${task.taskId}`)} />
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
  );
}
