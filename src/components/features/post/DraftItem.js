import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import pic6 from "../../../assets/images/pic-6.jpg";
import moment from "moment";
import { URL_PATH } from "../../../utils/urlPath";
import { useNavigate } from "react-router-dom";

export default function DraftItem({ block, deleteDraft }) {
  let navigate = useNavigate();

  const handleClick = ({ id, draft_blocks }) => {
    navigate(URL_PATH.POST, { state: { id, draft_blocks } });
  };

  return (
    <div className="w-3/4">
      <div className="flex content-start">
        <img src={pic6} className="object-cover rounded-lg contain h-24 w-28" alt="cover"/>
        <div className="flex flex-col ml-5 flex-1">
          <h4
            className="text-xl text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: block.title,
            }}
          ></h4>
          <h4
            className="text-l mt-1"
            dangerouslySetInnerHTML={{
              __html:
                block.draft_blocks && block.draft_blocks[1]
                  ? block.draft_blocks[1].description
                  : "",
            }}
          ></h4>
          <p className="mt-1">
            Last updated:
            {moment(
              block.draft_blocks && block.draft_blocks[0].updated_at
            ).fromNow()}
          </p>
        </div>
        {/* <Link
          to={{
            pathname: URL_PATH.POST,
            id: block.id,
            blocks: block.draft_blocks,
          }}
        > */}
        <PencilIcon
          onClick={() => {
            handleClick(block);
          }}
          className="h-6 w-6 text-right cursor-pointer mr-5 mt-1"
        />
        {/* </Link> */}
        <TrashIcon
          className="h-6 w-6 text-right cursor-pointer mt-1"
          onClick={() => {
            deleteDraft({ id: block.id });
          }}
        />
      </div>
    </div>
  );
}
