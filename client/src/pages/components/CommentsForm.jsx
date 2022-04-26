import React from "react";
import { useState } from "react";
import axios from "axios";
import { Box, Stack, TextField, Button } from "@mui/material";

const CommentsForm = ({ post_id, setCommentEventFlag, commentEventFlag }) => {
  const [comment, setComment] = useState("");

  const onSubmitHandler = () => {
    axios
      .post("http://localhost:4000/post/comments", {
        user_id: 5,
        post_id,
        content: comment,
      })
      .catch((e) => console.error(e));
    setCommentEventFlag(!commentEventFlag);
    setComment("");
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
      </Stack>
    </Box>
  );
};

export default CommentsForm;
