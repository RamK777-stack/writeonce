import React, {useEffect} from "react"
import {AppWrapper} from "../../common/AppWrapper"
import cover from "../../../assets/images/cover1.jpg"
import pic1 from "../../../assets/images/pic-1.jpg"
import {getPostDetail} from "./postSlice"
import {useDispatch, useSelector} from "react-redux"
import {useLocation} from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import RenderHtml from "./RenderHtml"

function PostDetail() {
  const dispatch = useDispatch()
  const location = useLocation()
  const slug = location.state.slug
  console.log(slug)
  const detail = useSelector(state => state.post.postDetail)

  useEffect(() => {
    dispatch(getPostDetail(slug))
  }, [slug])

  console.log(detail)
  return (
    <div className="flex justify-center mb-10">
      <div className="h-full w-2/4">
        <div className="cover">
          <img
            src={cover}
            className="w-full rounded lg:h-96 h-48 object-cover false"
          />
        </div>
        <div className="flex items-center mt-5">
          <img
            src={pic1}
            className="object-cover rounded-full contain h-16 w-16"
          />
          {/* <div className="object-cover rounded-full contain h-16 w-16 bg-gray-100" /> */}
          <div className="flex flex-col ml-5 flex-1">
            {detail?.author?.user_profile ? (
              <p className="font-bold text-lg">
                {`${detail?.author?.user_profile?.firstName} ${detail?.author?.user_profile?.lastName}`}
              </p>
            ) : (
              <Skeleton />
            )}
            <p className="text-sm rounded-full bg-blue-100 text-blue-600 w-20 p-1 text-center cursor-pointer">
              Following
            </p>
          </div>
        </div>
        <div className="mt-10 prose w-full max-w-none">
          <p className="font-bold text-xl text-gray-600">
            {detail.title || <Skeleton />}
          </p>
          <div
            className="mt-5"
            // dangerouslySetInnerHTML={{
            //   __html: detail.description,
            // }}
          >
            {detail.markdown && <RenderHtml markdown={detail.markdown} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppWrapper(PostDetail)
