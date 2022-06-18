import React, {useEffect, useState, useRef, useCallback} from "react"
import PostListItem from "./PostListItem"
// import Search from "./Search"
import {getPosts, clearPost} from "./postSlice"
import {useDispatch, useSelector} from "react-redux"
import {URL_PATH} from "../../../utils/urlPath"
import NoItemsFound from "./NoItemsFound"
// import {useNavigate} from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"
import {debounce} from "lodash"
import {useRouter} from "next/router"
import Contact from "../../common/Contact"

function PostFeed() {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const router = useRouter()
  const limit = 10
  const [page, setPage] = useState(0)
  const posts = useSelector(state => state.post.posts)
  const isLoading = useSelector(state => state.post.isLoading)
  const loader = useRef(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const params = {
      _limit: limit,
      _start: page,
      _sort: "created_at:desc",
      isAppend: true,
    }
    dispatch(getPosts(params))
  }, [dispatch, page])

  const handleObserver = async entities => {
    const target = entities[0]
    if (target.isIntersecting) {
      setPage(page => page + limit)
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    }
    //Intersection observer to watch visibility change of element
    const observer = new window.IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
    return () => {
      dispatch(clearPost())
    }
  }, [dispatch])

  const redirectToPost = () => {
    // navigate(URL_PATH.POST)
    router.push(URL_PATH.POST)
  }

  const redirectToPostDetail = slug => {
    router.push(`${URL_PATH.POST}/${slug}`, {state: {slug}})
    // navigate(`${URL_PATH.POST}/${slug}`, {state: {slug}})
  }

  const getPostsDebounce = search => {
    const params = {
      _limit: limit,
      _start: 0,
      _sort: "created_at:desc",
      search: search,
      isAppend: false,
    }
    dispatch(getPosts(params))
  }

  // const debounceFn = useCallback(debounce(getPostsDebounce, 1000), []) // eslint-disable-line react-hooks/exhaustive-deps

  // const onChangeSearchtext = value => {
  //   setSearch(value)
  //   debounceFn(value)
  // }

  return (
    <div className="container mx-auto px-0 lg:px-28 md:px-10">
      <div className="flex">
        {/* <div className="mt-8 p-2 lg:ml-20 md:ml-20 md:w-3/4 mb-20 flex flex-col Page w-full lg:w-4/5 justify-center w-full space-y-3"> */}
        <div className="mt-8 p-1 lg:p-2 md:p-2 mb-20 flex flex-col Page w-full justify-center space-y-3">
          {/* <Search value={search} onChange={onChangeSearchtext} /> */}
          {posts.length ? (
            posts.map(detail => {
              return (
                <PostListItem
                  detail={detail}
                  redirectToPostDetail={redirectToPostDetail}
                  isBookMarked={detail.isBookMarked}
                />
              )
            })
          ) : (
            <NoItemsFound
              content="No posts added.."
              buttonText="Be the first, Write article"
              onClickHandler={redirectToPost}
            />
          )}
          <div ref={loader} className="w-full lg:w-3/4 md:w-3/4 text-center">
            {<ClipLoader loading={isLoading} size={20} />}
          </div>
        </div>

        <div className="ml-8">
          <Contact />
        </div>
      </div>
    </div>
  )
}

export default PostFeed
