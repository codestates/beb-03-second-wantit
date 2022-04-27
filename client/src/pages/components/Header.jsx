import React from "react";
import Button from "@mui/material/Button";
import { Stack, Typography, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const Header = ({ handleLogOut }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchName, setSearchName] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      height="70px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        boxShadow: "0 10px 10px -10px gray",
        backgroundColor: "#3b5998",
      }}
    >
      <Button component={Link} to="/">
        <Stack direction="row" alignItems="center" height="70px" width="180px">
          <Avatar alt="Remy Sharp" src="img/steemit.svg" />
          <Typography
            sx={{ color: "#fff", fontSize: 25, ml: 2, fontWeight: "bold" }}
          >
            Want it
          </Typography>
        </Stack>
      </Button>

      <Stack sx={{ width: 400 }}>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          size="small"
          sx={{ backgroundColor: "#ffffff", borderRadius: 3 }}
          type="search"
          placeholder="search value"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ cursor: "pointer" }} onClick={() => {}} />
              </InputAdornment>
            ),
          }}
          variant="filled"
          onChange={(e) => setSearchName(e.target.value)}
        />
      </Stack>
      <Stack
        height="50px"
        width="250px"
        direction="row"
        justifyContent="space-between"
      >
        <Button
          component={Link}
          to="/"
          variant="text"
          sx={{
            color: "white",
            backgroundColor: "#4463a6",
            borderRadius: 3,
            ml: 5,
            width: 120,
            fontSize: 18,
          }}
        >
          글쓰기
        </Button>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon sx={{ color: "#ffff", fontSize: 40 }} />
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
          <MenuItem onClick={handleClose}>profile</MenuItem>
          <MenuItem onClick={(handleClose, handleLogOut)}>Logout</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};

export default Header;
