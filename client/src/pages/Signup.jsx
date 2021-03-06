import { Container, Stack, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import SuccessSignup from "./components/SuccessSignup";

export default function Signup() {
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [valipw, setValipw] = useState("");
	const [successSignup, setSuccessSignup] = useState(false);
	const [data, setData] = useState({});
	const [idCheck, setIdCheck] = useState(false);

	const signup = () => {
		if (password === valipw && idCheck === true) {
			axios
				.post("http://localhost:4000/users/signup", {
					userId: userId,
					password: password,
				})
				.then((res) => {
					console.log("성공");
					setData(res.data);
					setSuccessSignup(true);
				})
				.catch((e) => {
					console.log(e);
					setSuccessSignup(false);
				});
		} else if (password === valipw && idCheck === false) {
			window.alert("아이디 중복체크를 해주세요.");
		} else {
			window.alert("입력하신 정보를 다시 확인하세요.");
		}
	};

	const onIdCheckHandler = () => {
		axios
			.post("http://localhost:4000/users/checkid", {
				user_id: userId,
			})
			.then((res) => {
				if (res.data.message === "중복") {
					window.alert("이미 존재하는 아이디입니다.");
				} else {
					window.alert("사용가능한 아이디입니다.");
					setIdCheck(true);
				}
			});
	};

	return (
		<Container>
			<Stack justifyContent="center" sx={{ height: "87vh" }}>
				{successSignup ? (
					<SuccessSignup
						data={data}
						setSuccessSignup={setSuccessSignup}
						setData={setData}
					/>
				) : (
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
						<Stack>
							<Typography
								sx={{
									fontSize: 60,
									fontWeight: "bold",
									color: "#3b5998",
								}}
							>
								Want it
							</Typography>
							<Typography sx={{ mt: 3, fontSize: 20 }}>
								안녕하세요. 인센티브 기반 커뮤니티 want it입니다.
								<br />
								회원가입을 환영합니다.
								<br />
								회원가입을 완료하면 보상을 받을 지갑이 생성됩니다.
							</Typography>
						</Stack>
						<Stack direction="row" alignItems="center" justifyContent="center">
							<TextField
								sx={{ width: 400, borderRadius: 3 }}
								id="filled-basic"
								label="아이디"
								variant="outlined"
								onChange={(e) => setUserId(e.target.value)}
							/>
							<Button
								sx={{ height: 55, width: 90, borderRadius: 2 }}
								variant="contained"
								onClick={() => {
									onIdCheckHandler();
								}}
							>
								중복체크
							</Button>
						</Stack>
						<TextField
							sx={{ width: 400, borderRadius: 3 }}
							id="filled-password-input"
							label="비밀번호"
							type="password"
							variant="outlined"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Stack>
							<TextField
								sx={{ width: 400, borderRadius: 3 }}
								id="filled-password-input"
								label="비밀번호 확인"
								type="password"
								variant="outlined"
								onChange={(e) => setValipw(e.target.value)}
							/>
							{password === valipw ? (
								<></>
							) : (
								<Typography sx={{ mt: 3, color: "red", textAlign: "center" }}>
									비밀번호를 틀리셨습니다. 다시 확인해주세요
								</Typography>
							)}
						</Stack>
						<Button
							sx={{ height: 55, width: 200, borderRadius: 2 }}
							variant="contained"
							onClick={() => {
								signup();
							}}
						>
							회원가입
						</Button>
					</Stack>
				)}
			</Stack>
		</Container>
	);
}
