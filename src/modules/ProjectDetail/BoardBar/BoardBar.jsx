import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Avatar,
  Stack,
  Tooltip,
  AvatarGroup,
  Typography,
  Button,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TuneIcon from "@mui/icons-material/Tune";
import { BoxButton } from "./styles";

export default function BoardBar({ creator, member }) {
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
      sx={{
        backgroundColor: "primary.light",
        width: "100%",
        height: (theme) => theme.detail.boardBarHeight,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Paper
          component="form"
          sx={{
            p: "4px 4px",
            mr: 1,
            display: "flex",
            alignItems: "center",
            width: 200,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        <Stack direction="row">
          <Tooltip title={creator.name}>
            <Avatar
              sx={{ width: "40px", height: "40px", marginRight: "4px" }}
            />
          </Tooltip>
          <AvatarGroup max={3}>
            {member &&
              member.map((item) => (
                <Avatar key={item.userId} alt={item.name} src={item.avatar} />
              ))}
          </AvatarGroup>
          <Tooltip title="Add user">
            <IconButton sx={{ width: "40px", height: "40px" }}>
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography mr={0.8} sx={{ color: "#7BB8E8" }}>
          GROUP BY
        </Typography>
        <Tooltip title="More">
          <BoxButton sx={{ backgroundColor: "red" }}>
            <Button
              color="secondary"
              endIcon={<KeyboardArrowDownIcon />}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              None
            </Button>
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
          </BoxButton>
        </Tooltip>

        <Tooltip title="Import work">
          <BoxButton>
            <Button startIcon={<CloudUploadIcon />} color="secondary">
              Import work
            </Button>
          </BoxButton>
        </Tooltip>

        <Tooltip title="Insights">
          <BoxButton>
            <Button startIcon={<TrendingUpIcon />} color="secondary">
              Insights
            </Button>
          </BoxButton>
        </Tooltip>

        <Tooltip title="View settings">
          <BoxButton>
            <Button startIcon={<TuneIcon />} color="secondary">
              View settings
            </Button>
          </BoxButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
