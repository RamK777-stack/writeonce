/* This example requires Tailwind CSS v2.0+ */
import React, {useEffect, useState} from "react"
import {
  HomeIcon,
  BookmarkIcon,
  DocumentTextIcon,
  LoginIcon,
  LogoutIcon,
  XIcon,
} from "@heroicons/react/outline"
import Logo from "../../assets/images/feather.svg"
import {URL_PATH} from "../../utils/urlPath"
import {logOut, toggleSideBarOpen} from "../features/auth/AuthSlice"
import SecureLS from "secure-ls"
import {pageViewAnalytics} from "../../utils/index"
import {useSelector, useDispatch} from "react-redux"
import {useRouter} from "next/router"
import Image from "next/image"
import {Popover, Transition} from "@headlessui/react"

const Sidebar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isSideBarOpen = useSelector(state => state.auth.isSideBarOpen)
  const [session, setSession] = useState()

  useEffect(() => {
    const ls = new SecureLS()
    setSession(ls.get("userSession"))
  }, [])

  const handleLogOut = () => {
    logOut()
    router.push(URL_PATH.HOME)
  }

  useEffect(() => {
    pageViewAnalytics(router.pathname + router.query)
    // ReactGA.pageview(location.pathname + location.search)
  }, [router])

  const handleClickSidebar = () => {
    dispatch(toggleSideBarOpen())
  }

  return (
    <React.Fragment>
      <div
        className={`fixed lg:sticky md:sticky z-50 h-screen dark:bg-slate-900 bg-blue-800 lg:w-16 md:w-16 text-blue-100 px-1 z-10 inset-y-0 transform
        lg:flex md:flex flex-col justify-start md:translate-x-0 transition duration-200 ease-in-out ${
      !isSideBarOpen ? "-translate-x-full w-16 ease-in-out" : "w-64 ease-in-out"
    }`}
      >
        <div className="flex items-center">
          <div
            onClick={() => {
              router.push(URL_PATH.HOME)
            }}
            className="cursor-pointer flex items-center spacing-x-2 py-2.5 px-4 mt-5 transition duration-200 ease-in-out"
          >
            <Image src={Logo} alt="logo" />
            {isSideBarOpen && (
              <span className="ml-2 block lg:hidden md:hidden">Writeonce</span>
            )}
          </div>
          <div
            className="flex justify-end flex-1 items-center block lg:hidden md:hidden"
            onClick={() => {
              handleClickSidebar()
            }}
          >
            <XIcon className="mt-2 mr-2 h-6 w-6" aria-hidden="true" />
          </div>
        </div>
        <nav className="mt-4 justify-center">
          <div
            className="flex lg:justify-center md:justify-center items-center py-2 group hover:scale-105"
            onClick={() => {
              router.push(URL_PATH.HOME)
            }}
          >
            <Popover className="flex relative">
              <Popover.Button>
                <HomeIcon className="p-2 h-11 w-11 block rounded-lg transition duration-200 hover:bg-blue-700" />
              </Popover.Button>
              <Transition
                show={true}
                className="group-hover:block hidden"
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute ml-3 mt-2 mt-2 bg-slate-500 shadow-lg p-2 rounded text-sm">
                  Home
                </Popover.Panel>
              </Transition>
            </Popover>
            <div
              className={`justify-center px-2 py-1 block lg:hidden md:hidden ${
                !isSideBarOpen && "hidden"
              }`}
            >
              Home
            </div>
          </div>
          <div
            className="flex lg:justify-center md:justify-center items-center py-2 group hover:scale-105"
            onClick={() => {
              router.push(URL_PATH.DRAFT)
            }}
          >
            <Popover className="flex relative">
              <Popover.Button>
                <DocumentTextIcon className="p-2 h-11 w-11 block rounded-lg transition duration-200 hover:bg-blue-700" />
              </Popover.Button>

              <Transition
                show={true}
                className="group-hover:block hidden"
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute ml-3 mt-2 bg-slate-500 shadow-lg p-2 rounded text-sm">
                  Drafts
                </Popover.Panel>
              </Transition>
            </Popover>
            <div
              className={`justify-center px-2 py-1 block lg:hidden md:hidden ${
                !isSideBarOpen && "hidden"
              }`}
            >
              Drafts
            </div>
          </div>
          <div
            className="flex lg:justify-center md:justify-center items-center py-2 group hover:scale-105"
            onClick={() => {
              router.push(URL_PATH.BOOKMARKS)
            }}
          >
            <Popover className="flex relative">
              <Popover.Button>
                <BookmarkIcon className="p-2 h-11 w-11 block rounded-lg transition duration-200 hover:bg-blue-700" />
              </Popover.Button>

              <Transition
                show={true}
                className="group-hover:block hidden"
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute ml-3 mt-2 bg-slate-500 shadow-lg p-2 rounded text-sm">
                  Bookmarks
                </Popover.Panel>
              </Transition>
            </Popover>
            <div
              className={`justify-center px-2 py-1 block lg:hidden md:hidden ${
                !isSideBarOpen && "hidden"
              }`}
            >
              Bookmarks
            </div>
          </div>
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
              className="flex lg:justify-center md:justify-center mt-3"
              onClick={() => {
                router.push(URL_PATH.SIGN_IN)
              }}
            >
              <LogoutIcon className="w-8 h-8" data-tip="Login" />
              <div className="justify-center px-2 py-1 block lg:hidden md:hidden">
                Log in
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}
export default Sidebar
