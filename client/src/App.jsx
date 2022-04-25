import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Main from "./pages/Main";
import PostForm from "./pages/PostForm";
import Header from "./pages/components/Header";

import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        {/* 게시글 전체 페이지 */}
        <Route path="/posts">
          <Posts />
        </Route>
        {/* 게시글 상세 페이지 */}
        <Route path="/post/:id" component={Post} />
        {/* 게시글 작성 페이지 */}
        <Route path="/posts/form" component={PostForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
