import { BookmarkIcon, ChatIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkAltIcon } from "@heroicons/react/solid";
import React from "react";
import pic1 from "../../../assets/images/pic-1.jpg";
import sanitizeHtml from "sanitize-html";
import moment from "moment";
import { createBookMark, deleteBookMark } from "./postSlice";
import { useDispatch } from "react-redux";
// import Skeleton from 'react-skeleton-loader';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostListItem = ({ detail, isBookMarked, redirectToPostDetail }) => {
  const dispatch = useDispatch();
  console.log(isBookMarked);
  const handleClickBookMark = async () => {
    console.log(isBookMarked);
    if (isBookMarked) {
      await dispatch(deleteBookMark(detail?.bookMarkId));
    } else {
      await dispatch(createBookMark(detail?.id));
    }
  };

  return (
    <div
      className="w-3/4 cursor-pointer"
      onClick={() => {
        redirectToPostDetail(detail.slug);
      }}
    >
      <div className="flex items-center">
        {detail.img ? (
          <img
            src={pic1}
            className="object-cover rounded-full contain h-16 w-16"
          />
        ) : (
          <div className="object-cover rounded-full contain h-16 w-16 bg-gray-100" />
        )}
        <div className="flex flex-col ml-5 flex-1">
          {detail?.author?.user_profile ? (
            <p className="font-bold">{`${detail?.author?.user_profile?.firstName} ${detail?.author?.user_profile?.lastName}`}</p>
          ) : (
            <Skeleton />
          )}
          <p>
            {detail?.created_at ? (
              moment(detail?.created_at).format("MMMM DD, yyyy")
            ) : (
              <Skeleton />
            )}
          </p>
        </div>
        {detail.id && (
          <div className="justify-end text-gray-600">
            {isBookMarked ? (
              <BookmarkAltIcon
                className="h-6 w-6 text-right cursor-pointer"
                onClick={() => handleClickBookMark()}
              />
            ) : (
              <BookmarkIcon
                className="h-6 w-6 text-right cursor-pointer"
                onClick={() => handleClickBookMark()}
              />
            )}
          </div>
        )}
      </div>
      <div className="mt-5 ml-1">
        <h4 className="text-xl text-gray-600 dark:text-white font-bold">
          {detail.title || <Skeleton />}
        </h4>
        <h4 className="text-l mt-3 font-semibold">
          {detail.synopsis || <Skeleton />}
        </h4>
        {detail.id ? (
          <div className="flex mt-6">
            <div className="flex flex-row space-x-2">
              <ThumbUpIcon className="h-6 w-6 cursor-pointer" />{" "}
              <span>{detail.likes || 0} likes</span>
              <ChatIcon className="h-6 w-6 mr-2 cursor-pointer" />{" "}
              <span>{detail.comments || 0} comments</span>
            </div>
            <div className="flex-1 justify-end">
              <p className="text-right">{detail?.reading_time} read</p>
            </div>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default PostListItem;
