import React, { useEffect } from "react";
import { AppWrapper } from "../../common/AppWrapper";
import DraftItem from "./DraftItem";
import Search from "./Search";
import { getDrafts } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";

function Draft() {
  const dispatch = useDispatch();
  const drafts = useSelector((state) => state.post.drafts);

  useEffect(() => {
    dispatch(getDrafts());
  }, []);

  console.log(drafts);
  return (
    <div className="ml-40 flex flex-col Page w-full lg:w-3/4 justify-center mt-18 w-full space-x-2 space-y-10">
      <Search />
      {drafts && drafts.map((blocks) => <DraftItem blocks={blocks} />)}
    </div>
  );
}

export default AppWrapper(Draft);
