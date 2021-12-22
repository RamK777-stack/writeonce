import React, { useEffect, useState } from "react";
import { AppWrapper } from "../../common/AppWrapper";
import PostListItem from "./PostListItem";
import Search from "./Search";
import SecureLS from "secure-ls";
import { getPosts, getBookMark } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { URL_PATH } from "../../../utils/urlPath";
import NoItemsFound from "./NoItemsFound";
import { useNavigate, generatePath } from "react-router-dom";

const ls = new SecureLS();

function PostFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isBookMarkPage = location.pathname === URL_PATH.BOOKMARKS;
  const posts = useSelector((state) =>
    isBookMarkPage ? state.post.bookmarks : state.post.posts
  );
  const isLoading = useSelector((state) => state.post.isLoading);

  useEffect(() => {
    dispatch(isBookMarkPage ? getBookMark() : getPosts());
  }, [isBookMarkPage]);

  const redirectToPost = () => {
    navigate(URL_PATH.HOME);
  };

  const redirectToPostDetail = (slug) => {
    navigate(`${URL_PATH.POST}/${slug}`, { state: { slug } });
  };

  const detail = {};
  return (
    <>
      <div className="ml-40 flex flex-col Page w-full lg:w-3/4 justify-center mt-18 w-full space-x-2 space-y-10">
        <Search />
        {isLoading && (
          <PostListItem
            detail={detail}
            isBookMarked={isBookMarkPage ? true : detail.isBookMarked}
          />
        )}
        {posts.length ? (
          posts.map((detail) => {
            return (
              <PostListItem
                detail={detail}
                redirectToPostDetail={redirectToPostDetail}
                isBookMarked={isBookMarkPage ? true : detail.isBookMarked}
              />
            );
          })
        ) : (
          <NoItemsFound
            content="No bookmarks added.."
            buttonText="Go to feed"
            onClickHandler={redirectToPost}
          />
        )}
      </div>
    </>
  );
}

export default AppWrapper(PostFeed);
