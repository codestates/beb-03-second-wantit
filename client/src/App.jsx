import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Main from "./pages/Main";
import PostForm from "./pages/PostForm";
import Mypage from "./pages/Mypage";
import Header from "./pages/components/Header";
import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Footer from "./pages/components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const userInfo = useSelector((state) => state.userReducer).data;
  const [searchName, setSearchName] = useState("");

  const handleSearch = (v) => {
    setSearchName(v);
  };

  return (
    <>
      <Header handleSearch={handleSearch} />
      <Stack
        sx={{
          height: "auto",
          minHeight: "88vh",
          backgroundColor: "#ebe8e8ee",
        }}
      >
        <Routes>
          <Route
            path="/*"
            element={userInfo ? <Posts searchName={searchName} /> : <Main />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:id" element={userInfo ? <Post /> : <Main />} />
          <Route
            path="/posts/form"
            element={userInfo ? <PostForm /> : <Main />}
          />
          <Route path="/mypage" element={userInfo ? <Mypage /> : <Main />} />
        </Routes>
      </Stack>

      <Footer />
    </>
  );
}

export default App;
