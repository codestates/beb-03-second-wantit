import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import PostItem from "./components/PostItem";
import { Stack, Container, List } from "@mui/material";

const Posts = () => {
  const userInfo = useSelector((state) => state.userReducer).data;
  let postFlag = useSelector((state) => state.postUploadReducer).data;

  const [postList, setPostList] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const url = "http://localhost:4000/post";
    axios
      .get(url)
      .then((payload) => {
        setPostList(payload.data.data);
      })
      .catch((e) => console.error(e));
  }, [postFlag]);

  return (
    <Container>
      <Stack sx={{ width: "100%" }}>
        <List sx={{ width: "100%" }}>
          {postList.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </List>
      </Stack>
      {userInfo === null && nav("/")}
    </Container>
  );
};

export default Posts;
