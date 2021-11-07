import React from "react";
import { AppWrapper } from "../../common/AppWrapper";
import PostListItem from "./PostListItem";
import Search from "./Search";

function PostFeed() {
  return (
    <div className="ml-40 flex flex-col Page w-full lg:w-3/4 justify-center mt-18 w-full space-x-2 space-y-10">
      <Search />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </div>
  );
}

export default AppWrapper(PostFeed);
