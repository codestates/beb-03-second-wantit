import React from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(3),
  textAlign: "center",
}));

const PostItem = (post) => {
  return (
    <>
      <Link to={`/post/${post.post.id}`}>
        <Item>
          <Typography
            variant="body2"
            component="span"
            sx={{ margin: "1rem", fontWeight: "bold" }}
          >
            {post.post.title}
          </Typography>
          <Typography variant="body2" component="span" sx={{ margin: "1rem" }}>
            {post.post.user_id}
          </Typography>
          <Typography variant="body2" component="span" sx={{ margin: "1rem" }}>
            {post.post.createdAt || new Date().toLocaleDateString()}
          </Typography>
          <Typography variant="body1" component="p">
            {post.post.body}
          </Typography>
        </Item>
      </Link>
    </>
  );
};

export default PostItem;
