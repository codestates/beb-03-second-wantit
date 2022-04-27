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
import { useState } from "react";
import Signup from "./pages/Signup";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(true);
  }

  function handleLogOut() {
    setIsLogin(false);
  }

  return (
    <>
      <Header handleLogOut={handleLogOut} />
      <Stack
        sx={{
          height: "auto",
          minHeight: "88vh",
          backgroundColor: "#ebe8e8ee",
        }}
      >
        <Routes>
          <Route path="/*" element={isLogin ? <Posts /> : <Main />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/posts/form" element={<PostForm />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Stack>

      <Footer />
    </>
  );
}

export default App;
