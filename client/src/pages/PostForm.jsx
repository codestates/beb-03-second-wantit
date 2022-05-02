import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import {
  Container,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  AlertTitle,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPostFlag } from "../modules/postUploadReducer";
import Checkbox from "@mui/material/Checkbox";

const PostForm = () => {
  const userInfo = useSelector((state) => state.userReducer).data;
  let postFlag = useSelector((state) => state.postUploadReducer).data;
  const loc = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [isValidPost, setValidPost] = useState(true);

  const [post, setPost] = useState(
    loc.state?.post || { title: "", body: "", user_id: userInfo.id }
  );

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
    if (post.title === "" || post.body === "") {
      setValidPost(false);
    } else {
      setValidPost(true);
      if (post.id) {
        const url = `http://localhost:4000/post/${post.id}`;
        axios.patch(url, { title: post.title, body: post.body }).catch((e) => {
          console.error(e);
        });
        nav(`/post/${post.id}`);
      } else {
        const url = `http://localhost:4000/post`;
        axios
          .post(url, {
            title: post.title,
            body: post.body,
            user_id: post.user_id,
          })
          .catch((e) => {
            console.error(e);
          });
        window.alert("1 wantit 토큰 지급");
        dispatch(setPostFlag(!postFlag));
        nav("/*");
      }
    }
  };

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Container sx={{ height: "88vh" }}>
      <Stack
        sx={{
          mt: 5,
          borderRadius: 10,
          height: "80vh",
          backgroundColor: "#fff",
        }}
        justifyContent="space-around"
      >
        <Typography
          sx={{ fontSize: 40, fontWeight: "bold", textAlign: "center" }}
        >
          게시글 작성
        </Typography>
        <Stack sx={{ height: 80 }} alignItems="center">
          <TextField
            id="title"
            label="제목"
            multiline
            sx={{ width: "80%" }}
            defaultValue={post.title}
            onChange={(event) => onChangeHandler(event.target)}
          />
        </Stack>
        <Stack sx={{ height: 500, mt: -5 }} alignItems="center">
          <TextField
            id="body"
            label="내용"
            multiline
            rows={20}
            sx={{ width: "80%" }}
            defaultValue={post.body}
            onChange={(event) => onChangeHandler(event.target)}
          />
        </Stack>
        <Typography
          sx={{
            fontSize: 20,
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          want it은 블록체인 인센티브 기반 커뮤니티로 한번 글을 작성하면 삭제가
          불가능합니다.
          <br />
          신중히 생각하고 글을 작성해주세요!!!
          <br />
          글을 작성하려면 아래 체크박스를 체크해주세요
        </Typography>
        <Stack alignItems="center">
          <Checkbox
            checked={checked}
            onChange={(e) => {
              handleCheck(e);
            }}
          />

          {!checked ? (
            <Button disabled variant="outlined" sx={{ width: 100, mt: 2 }}>
              저장
            </Button>
          ) : (
            <Button
              onClick={onSubmitHandler}
              variant="contained"
              sx={{ width: 100, mt: 2 }}
            >
              저장
            </Button>
          )}
        </Stack>
      </Stack>
      {isValidPost ? (
        <></>
      ) : (
        <Snackbar
          open={!isValidPost}
          anchorOrigin={{ vertical: "bottom", horizontal: "bottom" }}
          autoHideDuration={1500}
          onClose={() => {
            setValidPost(true);
          }}
        >
          <Alert severity="error" variant="filled" sx={{ width: "30%" }}>
            <AlertTitle>경고</AlertTitle>
            제목과 내용은 필수입니다.
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default PostForm;
