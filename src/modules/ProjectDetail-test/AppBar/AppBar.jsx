import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BoltIcon from "@mui/icons-material/Bolt";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { BoxIcon, CusIconButton } from "./styles";

export default function AppBar({ name }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
    // sx={{
    //   backgroundColor: "primary.light",
    //   width: "100%",
    //   height: (theme) => theme.detail.appBarHeight,
    //   display: "flex",
    //   alignItems: "center",
    // }}
    >
      <Box sx={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
        <Typography>Project / {name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "auto 0",
        }}
      >
        <Box>
          <h3>{name} Board</h3>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Tooltip title="Automation">
            <BoxIcon>
              <CusIconButton>
                <BoltIcon />
              </CusIconButton>
            </BoxIcon>
          </Tooltip>

          <Tooltip title="Add to Starred">
            <BoxIcon>
              <CusIconButton>
                <StarOutlineIcon />
              </CusIconButton>
            </BoxIcon>
          </Tooltip>

          <Tooltip title="Enter full screen">
            <BoxIcon>
              <CusIconButton>
                <OpenInFullIcon />
              </CusIconButton>
            </BoxIcon>
          </Tooltip>
          <Tooltip title="More">
            <BoxIcon>
              <CusIconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </CusIconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Manage workflow</MenuItem>
                <MenuItem onClick={handleClose}>Manage custom filters</MenuItem>
                <MenuItem onClick={handleClose}>Configure board</MenuItem>
              </Menu>
            </BoxIcon>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
