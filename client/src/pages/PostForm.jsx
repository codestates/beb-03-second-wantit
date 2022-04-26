import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { Container, Box, Stack, TextField, List, Button } from "@mui/material";

const PostForm = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const [post, setPost] = useState(loc.state.post);

  const onChangeHandler = (target) => {
    switch (target.id) {
      case "title":
        setPost({ ...post, title: target.value });
        break;
      case "body":
        setPost({ ...post, body: target.value });
        break;
    }
  };

  const onSubmitHandler = () => {
    const url = `http://localhost:4000/post/${post.id}`;
    axios
      .patch(url, { title: post.title, body: post.body })
      .catch((e) => console.error(e));
    nav(url);
  };

  return (
    <Container>
      <Stack>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="title"
              label="제목"
              multiline
              sx={{ width: "100%" }}
              defaultValue={post.title}
              onChange={(event) => onChangeHandler(event.target)}
            />
          </div>
          <div>
            <TextField
              id="body"
              label="내용"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              defaultValue={post.body}
              onChange={(event) => onChangeHandler(event.target)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={onSubmitHandler} variant="outlined">
              저장
            </Button>
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default PostForm;
