import React from "react";
import { useState } from "react";
import axios from "axios";
import { Box, Stack, TextField, Button } from "@mui/material";

const CommentsForm = ({ post_id, setCommentEventFlag, commentEventFlag }) => {
  const [comment, setComment] = useState("");

  const onSubmitHandler = () => {
    axios
      .post("http://localhost:4000/post/comments", {
        user_id: 1,
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
      <div style={{ display: "flex" }}>
        <TextField
          id="comment"
          label="댓글"
          placeholder="댓글을 작성하세요"
          sx={{
            width: "95%",
          }}
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Button
          onClick={onSubmitHandler}
          variant="contained"
          sx={{ width: "5%" }}
        >
          작성
        </Button>
      </div>
    </Box>
  );
};

export default CommentsForm;
