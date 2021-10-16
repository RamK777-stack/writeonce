import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./components/features/post/postSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});
