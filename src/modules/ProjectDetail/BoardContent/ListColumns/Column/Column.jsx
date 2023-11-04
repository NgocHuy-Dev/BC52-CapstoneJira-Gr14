import React from "react";
import Tooltip from "@mui/material/Tooltip";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListTasks from "./ListTasks/ListTasks";

export default function Column() {
  return (
    <Box
      sx={{
        minWidth: "300px",
        maxWidth: "300px",
        backgroundColor: "#fff011",
        ml: 2,
        borderRadius: "6px",
        height: "fit-content",
        maxHeight: (theme) =>
          `calc(${theme.detail.detailContentHeight} - ${theme.spacing(5)})`,
      }}
    >
      {/* header  */}
      <Box
        sx={{
          height: (theme) => theme.detail.coloumnHeaderHeight,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
        >
          Coloum title
        </Typography>
        <Box></Box>
      </Box>

      {/* body  list card*/}
      <ListTasks />
      {/* footer  */}
      <Box
        sx={{
          height: (theme) => theme.detail.columnFooterHeight,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button startIcon={<AddCardIcon />}>Add new card</Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor: "pointer" }} />
        </Tooltip>
      </Box>
    </Box>
  );
}