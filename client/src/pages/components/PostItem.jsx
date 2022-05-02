import React from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const PostItem = (post) => {
  return (
    <ListItem
      alignItems="flex-start"
      component={Link}
      to={`/post/${post.post.id}`}
      sx={{
        mb: 2,
        backgroundColor: "#fff",
        borderRadius: 3,
        "&:hover": {
          boxShadow: "1px 1px 1px 1px gray",
          transform: "translate(-1px, -1px)",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="img/steemit.svg" />
      </ListItemAvatar>
      <ListItemText
        primary={post.post.title}
        secondary={
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <Typography
                sx={{ display: "inline", mr: 3 }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {post.post.user_id}
              </Typography>
              <Typography>{post.post.body}</Typography>
            </Stack>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {post.post.createdAt
                ? moment(post.post.createdAt).format("YYYY. M. DD.")
                : new Date().toLocaleDateString()}
            </Typography>
          </Stack>
        }
      />
    </ListItem>
  );
};

export default PostItem;
