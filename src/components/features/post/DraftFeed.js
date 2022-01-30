import React, {useEffect, useState, useRef, useCallback} from "react"
import {AppWrapper} from "../../common/AppWrapper"
import Search from "./Search"
import {clearPost, getDrafts, deleteDraft} from "./postSlice"
import {useDispatch, useSelector} from "react-redux"
import {URL_PATH} from "../../../utils/urlPath"
import NoItemsFound from "./NoItemsFound"
import {useNavigate} from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"
import {debounce} from "lodash"
import DraftItem from "./DraftItem"

function DraftFeed() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const limit = 10
  const [page, setPage] = useState(0)
  const posts = useSelector(state => state.post.drafts)
  const isLoading = useSelector(state => state.post.isLoading)
  const loader = useRef(null)
  const [, setSearch] = useState("")

  useEffect(() => {
    const params = {
      _limit: limit,
      _start: page,
      _sort: "created_at:desc",
      isAppend: true,
    }
    dispatch(getDrafts(params))
  }, [dispatch, page])

  useEffect(() => {
    const handleObserver = async entities => {
      const target = entities[0]
      if (target.isIntersecting && page.length > 10) {
        setPage(page => page + limit)
      }
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
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
    navigate(URL_PATH.HOME)
  }

  // const redirectToPostDetail = slug => {
  //   navigate(`${URL_PATH.POST}/${slug}`, {state: {slug}})
  // }

  const getDraftsDebounce = search => {
    const params = {
      _limit: limit,
      _start: 0,
      _sort: "created_at:desc",
      search: search,
      isAppend: false,
    }
    dispatch(getDrafts(params))
  }

  const debounceFn = useCallback(debounce(getDraftsDebounce, 1000), []) // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeSearchtext = value => {
    setSearch(value)
    debounceFn(value)
  }

  const onDeleteDraft = params => {
    dispatch(deleteDraft(params))
  }

  return (
    <>
      <div className="ml-40 mb-20 flex flex-col Page w-full lg:w-3/4 justify-center mt-18 w-full space-x-2 space-y-10">
        <Search onChange={onChangeSearchtext} />
        {posts.length ? (
          posts.map(detail => {
            return <DraftItem block={detail} deleteDraft={onDeleteDraft} />
          })
        ) : (
          <NoItemsFound
            content="No bookmarks added.."
            buttonText="Go to feed"
            onClickHandler={redirectToPost}
          />
        )}
        <div ref={loader} className="text-center">
          {<ClipLoader loading={isLoading} size={20} />}
        </div>
      </div>
    </>
  )
}

export default AppWrapper(DraftFeed)
