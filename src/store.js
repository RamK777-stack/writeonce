import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./components/features/post/postSlice";
import authReducer from "./components/features/auth/AuthSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
  },
});
