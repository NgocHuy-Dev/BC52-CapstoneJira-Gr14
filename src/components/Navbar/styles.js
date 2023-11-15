import styled from "@emotion/styled";
import { ListItemButton, Typography,Box } from "@mui/material";

export const Text = styled(Typography)`
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: black;
`;

export const NavListButton = styled(ListItemButton)`
  padding: 0;
  &:hover {
    background-color:  #3f2fd3 ;
  }
`;
export const CusLogo = styled(Box)`
 
 width:40px;
height40px;
`;