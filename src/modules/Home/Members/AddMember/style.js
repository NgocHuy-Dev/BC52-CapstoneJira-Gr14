import styled from "@emotion/styled";
import { Avatar, TableCell } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const MemberAdd = styled(Avatar)`
  color: #9aee9a;
  background-color: white;
  border: 1px solid #9aee9a;
  cursor: pointer;
  &:hover {
    color: green;
    border: 2px solid green;
  }
`;
