import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">
        <Button>메인</Button>
      </Link>
      <Link to="/posts">
        <Button>게시글</Button>
      </Link>
      <Link to="/posts/form">
        <Button>게시글 작성</Button>
      </Link>
    </div>
  );
};

export default Header;
