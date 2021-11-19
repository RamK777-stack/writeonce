import React, { useEffect } from "react";
import { AppWrapper } from "../../common/AppWrapper";
import DraftItem from "./DraftItem";
import Search from "./Search";
import { getDrafts } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";
import { deleteDraft } from "./postSlice";
import noDraftImage from "../../../assets/images/noblog.png";
import noDraftImageDark from "../../../assets/images/noblogdark4.png";
import { useNavigate } from "react-router-dom";
import { URL_PATH } from "../../../utils/urlPath";

function Draft() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const drafts = useSelector((state) => state.post.drafts);

  useEffect(() => {
    dispatch(getDrafts());
  }, []);

  const onDeleteDraft = (params) => {
    console.log(params, "11");
    dispatch(deleteDraft(params));
  };

  console.log(drafts);
  return (
    <div className="ml-40 flex flex-col Page w-full lg:w-3/4 justify-center mt-18 w-full space-x-2 space-y-10">
      <Search />
      {drafts && drafts.length ? (
        drafts.map((block) => (
          <DraftItem block={block} deleteDraft={onDeleteDraft} />
        ))
      ) : (
        <div className="text-center w-3/4 text-gray-500 -mt-5">
          <img className="h-80 w-80 m-auto dark:hidden" src={noDraftImage} />
          <img
            className="h-80 w-80 m-auto hidden dark:block"
            src={noDraftImageDark}
          />
          <h1 className="text-2xl">No drafts here..</h1>
          <button
            className="mt-5 items-center px-5 py-1 text-xl border-2 dark:border border-blue-300 dark:border-blue-400
          hover:bg-blue-500 dark:hover:bg-gray-700 dark:text-gray-300 hover:text-white text-gray-600 font-bold rounded-full"
            onClick={() => {
              navigate((URL_PATH.POST));
            }}
          >
            Add new draft
          </button>
        </div>
      )}
    </div>
  );
}

export default AppWrapper(Draft);
