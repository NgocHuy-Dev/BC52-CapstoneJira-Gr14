import React, { useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";
import Popover from "@mui/material/Popover";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LightTooltip, CusTableCell } from "./styles";
import AddMember from "./AddMember";
import { useMutation } from "@tanstack/react-query";
import { deleteUserFromProject } from "../../../apis/userAPI";
import Swal from "sweetalert2";

export default function Members({ members, projectId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [userFromProject, setUserFromProject] = useState({
    project: projectId,
    userId: "",
  });

  // const { mutate: deleteUserProject, error } = useMutation({
  //   mutationFn: (value) => {
  //     return deleteUserFromProject(value);
  //   },
  //   onError: () => {
  //     Swal.fire(error.message);
  //   },
  // });

  const handleDeleteUser = (id) => {
    setUserFromProject({ project: projectId, userId: id });
    // deleteUserProject(userFromProject);
  };

  console.log("userFromProject", userFromProject);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <LightTooltip
        TransitionComponent={Zoom}
        arrow
        title={
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell size="small">ID</TableCell>
                <TableCell size="small">Avatar</TableCell>
                <TableCell size="small" sx={{ maxWidth: "100px" }}>
                  Name
                </TableCell>
                <TableCell size="small">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members?.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>{member.userId}</TableCell>
                  <CusTableCell>
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      src={member.avatar}
                    />
                  </CusTableCell>
                  <TableCell size="small" sx={{ maxWidth: "100px" }}>
                    {member.name}
                  </TableCell>
                  <TableCell
                  //  onClick={() => handleDeleteUser(member.userId)}
                  >
                    <HighlightOffIcon
                      sx={{ color: "red", cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      >
        <AvatarGroup max={3}>
          {members?.map((member) => (
            <Avatar key={member.userId} alt={member.name} src={member.avatar} />
          ))}
        </AvatarGroup>
      </LightTooltip>
      <Tooltip title="Add Member">
        <AddMember projectId={projectId} />
      </Tooltip>
    </>
  );
}
