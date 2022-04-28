import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./components/PostItem";
import { Stack, Container, List, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const Posts = () => {
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 11;

  useEffect(() => {
    const url = "http://localhost:4000/post";
    axios
      .get(url)
      .then((payload) => {
        setPostList(payload.data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const handlePage = (event, value) => {
    setPage(value);
  };

  return (
    <Container sx={{ height: "88vh" }}>
      <Stack justifyContent="center" sx={{ height: "4vh" }}>
        <Typography sx={{ mr: 2, fontSize: 30 }}>게시글</Typography>
      </Stack>
      <Stack sx={{ width: "100%", height: "78vh" }}>
        <List sx={{ width: "100%" }}>
          {postList.slice(offset, offset + 11).map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </List>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "5vh", width: "100%" }}
      >
        <Pagination
          count={postList.length <= 11 ? 1 : Math.ceil(postList.length / 11)}
          defaultPage={1}
          color="primary"
          onChange={handlePage}
        />
      </Stack>
    </Container>
  );
};

export default Posts;
