import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import PostItem from "./components/PostItem";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Posts = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const url = "/post/";
    console.log("useEffect 실행");
    axios
      .get(url)
      .then((payload) => {
        setPostList(payload.data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Stack direction="row" spacing={2}>
          <Link to="/post">
            <Button>게시글 작성</Button>
          </Link>
        </Stack>
        <Stack spacing={2}>
          {postList.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Posts;
