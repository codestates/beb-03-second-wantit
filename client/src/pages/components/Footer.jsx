import { Button, Stack, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Stack
      height="80px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        boxShadow: "0 -1px 0px 1px #c1bebe70",
        backgroundColor: "#ffffffb7",
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
        <Button component={Link} to="/" sx={{ height: 50, width: 150 }}>
          <img
            src="/logo(wantit)2.png"
            alt="logo"
            style={{ height: "100%", width: "100%" }}
          />
        </Button>
        <Stack>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            wantit
          </Typography>
          <Typography>인센티브 기반 커뮤니티</Typography>
        </Stack>
      </Stack>

      <Stack
        justifyContent="center"
        alignItems="end"
        sx={{ height: "100%", mr: 2 }}
      >
        <Button
          sx={{
            height: 50,
            width: 80,
            backgroundColor: "#3b5998",
            borderRadius: 3,
            mt: 1,
          }}
          href="https://github.com/codestates/beb-03-second-wantit"
        >
          <GitHubIcon sx={{ fontSize: 30, color: "white" }} />
        </Button>
        <Typography sx={{ fontSize: 15 }}>develop by wantit</Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
