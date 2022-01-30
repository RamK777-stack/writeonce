import {BookmarkIcon, ChatIcon, ThumbUpIcon} from "@heroicons/react/outline"
import {BookmarkIcon as BookmarkAltIcon} from "@heroicons/react/solid"
import React from "react"
import pic1 from "../../../assets/images/pic-1.jpg"
import moment from "moment"
import {createBookMark, deleteBookMark} from "./postSlice"
import {useDispatch} from "react-redux"
// import Skeleton from 'react-skeleton-loader';
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const PostListItem = ({detail, isBookMarked, redirectToPostDetail}) => {
  const dispatch = useDispatch()
  const handleClickBookMark = async event => {
    event.stopPropagation()
    if (isBookMarked) {
      await dispatch(deleteBookMark(detail?.bookMarkId))
    } else {
      await dispatch(createBookMark(detail?.id))
    }
  }

  const renderTags = tags => {
    return (
      <div className="flex flex-row space-x-2">
        {tags &&
          tags.map(item => {
            return (
              <span className="bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded-full text-xs">
                # {item.label}
              </span>
            )
          })}
      </div>
    )
  }

  return (
    <div
      className="w-3/4 cursor-pointer"
      onClick={() => {
        redirectToPostDetail(detail.slug)
      }}
    >
      <div className="flex items-center">
        {detail.img ? (
          <img
            src={pic1}
            alt="cover"
            className="object-cover rounded-full contain h-16 w-16"
          />
        ) : (
          <div className="object-cover rounded-full contain h-16 w-16 bg-gray-100" />
        )}
        <div className="flex flex-col ml-5 flex-1 dark:text-slate-200">
          {detail?.author?.user_profile ? (
            <p className="text-lg font-bold">{`${detail?.author?.user_profile?.firstName} ${detail?.author?.user_profile?.lastName}`}</p>
          ) : (
            <Skeleton />
          )}
          <p className="text-sm">
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
                onClick={e => handleClickBookMark(e)}
              />
            ) : (
              <BookmarkIcon
                className="h-6 w-6 text-right cursor-pointer"
                onClick={e => handleClickBookMark(e)}
              />
            )}
          </div>
        )}
      </div>
      <div className="mt-5 ml-1">
        <h4 className="text-xl text-gray-600 dark:text-slate-200 font-bold">
          {detail.title || <Skeleton />}
        </h4>
        {/* <h4 className="text-l mt-3 font-semibold">
          {detail.synopsis || <Skeleton />}
        </h4> */}
        <div className="mt-1">{renderTags(detail.hashtags)}</div>
        {detail.id ? (
          <div className="flex mt-1 dark:text-slate-300">
            <div className="flex flex-row space-x-2">
              <div className="flex dark:hover:bg-blue-500 dark:hover:text-white hover:bg-blue-50 rounded px-2 py-1">
                <ThumbUpIcon className="h-6 w-6 mr-1 cursor-pointer" />
                <span>
                  {!detail.likes || parseInt(detail.likes) === 0
                    ? "Be the first"
                    : `${detail.likes} Reactions`}
                </span>
              </div>
              <div className="flex dark:hover:bg-blue-500 dark:hover:text-white hover:bg-blue-50 rounded px-2 py-1">
                <ChatIcon className="h-6 w-6 mr-1 cursor-pointer" />
                <span>
                  {!detail.comments || parseInt(detail.comments) === 0
                    ? "Add comment"
                    : `${detail.comments} comments`}
                </span>
              </div>
            </div>
            <div className="flex-1 justify-end">
              <p className="text-right">{detail?.reading_time} read</p>
            </div>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
      <hr className="mt-5 dark:border-slate-300" />
    </div>
  )
}

export default PostListItem
