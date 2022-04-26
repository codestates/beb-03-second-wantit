import * as React from "react";
import { useState, useEffect } from "react";
import { Stack, Container, Box, Button, TextField } from "@mui/material";
import axios from "axios";

function Profile() {
	const [userInfo, setUserInfo] = useState(undefined);
	const [userId, setUserId] = useState(undefined);

	useEffect(() => {
		const url = `http://localhost:4000/users/findById?user_id=kimcoding`;
		console.log("useEffect");
		axios
			.get(url)
			.then((payload) => {
				setUserInfo(payload.data.userInfo);
				console.log(payload.data.userInfo);
			})
			.catch((e) => console.error(e));
	}, []);
	function settings() {}
	return (
		<Container>
			<Stack></Stack>
			<Button onClick={settings}>settings</Button>
		</Container>
	);
}

export default Profile;
