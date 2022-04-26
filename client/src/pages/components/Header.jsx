import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div>
			<Button component={Link} to="/">
				메인
			</Button>
			<Button component={Link} to="/posts">
				게시글
			</Button>
			<Button component={Link} to="/posts">
				게시글 작성
			</Button>
		</div>
	);
};

export default Header;
