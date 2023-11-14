import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Task from "./Task/Task";

export default function ListTasks({ listTasks }) {
  console.log("list Task???", listTasks);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "0 5px",
        m: "0 5px",
        gap: 1,
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.detail.detailContentHeight} - ${theme.spacing(5)} - ${
            theme.detail.columnFooterHeight
          } - ${theme.detail.coloumnHeaderHeight})`,
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ced0da",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bfc2bf",
        },
      }}
    >
      <Card
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ p: 1.5, "&last-child": { p: 1.5 } }}>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
        </CardContent>
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          <Button size="small" startIcon={<GroupIcon />}>
            15
          </Button>
          <Button size="small" startIcon={<CommentIcon />}>
            20
          </Button>
          <Button size="small" startIcon={<AttachmentIcon />}>
            25
          </Button>
        </CardActions>
      </Card>
      {/* LIST TASK  */}
      {listTasks?.map((task) => (
        <Task key={task.taskId} task={task} />
      ))}
      <Task />

      {/* LIST TASK  */}
    </Box>
  );
}
