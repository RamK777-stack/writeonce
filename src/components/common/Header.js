/* This example requires Tailwind CSS v2.0+ */
import {Fragment} from "react"
import {Menu, Transition} from "@headlessui/react"
import {BellIcon, MenuIcon} from "@heroicons/react/outline"
// import Logo from "../../assets/images/feather.svg"
// import newLogo from "../../assets/images/new.png"
import user from "../../assets/images/avatar2.png"
import ThemeToggle from "./ThemeToggle"
// import {Link} from "react-router-dom"
import {URL_PATH} from "../../utils/urlPath"
import {toggleSideBarOpen} from "../features/auth/AuthSlice"
import {useSelector, useDispatch} from "react-redux"
import Link from "next/link"
import Image from "next/image"
import Search from "../features/post/Search"

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const Header = () => {
  const dispatch = useDispatch()
  const isSideBarOpen = useSelector(state => state.auth.isSideBarOpen)

  const handleClickSidebar = () => {
    dispatch(toggleSideBarOpen())
  }

  return (
    <div className="sticky top-0 z-40 text-base dark:bg-slate-800 bg-white">
      <>
        <div className="mx-auto px-3 sm:px-6 ">
          <div className="relative flex items-center justify-between h-16">
            <div
              className={`absolute inset-y-0 left-0 flex items-center lg:hidden md:hidden ${
                isSideBarOpen && "hidden"
              }`}
            >
              {/* Mobile menu button*/}
              <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <MenuIcon
                  className="block h-6 w-6"
                  aria-hidden="true"
                  onClick={() => {
                    handleClickSidebar()
                  }}
                />
              </div>
              {/* <Image src={newLogo} height={30} width={30} className="ml-2" alt="logo" /> */}
            </div>

            <div className="flex-1 lg:flex md:flex w-full right-0 pr-2 sm:static sm:inset-auto">
              <div className="hidden lg:block md:block lg:flex-1 md:flex-1 ml-20 lg:ml-5 lg:mr-5 md:ml-5 md:mr-5 mr-2">
                <Search />
              </div>
              <div className="flex justify-end">
                <Link href={URL_PATH.POST}>
                  <button className="hidden lg:block md:block py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 drop-shadow-md text-white font-bold rounded mr-5">
                    Write an article
                  </button>
                </Link>
                <ThemeToggle />
                <button className="mt-1 h-8 mr-2 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative z-10 mt-1">
                  {({open}) => (
                    <>
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={user}
                            width={35}
                            height={35}
                            alt="user profile"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({active}) => (
                              <div
                                className={`cursor-pointer ${classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}`}
                              >
                                Your Profile
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({active}) => (
                              <div
                                className={`cursor-pointer ${classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}`}
                              >
                                <Link href={URL_PATH.POST}>
                                  Write an article
                                </Link>
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({active}) => (
                              <div
                                className={`cursor-pointer ${classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}`}
                              >
                                Settings
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({active}) => (
                              <div
                                className={`cursor-pointer ${classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}`}
                              >
                                Sign out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
export default Header
