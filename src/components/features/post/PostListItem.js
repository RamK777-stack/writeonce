import { BookmarkIcon, ChatIcon, ThumbUpIcon } from "@heroicons/react/outline";
import React from "react";
import pic1 from "../../../assets/images/pic-1.jpg";
import sanitizeHtml from "sanitize-html";
import moment from "moment";

export default function PostListItem({ detail }) {
  return (
    <div className="w-3/4">
      <div className="flex items-center">
        <img
          src={pic1}
          className="object-cover rounded-full contain h-16 w-16"
        />
        <div className="flex flex-col ml-5 flex-1">
          <p>{`${detail?.author?.user_profile?.firstName} ${detail?.author?.user_profile?.lastName}`}</p>
          <p>{moment(detail?.created_at).format("MMMM DD, yyyy")}</p>
        </div>
        <div className="justify-end text-gray-600">
          <BookmarkIcon className="h-6 w-6 text-right cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 ml-1">
        <h4 className="text-xl text-gray-600 dark:text-white font-bold">
          {detail?.title}
        </h4>
        <h4 className="text-l mt-3 font-semibold">{detail?.synopsis}</h4>
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
      </div>
    </div>
  );
}
