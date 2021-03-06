import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Typography,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Modal,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Comments = ({ comment, setCommentEventFlag, commentEventFlag }) => {
  const [openCommentEditModal, setOpenCommentEditModal] = useState(false);
  const [revisedComment, setRevisedComment] = useState(comment.content);

  const userInfo = useSelector((state) => state.userReducer).data;

  const onSubmitHandler = () => {
    const url = `http://localhost:4000/post/comments/${comment.id}`;
    axios
      .patch(url, { content: revisedComment })
      .catch((e) => console.error(e));
    setCommentEventFlag(!commentEventFlag);
    setOpenCommentEditModal(false);
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="../img/steemit.svg" />
        </ListItemAvatar>
        <ListItemText
          primary={comment.content}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline", mr: "1rem" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.user_id}
              </Typography>
              {comment.createdAt
                ? moment(comment.createdAt).format("YYYY. M. DD.")
                : new Date().toLocaleDateString()}
            </React.Fragment>
          }
        />
        {userInfo.id === comment.user_id ? (
          <Button
            onClick={() => {
              setOpenCommentEditModal(true);
            }}
          >
            수정
          </Button>
        ) : (
          <></>
        )}
      </ListItem>
      <Divider variant="inset" />
      <Modal
        open={openCommentEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="댓글"
              variant="outlined"
              value={revisedComment}
              onChange={(event) => {
                setRevisedComment(event.target.value);
              }}
            />
            <Button onClick={onSubmitHandler}>완료</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Comments;
