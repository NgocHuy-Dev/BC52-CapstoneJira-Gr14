
import {
  Avatar,
  Button,
  FormControl,
  Paper,
  Alert,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";



export const CusImage = styled(Avatar)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 90px;
  height: 90px;
`;
export const CusBackGr = styled(Avatar)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 80%;
`;

export const CusPaper = styled(Paper)`
  margin: 0px 16px;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CusAvatar = styled(Avatar)`
  margin: 8px;
  background-color: #f50057;
`;

export const CusForm = styled(FormControl)`
  width: 100%;
  margin-top: 8px;
`;

export const CusButton = styled(Button)`
  margin: 24px 0 16px;
`;

export const CusAlert = styled(Typography)`
  color: red;
`;
