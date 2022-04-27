import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

const Main = () => {
  return (
    <Stack sx={{ height: "120vh", backgroundColor: "#213359" }}>
      <Container sx={{ backgroundColor: "#324c85", borderRadius: 8, mt: 8 }}>
        <Stack
          alignItems="center"
          justifyContent="space-around"
          sx={{
            borderBottom: 1,
            borderColor: "#fff",
            mt: 4,
            height: 800,
          }}
        >
          <Typography sx={{ color: "#fff", fontSize: 50, fontWeight: "bold" }}>
            Want it에 방문하신 걸 환영합니다.
          </Typography>
          <Box sx={{ width: 510 }}>
            <Typography
              sx={{ color: "#fff", fontSize: 30, textAlign: "center" }}
            >
              Want it은 인센티브 기반 커뮤니티입니다.
              <br />
              Want it에서 활동을 하게 되면 wantit 토큰을 보상으로 받을 수
              있습니다.
            </Typography>
            <Typography
              sx={{ mt: 5, color: "#fff", fontSize: 30, textAlign: "center" }}
            >
              Want it에서 전세계에 있는 친구, 가족, 지인들과 함께 이야기를
              나눠보세요
            </Typography>
          </Box>
          <Box>
            <Button
              component={Link}
              to="/login"
              sx={{
                m: 2,
                height: 60,
                width: 250,
                borderRadius: 2,
                backgroundColor: "#0b179c",
                fontSize: 25,
              }}
              variant="contained"
            >
              로그인
            </Button>
            <Button
              component={Link}
              to="/signup"
              sx={{
                m: 2,
                height: 60,
                width: 250,
                borderRadius: 2,
                backgroundColor: "#0b179c",
                fontSize: 25,
              }}
              variant="contained"
            >
              회원 가입
            </Button>
          </Box>
        </Stack>
        <Stack
          alignItems="center"
          justifyContent="space-around"
          sx={{ mt: 5, height: 550 }}
        >
          <Typography
            sx={{
              paddingBottom: 3,
              borderBottom: 1,
              fontSize: 40,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            만든 사람들
          </Typography>
          <Stack spacing={10}>
            <Typography sx={{ fontSize: 25, color: "#fff" }}>
              <Button href="https://github.com/sujin96" sx={{ color: "#fff" }}>
                <GitHubIcon sx={{ mr: 3, fontSize: 25 }} />
              </Button>
              이수진
            </Typography>
            <Typography sx={{ fontSize: 25, color: "#fff" }}>
              <Button
                href="https://github.com/espressom"
                sx={{ color: "#fff" }}
              >
                <GitHubIcon sx={{ mr: 3, fontSize: 25 }} />
              </Button>
              위유랑
            </Typography>
            <Typography sx={{ fontSize: 25, color: "#fff" }}>
              <Button
                href="https://github.com/journiyoon"
                sx={{ color: "#fff" }}
              >
                <GitHubIcon sx={{ mr: 3, fontSize: 25 }} />
              </Button>
              윤지연
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Main;
