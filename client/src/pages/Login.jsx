import { Container, Stack, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../modules/userReducer";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [successLogin, setSuccessLogin] = useState(true);

  const dispatch = useDispatch();
  const history = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:4000/users/login", {
        user_id: userId,
        password: password,
      })
      .then((res) => {
        if (res.data.message === "login") {
          dispatch(setUser(res.data.data));
          setSuccessLogin(true);
          console.log("성공");
          window.alert("1 wantit 토큰 지급");
          history("/");
        }
      })
      .catch((e) => {
        console.log(e);
        setSuccessLogin(false);
      });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <Container
      sx={{
        mt: 20,
        mb: 3,
        backgroundColor: "#fff",
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ height: 800 }}
      >
        <Stack sx={{ width: 500 }}>
          <Typography
            sx={{
              fontSize: 60,
              fontWeight: "bold",
              color: "#3b5998",
            }}
          >
            Want it
          </Typography>
          <Typography
            sx={{
              fontSize: 30,
              textAlign: "start",
            }}
          >
            Want it에서 전세계에 있는 친구, 가족, 지인들과 함께 이야기를
            나눠보세요
          </Typography>
        </Stack>
        <Box
          sx={{
            height: 500,
            width: 500,
            borderRadius: 5,
            backgroundColor: "#e1dfdfd1",
          }}
        >
          <Stack alignItems="center">
            <Stack
              spacing={5}
              sx={{ mt: 3, width: "90%", borderBottom: 1, height: 280 }}
            >
              <TextField
                sx={{ backgroundColor: "#ffffff", borderRadius: 3 }}
                id="filled-basic"
                label="아이디"
                variant="outlined"
                onChange={(e) => setUserId(e.target.value)}
              />
              <TextField
                sx={{ backgroundColor: "#ffffff", borderRadius: 3 }}
                id="filled-password-input"
                label="비밀번호"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <Button
                sx={{ height: 55, borderRadius: 2 }}
                variant="contained"
                onClick={() => {
                  login();
                }}
              >
                로그인
              </Button>
            </Stack>
            <Button
              component={Link}
              to="/signup"
              sx={{
                mt: 8,
                height: 55,
                width: 150,
                borderRadius: 2,
                backgroundColor: "#202bab",
              }}
              variant="contained"
            >
              회원 가입
            </Button>
            {successLogin ? (
              <></>
            ) : (
              <Typography sx={{ mt: 3, color: "red" }}>
                아이디 또는 비밀번호를 확인해주세요
              </Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
