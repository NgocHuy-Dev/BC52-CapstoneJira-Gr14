import React from "react";
import {
  Typography,
  Box,
  Popover,
  Table,
  TableHead,
  TableCell,
  TextField,
  Tooltip,
} from "@mui/material";
import { MemberAdd } from "./style";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../../../apis/userAPI";
import { useState } from "react";
import { assignUserProject } from "../../../../apis/userAPI";

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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return assignUserProject(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });

  return (
    <Tooltip title="Add Member">
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
          <Box sx={{ maxHeight: "fit-content" }}>
            <Box>
              <TextField
                sx={{ marginTop: "15px" }}
                label="Enter user name"
                size="small"
                value={userName}
                onInput={handleChange}
              />
            </Box>
            <Box sx={{ maxHeight: "200px", px: "10px" }}>
              {allUser?.map((user) => (
                <Typography
                  sx={{ cursor: "pointer", padding: "5px 0" }}
                  onClick={() => {
                    mutation.mutate({
                      projectId: projectId,
                      userId: user.userId,
                    });
                  }}
                  key={user.userId}
                >
                  {user.name}
                </Typography>
              ))}
            </Box>
          </Box>
        </Popover>
      </Box>
    </Tooltip>
  );
}
