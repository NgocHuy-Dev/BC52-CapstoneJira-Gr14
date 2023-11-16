import React from "react";
import {
  Typography,
  Box,
  Popover,
  Table,
  TableHead,
  TableCell,
  TextField,
} from "@mui/material";
import { MemberAdd } from "./style";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser } from "../../../../apis/userAPI";
import { useState } from "react";
import { assignUserProject } from "../../../../apis/projectAPI";

export default function AddMember({ projectId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // ===============

  const [userName, setUserName] = useState("");
  const handleChange = (event) => {
    setUserName(event.target.value);
  };
  const { data: allUser = [] } = useQuery({
    queryKey: ["userName", userName],
    queryFn: () => getUser(userName),
  });

  //   const [userId, setuserId] = useState("");
  //   const newUser = { projectId: projectId, userId: userId };

  //   const assignUser = useMutation((newUser) => assignUserProject(newUser));

  //   const handleAssignUser = (id) => {
  //     setuserId(id);
  //     assignUser.mutate(newUser);
  //   };

  return (
    <Box>
      <MemberAdd aria-describedby={id} onClick={handleClick}>
        +
      </MemberAdd>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ maxHeight: "200px", px: "10px" }}>
          <TextField
            sx={{ marginTop: "15px" }}
            label="Enter user name"
            size="small"
            value={userName}
            onInput={handleChange}
          />
          {allUser?.map((user) => (
            <Typography
              //   onClick={handleAssignUser(user.userId)}
              key={user.userId}
            >
              {user.name}
            </Typography>
          ))}
        </Box>
      </Popover>
    </Box>
  );
}
