import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  TextField,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const CommentsForm = ({ post_id, setCommentEventFlag, commentEventFlag }) => {
  const userInfo = useSelector((state) => state.userReducer).data;
  const nav = useNavigate();
  const [comment, setComment] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmitHandler = () => {
    if (comment === "") {
      window.alert("글을 작성 후 버튼을 눌러주세요");
    } else {
      axios
        .post("http://localhost:4000/post/comments", {
          user_id: userInfo.id,
          post_id,
          content: comment,
        })
        .then((payload) => {
          if (comment.length !== 0) {
            handleOpen();
          }
        })
        .catch((e) => console.error(e));
      setCommentEventFlag(!commentEventFlag);
      setComment("");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TextField
          id="comment"
          label="댓글"
          placeholder="댓글을 작성하세요"
          sx={{
            width: 1000,
          }}
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Button
          onClick={onSubmitHandler}
          variant="contained"
          sx={{ height: 50, width: 80 }}
        >
          작성
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Token Reward
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              토큰 2개가 지급되었습니다.
            </Typography>
          </Box>
        </Modal>
      </Stack>
      {userInfo === null && nav("/")}
    </Box>
  );
};

export default CommentsForm;
