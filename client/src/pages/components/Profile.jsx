import * as React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
	Stack,
	Container,
	Box,
	Button,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

function Profile() {
	const userInfo = useSelector((state) => state.userReducer).data;
	const [password, setPassword] = useState("admin");

	return (
		<Container
			sx={{
				mt: 2,
				mb: 2,
				backgroundColor: "#fff",
				borderRadius: 3,
			}}
		>
			{/* <Stack sx={{ alignItems: "end", mr: -3 }}>
				<SettingsIcon color="primary" />
			</Stack>
			<Stack sx={{ alignItems: "center" }}>
				

				<Stack sx={{ fontSize: 20, mt: 3 }}>{userId}</Stack>
				<Stack sx={{ fontSize: 20, mt: 2, mb: 3 }}>{address}</Stack>
			</Stack> */}
			<Stack sx={{ alignItems: "end", mr: -3 }}>
				<Button>
					<SettingsIcon color="primary" />
				</Button>
			</Stack>
			<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
				<AccountCircleIcon color="primary" sx={{ fontSize: 70 }} />
				<Box
					display="flex"
					justifyContent="center"
					sx={{ textTransform: "lowercase", m: 1 }}
				>
					{userInfo.user_id}
				</Box>
				<Box
					onClick={() => {
						navigator.clipboard.writeText(userInfo.address).then(
							() => {
								alert("주소가 복사되었습니다.");
							},
							() => {
								alert("주소 복사에 실패했습니다.");
							}
						);
						// alert("주소가 복사되었습니다.");
					}}
					display="flex"
					justifyContent="center"
					sx={{
						textTransform: "lowercase",
						m: 1,
						cursor: "pointer",
						borderRadius: 10,
						border: 2,
						padding: 1,
						borderStyle: " dotted",
						color: "#3b5998",
					}}
				>
					{userInfo.address.slice(0, 4) +
						"..." +
						userInfo.address.slice(
							userInfo.address.length - 4,
							userInfo.address.length
						)}
				</Box>
			</Stack>
		</Container>
	);
}

export default Profile;
