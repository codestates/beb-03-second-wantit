import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Stack, List, Button, Typography } from "@mui/material";
import Comments from "./components/Comments";
import CommentsForm from "./components/CommentsForm";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const Post = () => {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [commentEventFlag, setCommentEventFlag] = useState(false);
  const [isLiked, setLiked] = useState();
  const userInfo = useSelector((state) => state.userReducer).data;

  console.log(userInfo);

  const nav = useNavigate();

  useEffect(() => {
    const url = `http://localhost:4000/post/${params.id}`;
    axios
      .post(url, { user_id: userInfo.id })
      .then((payload) => {
        setPostData(payload.data.data);
        setLoading(false);
        setLiked(!!payload.data.data.isLiked);
      })
      .catch((e) => console.error(e));
  }, [commentEventFlag, isLiked]);

  const likeEventHandler = () => {
    const url = `http://localhost:4000/post/likes/${postData.post.id}`;
    if (isLiked) {
      axios
        .delete(url, { data: { user_id: userInfo.id } })
        .then(setLiked(false))
        .catch((e) => {
          console.error(e);
        });
    } else {
      axios
        .post(url, { user_id: userInfo.id })
        .then(setLiked(true))
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <Container
      sx={{ background: "#fff", mt: 3, mb: 3, height: "87vh", borderRadius: 2 }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Stack justifyContent="space-between" sx={{ height: "87vh" }}>
          <Stack
            component="form"
            sx={{
              backgroundColor: "#f1f1f1",
              height: 600,
              borderRadius: 2,
              width: "100%",
              mt: 2,
              mb: 3,
              boxShadow: "0 1px 1px 1px gray",
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                mt: 2,
                height: 50,
                boxShadow: "0 3px 3px -3px gray",
              }}
            >
              <Typography variant="h4" sx={{ ml: 3 }}>
                제목 : {postData.post.title}
              </Typography>
              <Typography variant="p">Likes : {postData.likes}</Typography>

              <Button onClick={likeEventHandler} variant="outlined">
                {isLiked ? "좋아요 취소" : "좋아요"}
              </Button>
              {postData.post.user_id === userInfo.id ? (
                <Button
                  component={Link}
                  to="/posts/form"
                  sx={{ mr: 3 }}
                  state={{
                    post: postData.post,
                  }}
                  variant="outlined"
                >
                  수정
                </Button>
              ) : (
                <></>
              )}
            </Stack>
            <Stack sx={{ mt: 1, padding: 3, height: 300 }}>
              <Typography sx={{ fontSize: 20 }}>
                {postData.post.body}
              </Typography>
            </Stack>
          </Stack>
          <CommentsForm
            post_id={postData.post.id}
            setCommentEventFlag={setCommentEventFlag}
            commentEventFlag={commentEventFlag}
          />
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
        </Stack>
      )}
      {userInfo === null && nav("/")}
    </Container>
  );
};

export default Post;
