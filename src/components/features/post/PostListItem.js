import { BookmarkIcon, ChatIcon, ThumbUpIcon } from "@heroicons/react/outline";
import React from "react";
import pic1 from "../../../assets/images/pic-1.jpg";

export default function PostListItem() {
  return (
    <div className="w-3/4">
      <div className="flex items-center">
        <img
          src={pic1}
          className="object-cover rounded-full contain h-16 w-16"
        />
        <div className="flex flex-col ml-5 flex-1">
          <p>Women codes</p>
          <p>November 2, 2021</p>
        </div>
        <div className="justify-end text-gray-600">
          <BookmarkIcon className="h-6 w-6 text-right cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 ml-1">
        <h4 className="text-xl text-gray-900 dark:text-white">
          5 Anti-Patterns to Avoid in Lambda based Apps
        </h4>
        <h4 className="text-l mt-3">
          Lambda is not a prescriptive service and provides broad functionality
          for you to build applications as needed. While this flexibility is
          important...
        </h4>
        <div className="flex mt-6">
          <div className="flex flex-row space-x-2">
            <ThumbUpIcon className="h-6 w-6 cursor-pointer" />{" "}
            <span>20 likes</span>
            <ChatIcon className="h-6 w-6 mr-2 cursor-pointer" />{" "}
            <span>20 comments</span>
          </div>
          <div className="flex-1 justify-end">
            <p className="text-right">2 Mins read</p>
          </div>
        </div>
      </div>
    </div>
  );
}
