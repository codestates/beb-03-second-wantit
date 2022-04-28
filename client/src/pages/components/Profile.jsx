import * as React from "react";
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
	const [userId, setUserId] = useState("admin");
	const [password, setPassword] = useState("admin");
	const [address, setAddress] = useState(undefined);

	// user 정보 조회
	useEffect(() => {
		axios
			.post(`http://localhost:4000/users/login`, {
				user_id: userId,
				password: password,
			})
			.then((res) => {
				setUserId(res.data.data.user_id);
				setAddress(res.data.data.address);
			})
			.catch((e) => console.error(e));
	}, []);
	//
	/* useEffect(() => {
		axios
			.get(`http://localhost:4000/users/findById?user_id=admin`)
			.then((res) => {
				console.log(res.data.user_id);
				setUserId(res.data.data.user_id);
				setAddress(res.data.data.address);
			})
			.catch((e) => console.error(e));
	}, []); */

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
				<SettingsIcon color="primary" />
			</Stack>
			<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
				<Typography component="div" justifyContent="center">
					<AccountCircleIcon color="primary" sx={{ fontSize: 70 }} />
					<Box
						display="flex"
						justifyContent="center"
						sx={{ textTransform: "lowercase", m: 1 }}
					>
						{userId}
					</Box>
					<Box
						display="flex"
						justifyContent="center"
						sx={{ textTransform: "lowercase", m: 1 }}
					>
						{address}
					</Box>
				</Typography>
			</Stack>
		</Container>
	);
}

export default Profile;
