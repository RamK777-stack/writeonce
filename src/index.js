import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./assets/css/style.css";
import Post from "./components/features/post/Post";
import PostFeed from "./components/features/post/PostFeed";
import reportWebVitals from "./components/reportWebVitals";
import { store } from "./store";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { URL_PATH } from "./utils/urlPath";
import Draft from "./components/features/post/Draft";
import Signup from "./components/features/auth/Signup";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={URL_PATH.HOME} element={<PostFeed />} />
          <Route path={URL_PATH.POST} element={<Post />} />
          <Route path={URL_PATH.DRAFT} element={<Draft />} />
        </Routes>
      </BrowserRouter>
      <Signup />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
