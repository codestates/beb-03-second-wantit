import * as React from "react";
import { useState, useEffect } from "react";
import { Stack, Container, Box, Button, Tab, Link } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Post from "./Post";
import Profile from "./components/Profile";
import SendToken from "./components/SendToken";
import PostItem from "./components/PostItem";
import Comments from "./components/Comments";
import axios from "axios";

function Mypage() {
  const [isPost, setPost] = useState(undefined);
  const [isComment, setComment] = useState(undefined);
  const [value, setValue] = React.useState("1"); //tab 관련

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Stack sx={{ border: 1, height: "124vh" }}>
        <Stack sx={{ border: 1, height: "20%", spacing: "10" }}>
          {/* <Box component="span" sx={{ p: 1, border: "1px dashed grey" }}>
					<Link sx={{ p: 1, border: "1px dashed" }}>edit Profile</Link>
					</Box> */}
          <Box component="span" sx={{ p: 5, border: "1px dashed grey" }}>
            <Profile />
          </Box>
        </Stack>

        <Stack sx={{ border: 1, height: "80%", spacing: "10" }}>
          {/* </Box> */}
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Posts" value="1" />
                <Tab label="Comments" value="2" />
                <Tab label="Communities" value="3" />
                <Tab label="Notifications" value="4" />
                <Tab label="Wallet" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {isPost ? <Post /> : "@userId님은 아직 남긴 글이 없습니다."}
            </TabPanel>
            <TabPanel value="2">
              {isComment ? (
                <Comments />
              ) : (
                "@userId님은 아직 남긴 글이 없습니다."
              )}
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
      </Stack>
    </Container>
  );
}

export default Mypage;
