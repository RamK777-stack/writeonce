import React, { useEffect } from "react";
import { AppWrapper } from "../../common/AppWrapper";
import DraftItem from "./DraftItem";
import Search from "./Search";
import { getDrafts } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";
import { deleteDraft } from "./postSlice";
import { useNavigate } from "react-router-dom";
import { URL_PATH } from "../../../utils/urlPath";
import NoItemsFound from "./NoItemsFound";

function Draft() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const drafts = useSelector((state) => state.post.drafts);

  useEffect(() => {
    dispatch(getDrafts());
  }, [dispatch]);

  const onDeleteDraft = (params) => {
    dispatch(deleteDraft(params));
  };

  const redirectToPost = () => {
    navigate(URL_PATH.POST);
  };

  return (
    <div className="ml-40 flex flex-col Page w-full lg:w-3/4 justify-center mt-18 w-full space-x-2 space-y-10">
      <Search />
      {drafts && drafts.length ? (
        drafts.map((block) => (
          <DraftItem block={block} deleteDraft={onDeleteDraft} />
        ))
      ) : (
        <NoItemsFound
          content="No drafts here.."
          buttonText="Add new draft"
          onClickHandler={redirectToPost}
        />
      )}
    </div>
  );
}

export default AppWrapper(Draft);
