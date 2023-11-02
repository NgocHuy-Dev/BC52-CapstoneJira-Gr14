import { styled } from "@mui/material/styles";
import { Avatar, Paper, Button, Typography } from "@mui/material";

export const CusImage = styled(Avatar)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 70px;
  height: 70px;
  margin-top: 5px;
`;
export const CusBackGr = styled(Avatar)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;
export const CusPaper = styled(Paper)`
  margin: 5px 16px;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CusButton = styled(Button)`
  margin: 24px 0 16px;
  background-color: green;
`;

export const Alert = styled(Typography)`
  color: red;
`;
