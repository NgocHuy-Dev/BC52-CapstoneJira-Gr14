import styled from "@emotion/styled";
import { Button } from "@mui/material";
export const CusButton = styled(Button)`
  margin-top: 12px;
              margin-left: 450px;
              margin-bottom: 52px;
  background-color: #FE6B8B;
  color: #ffff;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #8b0623;
    border: 2px dashed #FF8E53;
  }
`;