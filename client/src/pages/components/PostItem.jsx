import React from "react";
import {
  Typography,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

const PostItem = (post) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        component={Link}
        to={`/post/${post.post.id}`}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="img/steemit.svg" />
        </ListItemAvatar>
        <ListItemText
          primary={post.post.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {post.post.user_id}
              </Typography>
              {post.post.body}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {post.post.createdAt || new Date().toLocaleDateString()}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default PostItem;
