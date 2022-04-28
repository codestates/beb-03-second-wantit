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

function App() {
  const userInfo = useSelector((state) => state.userReducer).data;

  return (
    <>
      <Header />
      <Stack
        sx={{
          height: "auto",
          minHeight: "88vh",
          backgroundColor: "#ebe8e8ee",
        }}
      >
        <Routes>
          <Route path="/*" element={userInfo ? <Posts /> : <Main />} />
          <Route path="/login" element={<Login />} />
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
