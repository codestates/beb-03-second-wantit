import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Box, Stack, TextField, List, Button } from "@mui/material";
import Comments from "./components/Comments";
import CommentsForm from "./components/CommentsForm";

const Post = () => {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [commentEventFlag, setCommentEventFlag] = useState(false);

  useEffect(() => {
    const url = `/post/${params.id}`;
    axios
      .get(url)
      .then((payload) => {
        setPostData(payload.data.data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [commentEventFlag]);

  return (
    <Container>
      {isLoading ? (
        <div>로딩중입니다</div>
      ) : (
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
                id="outlined-multiline-flexible"
                label="제목"
                multiline
                sx={{ width: "100%" }}
                value={postData.post.title}
              />
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="내용"
                multiline
                rows={4}
                sx={{ width: "100%" }}
                value={postData.post.body}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
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
            </div>
          </Box>
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
