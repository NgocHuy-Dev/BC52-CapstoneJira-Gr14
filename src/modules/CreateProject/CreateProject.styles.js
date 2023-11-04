import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Avatar,
  Button,
  FormControl,
  Paper,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const stylesTitle = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
  },
};

export const styles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
};

export const CusImage = styled(Avatar)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 90px;
  height: 90px;
`;
export const CusBox = styled(Box)`
  display: "flex";
  align-items: "center";
  justify-content: "center";
  width: "200px";
`;

export const CusPaper = styled(Paper)`
  display: "flex";
  align-items: "center";
`;

export const CusAvatar = styled(Avatar)`
  margin: 8px;
  background-color: #f50057;
`;

export const stylesForm = {
  width: "700%",
  margin: "auto",
};

export const CusButton = styled(Button)`
  margin: 24px 0 16px;
`;

export const CusAlert = styled(Typography)`
  color: red;
`;

export const CusReactQuill = styled(ReactQuill)`
  .ql-editor {
    min-height: 350px;
  }
`;
