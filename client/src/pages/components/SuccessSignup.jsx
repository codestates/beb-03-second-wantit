import { Button, Stack, Typography } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { Link } from "react-router-dom";

export default function SuccessSignup({ data, setData, setSuccessSignup }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="space-around"
      sx={{
        borderRadius: 4,
        height: 900,
        width: "90%",
        backgroundColor: "#fff",
      }}
    >
      <CelebrationIcon sx={{ fontSize: 100, color: "#3b5998" }} />
      <Typography sx={{ fontSize: 40, fontWeight: "bold" }}>
        축하합니다.
        <br />
        회원가입에 성공하셨습니다.
      </Typography>
      <Typography sx={{ fontSize: 20 }}>
        지갑 발행과 동시에 1 wantit 토큰이 발행되었습니다.
      </Typography>
      <Stack>
        <Typography sx={{ fontSize: 20 }}>
          지갑 주소 : {data.address}
        </Typography>
        <Typography sx={{ mt: 3, fontSize: 20 }}>
          비밀 키 : {data.privateKey}
        </Typography>
        <Typography sx={{ mt: 2, color: "red", textAlign: "center" }}>
          비밀키는 절대로 타인에게 공개하거나 노출하지마세요
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 20 }}>
        want it에서 마음껏 소통하고 보상받으세요
      </Typography>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        onClick={() => {
          setSuccessSignup(false);
          setData({});
        }}
        sx={{ height: 50, width: 150, fontWeight: "bold" }}
      >
        로그인 하러 가기
      </Button>
    </Stack>
  );
}
