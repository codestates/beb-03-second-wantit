import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Main from "./pages/Main";
import PostForm from "./pages/PostForm";
import Mypage from "./pages/Mypage";
import Header from "./pages/components/Header";
import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<>
			<Stack>
				<Header />
			</Stack>
			<Routes>
				<Route path="/" exact={true} element={<Main />} />
				<Route path="/posts*" element={<Posts />} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/posts/form" element={<PostForm />} />
			</Routes>
		</>
	);
}

export default App;
