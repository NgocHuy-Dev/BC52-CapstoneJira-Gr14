import React from "react";
import {
  Avatar,
  AvatarGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LightTooltip, CusTableCell } from "./styles";
import AddMember from "./AddMember";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserFromProject } from "../../../apis/userAPI";
import Swal from "sweetalert2";

export default function Members({ members, projectId }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => {
      return deleteUserFromProject(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError: () => Swal.fire("không đủ quyền để thực hiện"),
  });

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
                    onClick={() => {
                      mutation.mutate({
                        projectId: projectId,
                        userId: member.userId,
                      });
                    }}
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
      <AddMember projectId={projectId} />
    </>
  );
}
