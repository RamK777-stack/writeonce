import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import pic6 from "../../../assets/images/pic-6.jpg";
import moment from "moment";

export default function DraftItem({ blocks }) {
  return (
    <div className="w-3/4">
      <div className="flex content-start">
        <img src={pic6} className="object-cover rounded-lg contain h-28 w-32" />
        <div className="flex flex-col ml-5 flex-1">
          <h4
            className="text-2xl text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: blocks.title,
            }}
          ></h4>
          <h4
            className="text-xl mt-1"
            dangerouslySetInnerHTML={{
              __html: blocks.draft_blocks && blocks.draft_blocks[0].description,
            }}
          ></h4>
          <p className="mt-1">
            Last updated:
            {moment(
              blocks.draft_blocks && blocks.draft_blocks[0].updated_at
            ).fromNow()}
          </p>
        </div>
        <PencilIcon className="h-6 w-6 text-right cursor-pointer mr-2 mt-1" />
        <TrashIcon className="h-6 w-6 text-right cursor-pointer mt-1" />
      </div>
    </div>
  );
}
