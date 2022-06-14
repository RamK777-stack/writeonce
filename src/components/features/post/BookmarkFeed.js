import React, {useEffect, useState, useRef, useCallback} from "react"
import PostListItem from "./PostListItem"
import Search from "./Search"
import {getBookMark, clearPost} from "./postSlice"
import {useDispatch, useSelector} from "react-redux"
import {URL_PATH} from "../../../utils/urlPath"
import NoItemsFound from "./NoItemsFound"
import ClipLoader from "react-spinners/ClipLoader"
import {debounce} from "lodash"
import { useRouter } from 'next/router'

function BookmarkFeed() {
  const dispatch = useDispatch()
  const router = useRouter()
  const limit = 10
  const [page, setPage] = useState(0)
  const posts = useSelector(state => state.post.bookmarks)
  const isLoading = useSelector(state => state.post.isLoading)
  const loader = useRef(null)
  const [, setSearch] = useState("")

  useEffect(() => {
    const params = {
      _limit: limit,
      _start: page,
      _sort: "created_at:desc",
    }
    dispatch(getBookMark(params))
  }, [page, dispatch])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    }
    const handleObserver = async entities => {
      const target = entities[0]
      if (target.isIntersecting && page.length > 10) {
        setPage(page => page + limit)
      }
    }
    //Intersection observer to watch visibility change of element
    const observer = new window.IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
    return () => {
      dispatch(clearPost())
    }
  }, [dispatch, page])

  const redirectToPost = () => {
    router.push(URL_PATH.HOME)
  }

  const redirectToPostDetail = slug => {
    router.push(`${URL_PATH.POST}/${slug}`, {state: {slug}})
  }

  const getDraftsDebounce = search => {
    const params = {
      _limit: limit,
      _start: 0,
      _sort: "created_at:desc",
      search: search,
      isAppend: false,
    }
    dispatch(getBookMark(params))
  }

  const debounceFn = useCallback(debounce(getDraftsDebounce, 1000), []) // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeSearchtext = value => {
    setSearch(value)
    debounceFn(value)
  }

  return (
    <>
      <div className="p-2 lg:ml-40 md:ml-20 md:w-3/4 mb-20 flex flex-col Page w-full lg:w-3/4 justify-center mt-18 w-full space-x-2 space-y-10">
        <Search onChange={onChangeSearchtext} />
        { (posts.length ? (
            posts.map(detail => {
              return (
                <PostListItem
                  detail={detail}
                  redirectToPostDetail={redirectToPostDetail}
                  isBookMarked={true}
                />
              )
            })
          ) : (
            <NoItemsFound
              content="No bookmarks added.."
              buttonText="Go to feed"
              onClickHandler={redirectToPost}
            />
          ))}
        <div ref={loader} className="w-full lg:w-3/4 md:w-3/4 text-center">
          {<ClipLoader loading={isLoading} size={20} />}
        </div>
      </div>
    </>
  )
}

export default (BookmarkFeed)
