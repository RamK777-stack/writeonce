import React, { useEffect } from "react";
import { AppWrapper } from "../../common/AppWrapper";
import PostListItem from "./PostListItem";
import Search from "./Search";
import SecureLS from "secure-ls";
import { getPosts } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

const ls = new SecureLS();

function PostFeed() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  console.log(posts);
  return (
    <>
      <div className="ml-40 flex flex-col Page w-full lg:w-3/4 justify-center mt-18 w-full space-x-2 space-y-10">
        <Search />
        {posts &&
          posts.map((detail) => {
            return <PostListItem detail={detail} />;
          })}
      </div>
    </>
  );
}

export default AppWrapper(PostFeed);
