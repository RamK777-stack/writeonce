import React, {useEffect} from "react"
import {AppWrapper} from "../../common/AppWrapper"
import avatar from "../../../assets/images/avatar.png"
import {getPostDetail} from "./postSlice"
import {useDispatch, useSelector} from "react-redux"
import {useLocation} from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import RenderHtml from "./RenderHtml"
import {FiThumbsUp} from "react-icons/fi"
import {FaThumbsUp} from "react-icons/fa"
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai"
import {RiTwitterLine} from "react-icons/ri"
import {GiUnicorn} from "react-icons/gi"
import {BookmarkIcon} from "@heroicons/react/outline"
import {BookmarkIcon as BookmarkAltIcon} from "@heroicons/react/solid"
import {addReactionToPost, createBookMark, deleteBookMark} from "./postSlice"
import moment from "moment"

function PostDetail() {
  const dispatch = useDispatch()
  const location = useLocation()
  const slug = location.pathname.replace("/post/", "")
  const detail = useSelector(state => state.post.postDetail)

  useEffect(() => {
    dispatch(getPostDetail(slug))
  }, [dispatch, slug])

  const addReaction = async (post, reaction) => {
    await dispatch(addReactionToPost({post, reaction}))
    const slug = location.pathname.replace("/post/", "")
    dispatch(getPostDetail(slug))
  }

  const shareIntoTwitter = () => {
    const url = `https://twitter.com/share?url=${window.location.href}&text=${detail.title}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleClickBookMark = async event => {
    event.stopPropagation()
    if (detail.isBookMarked) {
      await dispatch(deleteBookMark(detail?.bookMarkId))
      dispatch(getPostDetail(slug))
    } else {
      await dispatch(createBookMark(detail?.id))
      dispatch(getPostDetail(slug))
    }
  }

  return (
    <div className="flex justify-center">
      <div className="mb-10 w-full md:w-3/4 lg:w-1/2 px-5 lg:px-0">
        <div className="h-full">
          {detail?.coverImage && (
            <div className="coverImage">
              <img
                src={detail?.coverImage}
                className="w-full rounded lg:h-96 h-48 object-cover false"
                alt="cover"
              />
            </div>
          )}
          <div className="flex items-center mt-5">
            <img
              src={avatar}
              className="object-cover rounded-full contain h-16 w-16"
              alt="cover"
            />
            {/* <div className="object-cover rounded-full contain h-16 w-16 bg-gray-100" /> */}
            <div className="flex flex-col ml-5 flex-1">
              <div className="flex flex-row">
                <p className="font-bold text-lg">
                  {detail?.author?.user_profile
                    ? `${detail?.author?.user_profile?.firstName} ${detail?.author?.user_profile?.lastName}`
                    : detail?.author?.username}
                </p>
                {/* <p className="ml-2 text-sm rounded-full bg-blue-100 text-blue-600 w-20 p-1 text-center cursor-pointer">
                  Follow
                </p> */}
              </div>
              <p>
                Posted on{" "}
                {detail?.created_at &&
                  moment(detail?.created_at).format("MMM DD, yyyy")}
              </p>
            </div>
          </div>
          <div className="mt-10 prose w-full max-w-none">
            <h1 className="font-bold text-3xl text-gray-600 dark:text-slate-200">
              {detail.title || <Skeleton />}
            </h1>
            <div
              className="mt-5 text-gray-700 subpixel-antialiased"
              // dangerouslySetInnerHTML={{
              //   __html: detail.description,
              // }}
            >
              {detail.markdown && <RenderHtml markdown={detail.markdown} />}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block justify-center ml-20 mt-20">
        <div className="fixed cursor-pointer">
          {detail?.userReactions?.find(i => i.reactionId === 1) ? (
            <FaThumbsUp
              className="w-5 h-5 mt-5"
              id="1"
              onClick={() => {
                addReaction(detail.id, 1)
              }}
            />
          ) : (
            <FiThumbsUp
              className="w-6 h-6 mt-5"
              id="1"
              onClick={() => {
                addReaction(detail.id, 1)
              }}
            />
          )}
          <div className="text-center text-gray-700 dark:text-white">
            {detail?.countReactions?.find(i => i.reactionId === 1)?.count || 0}
          </div>
          {detail?.userReactions?.find(i => i.reactionId === 2) ? (
            <AiFillHeart
              className="w-6 h-6 mt-5"
              id="2"
              onClick={() => {
                addReaction(detail.id, 2)
              }}
            />
          ) : (
            <AiOutlineHeart
              className="w-6 h-6 mt-5"
              id="2"
              onClick={() => {
                addReaction(detail.id, 2)
              }}
            />
          )}
          <div className="text-center text-gray-700 dark:text-white">
            {detail?.countReactions?.find(i => i.reactionId === 2)?.count || 0}
          </div>
          {/* {detail?.userReactions?.find(i => i.reactionId === 3) ? ( */}
          <GiUnicorn
            className="w-6 h-6 mt-5"
            id="3"
            onClick={() => {
              addReaction(detail.id, 3)
            }}
          />
          {/* // ) : (
          //   <img
          //     src={unicorn}
          //     className="w-6 h-6 mt-5"
          //     id="3"
          //     onClick={() => {
          //       addReaction(detail.id, 3)
          //     }}
          //   />
          // )} */}

          <div className="text-center text-gray-700 dark:text-white">
            {detail?.countReactions?.find(i => i.reactionId === 3)?.count || 0}
          </div>
          <RiTwitterLine
            className="w-6 h-6 mt-10"
            onClick={() => shareIntoTwitter()}
          />
          {detail.isBookMarked ? (
            <BookmarkAltIcon
              className="w-6 h-6 mt-5"
              onClick={e => handleClickBookMark(e)}
            />
          ) : (
            <BookmarkIcon
              className="w-6 h-6 mt-5"
              onClick={e => handleClickBookMark(e)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AppWrapper(PostDetail)
