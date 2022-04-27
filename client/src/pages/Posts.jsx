import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostItem from "./components/PostItem";
import { Stack, Box, Container, Button, List } from "@mui/material";

const Posts = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/post";
    axios
      .get(url)
      .then((payload) => {
        setPostList(payload.data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Container>
      <Stack sx={{ width: "100%" }}>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/post">
            게시글 작성
          </Button>
        </Stack>
        <List sx={{ width: "100%" }}>
          {postList.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </List>
      </Stack>
    </Container>
  );
};

export default Posts;
