import styled from "@emotion/styled";
import { Avatar, TableCell } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    width: "fit-content",
  },
}));

export const CusTableCell = styled(TableCell)`
  font-size: "5px";
`;
