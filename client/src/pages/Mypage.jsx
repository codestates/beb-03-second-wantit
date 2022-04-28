import * as React from "react";
import { useState, useEffect } from "react";
import {
	Stack,
	Container,
	Box,
	Button,
	Tab,
	Link,
	ListItem,
	ListItemAvatar,
	Avatar,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Post from "./Post";
import Profile from "./components/Profile";
import SendToken from "./components/SendToken";
import Comments from "./components/Comments";
import axios from "axios";
import PostItem from "./components/PostItem";

function Mypage() {
	const [post, setPost] = useState([]);
	const [comment, setComment] = useState([]);
	const [value, setValue] = React.useState("1"); //Tab 관련

	// TabContext
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// user 정보 조회
	/* 	useEffect(() => {
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
	}, []); */

	// 유저 포스트, 댓글 받기
	useEffect(() => {
		axios
			.get(`http://localhost:4000/users/findById?user_id=admin`)
			.then((payload) => {
				setPost(payload.data.data.posts);
				console.log(post);
				setComment(payload.data.data.comments);
			})
			.catch((e) => console.error(e));
	}, []);

	return (
		<Container
			sx={{
				mt: 2,
				mb: 3,
				backgroundColor: "#fff",
				borderRadius: 3,
			}}
		>
			<Stack>
				<Profile />
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="Posts" value="1" />
							<Tab label="Comments" value="2" />
							<Tab label="Communities" value="3" />
							<Tab label="Notifications" value="4" />
							<Tab label="Wallet" value="5" />
						</TabList>
					</Box>
					<TabPanel value="1">
						{post.length !== 0 ? (
							post.map((post) => <PostItem key={post.id} post={post} />)
						) : (
							<Stack>@userId님은 아직 남긴 글이 없습니다.</Stack>
						)}
					</TabPanel>
					<TabPanel
						value="2"
						sx={{ width: "95%", bgcolor: "background.paper" }}
					>
						{comment.length !== 0
							? comment.map((comment) => (
									<Comments
										sx={{
											width: "70%",
											bgcolor: "background.paper",
										}}
										key={comment.id}
										comment={comment}
									/>
							  ))
							: "@userId님은 아직 남긴 글이 없습니다."}
					</TabPanel>
					<TabPanel value="3">
						@userId님은 아직 가입한 커뮤니티가 없습니다.
					</TabPanel>
					<TabPanel value="4">확인하지 않은 알림이 없습니다.</TabPanel>
					<TabPanel value="5">
						{/* {transfer ? <SendToken /> : <TxDetail />} */}
						<SendToken />
					</TabPanel>
				</TabContext>
			</Stack>
		</Container>
	);
}

export default Mypage;
