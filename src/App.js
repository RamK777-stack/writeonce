import React, { useEffect } from "react";
import "./assets/css/tailwind.css";
import "./assets/css/custom.css";
import Post from "./components/features/post/Post";
import PostFeed from "./components/features/post/PostFeed";
import PostDetail from "./components/features/post/PostDetail";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { URL_PATH } from "./utils/urlPath";
import Draft from "./components/features/post/Draft";
import SignupContainer from "./components/features/auth/SignupContainer";
import Signup from "./components/features/auth/Signup";
import AuthCallback from "./components/features/auth/AuthCallback";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { getUserDetail } from "./components/features/auth/AuthSlice";
import BookmarkFeed from "./components/features/post/BookmarkFeed";
import DraftFeed from "./components/features/post/DraftFeed";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetail());
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path={URL_PATH.HOME} element={<PostFeed />} />
          <Route path={URL_PATH.BOOKMARKS} element={<BookmarkFeed />} />
          <Route path={URL_PATH.POST_DETAIL} element={<PostDetail />} />
          <Route
            path={URL_PATH.POST}
            element={<ProtectedRoute Component={Post} />}
          />
          <Route path={URL_PATH.DRAFT} element={<DraftFeed />} />
          <Route path={URL_PATH.AUTH_CALLBACK} element={<AuthCallback />} />
          <Route path={URL_PATH.SIGN_IN} element={<SignupContainer />} />
        </Routes>
      </BrowserRouter>
      <Signup />
    </React.StrictMode>
  );
};

export default App;
