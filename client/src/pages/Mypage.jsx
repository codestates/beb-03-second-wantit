import * as React from "react";
import { useState, useEffect } from "react";
import { Stack, Container, Box, Tab, Pagination, List } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Profile from "./components/Profile";
import SendToken from "./components/SendToken";
import Comments from "./components/Comments";
import axios from "axios";
import PostItem from "./components/PostItem";
import { useSelector } from "react-redux";

const Mypage = () => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [value, setValue] = React.useState("1"); //Tab 관련
  const userInfo = useSelector((state) => state.userReducer).data;
  const [commentEventFlag, setCommentEventFlag] = useState(false);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;

  // TabContext
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 유저 포스트, 댓글 받기
  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/findById?user_id=${userInfo.user_id}`)
      .then((payload) => {
        setPost(payload.data.data.posts);
        setComment(payload.data.data.comments);
      })
      .catch((e) => console.error(e));
  }, [commentEventFlag]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  return (
    <Container
      sx={{
        mt: 2,
        mb: 3,
        backgroundColor: "#fff",
        borderRadius: 3,
      }}
    >
      <Stack>
        <Profile />
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Posts" value="1" />
              <Tab label="Comments" value="2" />
              <Tab label="Communities" value="3" />
              <Tab label="Notifications" value="4" />
              <Tab label="Wallet" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <List sx={{ width: "100%" }}>
              {post.length !== 0 ? (
                post
                  .slice(offset, offset + 5)
                  .map((item) => <PostItem key={item.id} post={item} />)
              ) : (
                <Stack>@userId님은 아직 남긴 글이 없습니다.</Stack>
              )}
            </List>

            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: "5vh", width: "100%" }}
            >
              <Pagination
                count={post.length <= 5 ? 1 : Math.ceil(post.length / 5)}
                defaultPage={1}
                color="primary"
                onChange={handlePage}
              />
            </Stack>
          </TabPanel>

          <TabPanel
            value="2"
            sx={{ width: "95%", bgcolor: "background.paper" }}
          >
            <List sx={{ width: "100%" }}>
              {comment.length !== 0 ? (
                comment.slice(offset, offset + 5).map((item) => (
                  <Comments
                    sx={{
                      width: "70%",
                      bgcolor: "background.paper",
                    }}
                    key={item.id}
                    comment={item}
                    setCommentEventFlag={setCommentEventFlag}
                    commentEventFlag={commentEventFlag}
                  />
                ))
              ) : (
                <Stack>@userId님은 아직 남긴 글이 없습니다.</Stack>
              )}
            </List>

            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: "5vh", width: "100%" }}
            >
              <Pagination
                count={comment.length <= 5 ? 1 : Math.ceil(comment.length / 5)}
                defaultPage={1}
                color="primary"
                onChange={handlePage}
              />
            </Stack>
          </TabPanel>

          <TabPanel value="3">
            @userId님은 아직 가입한 커뮤니티가 없습니다.
          </TabPanel>
          <TabPanel value="4">확인하지 않은 알림이 없습니다.</TabPanel>
          <TabPanel value="5">
            <SendToken />
          </TabPanel>
        </TabContext>
      </Stack>
    </Container>
  );
};

export default Mypage;
