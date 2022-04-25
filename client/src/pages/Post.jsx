import React from "react";

const Post = ({ match }) => {
  const postId = match?.params?.id;
  return <div>Post 컴포넌트</div>;
};

export default Post;
