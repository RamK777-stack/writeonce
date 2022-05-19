/* This example requires Tailwind CSS v2.0+ */
import React, {useEffect} from "react"
import {
  HomeIcon,
  BookmarkIcon,
  DocumentTextIcon,
  LoginIcon,
  LogoutIcon,
  XIcon,
} from "@heroicons/react/outline"
import Logo from "../../assets/images/feather.svg"
import ReactTooltip from "react-tooltip"
import {Link} from "react-router-dom"
import {URL_PATH} from "../../utils/urlPath"
import {logOut, toggleSideBarOpen} from "../features/auth/AuthSlice"
import {useNavigate, useLocation} from "react-router-dom"
import SecureLS from "secure-ls"
import {pageViewAnalytics} from "../../utils/index"
import {useSelector, useDispatch} from "react-redux"

const ls = new SecureLS()

const Sidebar = () => {
  const navigate = useNavigate()
  let location = useLocation()
  const dispatch = useDispatch()
  const isSideBarOpen = useSelector(state => state.auth.isSideBarOpen)

  const session = ls.get("userSession")

  const handleLogOut = () => {
    logOut()
    navigate(URL_PATH.HOME)
  }

  useEffect(() => {
    pageViewAnalytics(location.pathname + location.search)
    // ReactGA.pageview(location.pathname + location.search)
  }, [location])


  const handleClickSidebar = () => {
    dispatch(toggleSideBarOpen())
  }

  return (
    <React.Fragment>
      <div
        className={`fixed dark:bg-gray-900 bg-blue-800 lg:w-16 md:w-16 text-blue-100 px-1 z-10 
     inset-y-0 transform
    flex flex-col justify-start md:translate-x-0 transition duration-200 ease-in-out ${
      !isSideBarOpen ? "-translate-x-full w-16 ease-in-out" : "w-64 ease-in-out"
    }`}
      >
        <div className="flex items-center">
          <Link
            to={URL_PATH.HOME}
            className="flex items-center spacing-x-2 py-2.5 px-4 mt-5 transition duration-200 ease-in-out"
          >
            <img src={Logo} alt="logo"></img>{" "}
            {isSideBarOpen && (
              <span className="ml-2 block lg:hidden md:hidden">Writeonce</span>
            )}
          </Link>
          <div
            className="flex justify-end flex-1 items-center block lg:hidden md:hidden"
            onClick={() => {
              handleClickSidebar()
            }}
          >
            <XIcon className="mt-2 mr-2 h-6 w-6" aria-hidden="true" />
          </div>
        </div>
        <nav className="mt-4">
          <Link
            to={URL_PATH.HOME}
            data-tip="Home"
            className="px-4 py-3 block rounded transition duration-200 hover:bg-blue-700"
          >
            <div className="flex">
              <HomeIcon className="h-7 w-7" />{" "}
              <div
                className={`justify-center px-2 py-1 block lg:hidden md:hidden ${
                  !isSideBarOpen && "hidden"
                }`}
              >
                Home
              </div>
            </div>
          </Link>
          <Link
            to={URL_PATH.DRAFT}
            data-tip="Drafts"
            className="px-4 py-3 block rounded transition duration-200 hover:bg-blue-700"
          >
            <div className="flex">
              <DocumentTextIcon className="h-7 w-7" />
              <div
                className={`justify-center px-2 py-1 block lg:hidden md:hidden ${
                  !isSideBarOpen && "hidden"
                }`}
              >
                Drafts
              </div>
            </div>
          </Link>
          <Link
            to={URL_PATH.BOOKMARKS}
            data-tip="Bookmarks"
            className="px-4 py-3 block rounded transition duration-200 hover:bg-blue-700"
          >
            <div className="flex">
              <BookmarkIcon className="h-7 w-7" />
              <div
                className={`justify-center px-2 py-1 block lg:hidden md:hidden ${
                  !isSideBarOpen && "hidden"
                }`}
              >
                Bookmarks
              </div>
            </div>
          </Link>
        </nav>
        <div className="px-2 mt-auto mb-10 justify-center cursor-pointer">
          {session ? (
            <div
              className="flex lg:justify-center md:justify-center"
              onClick={() => {
                handleLogOut()
              }}
            >
              <LoginIcon className="w-8 h-8" data-tip="Logout" />
              <div className="justify-center px-2 py-1 block lg:hidden md:hidden">
                Log out
              </div>
            </div>
          ) : (
            <div
              className="flex lg:justify-center md:justify-center"
              onClick={() => {
                navigate(URL_PATH.SIGN_IN)
              }}
            >
              <LogoutIcon className="w-8 h-8" data-tip="Login" />
              <div className="justify-center px-2 py-1 block lg:hidden md:hidden">
                Log in
              </div>
            </div>
          )}
        </div>
        <ReactTooltip place="right" effect="float" type="dark" />
      </div>
    </React.Fragment>
  )
}
export default Sidebar
