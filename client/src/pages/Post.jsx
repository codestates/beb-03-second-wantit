import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Stack,
  TextField,
  List,
  Button,
  Typography,
} from "@mui/material";
import Comments from "./components/Comments";
import CommentsForm from "./components/CommentsForm";

const Post = () => {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [commentEventFlag, setCommentEventFlag] = useState(false);

  useEffect(() => {
    const url = `http://localhost:4000/post/${params.id}`;
    axios
      .get(url)
      .then((payload) => {
        setPostData(payload.data.data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [commentEventFlag]);

  return (
    <Container
      sx={{ background: "#fff", mt: 3, mb: 3, height: "87vh", borderRadius: 2 }}
    >
      {isLoading ? (
        <div>로딩중입니다</div>
      ) : (
        <Stack>
          <Stack
            component="form"
            sx={{
              border: 1,
              height: 400,
              width: "100%",
              mt: 2,
              mb: 3,
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            {/* <TextField
              id="outlined-multiline-flexible"
              label="제목"
              multiline
              sx={{ width: "100%" }}
              value={postData.post.title}
            /> */}

            <Typography
              variant="h4"
              sx={{
                mt: 2,
                ml: 3,
                border: 1,
                borderRadius: 2,
                height: 50,
                backgroundColor: "#ebe8e8ee",
              }}
            >
              제목 : {postData.post.title}
            </Typography>
            {/* <TextField
              id="outlined-multiline-static"
              label="내용"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              value={postData.post.body}
            /> */}
            <Typography sx={{ fontSize: 20 }}>{postData.post.body}</Typography>

            <Button
              component={Link}
              to="/posts/form"
              state={{
                post: postData.post,
              }}
              variant="outlined"
            >
              수정
            </Button>
          </Stack>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {postData.comments.map((comment) => (
              <Comments
                key={comment.id}
                comment={comment}
                setCommentEventFlag={setCommentEventFlag}
                commentEventFlag={commentEventFlag}
              />
            ))}
          </List>
          <CommentsForm
            post_id={postData.post.id}
            setCommentEventFlag={setCommentEventFlag}
            commentEventFlag={commentEventFlag}
          />
        </Stack>
      )}
    </Container>
  );
};

export default Post;
