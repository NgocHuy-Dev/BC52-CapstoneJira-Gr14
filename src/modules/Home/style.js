import styled from "@emotion/styled";
import { Avatar, Button } from "@mui/material";

export const Creator = styled(Button)`
  color: rgb(11, 207, 11);
  padding: 1px 3px;
  border: 2px solid rgb(11, 207, 11);
  text-transform: capitalize;
  &:hover {
    border: 2px solid rgb(154, 238, 154);
  }
`;

export const Member = styled(Avatar)`
  color: gray;
  cursor: pointer;
`;

export const MemberAdd = styled(Avatar)`
  color: gray;
  background-color: white;
  border: 1px solid rgb(11, 207, 11);
  cursor: pointer;
`;
