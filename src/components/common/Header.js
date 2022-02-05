/* This example requires Tailwind CSS v2.0+ */
import {Fragment} from "react"
import {Menu, Transition} from "@headlessui/react"
import {BellIcon, MenuIcon} from "@heroicons/react/outline"
import Logo from "../../assets/images/feather.svg"
import user from "../../assets/images/user.png"
import ThemeToggle from "./ThemeToggle"
import {Link} from "react-router-dom"
import {URL_PATH} from "../../utils/urlPath"
import {toggleSideBarOpen} from "../features/auth/AuthSlice"
import {useSelector, useDispatch} from "react-redux"

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
    <div className="text-base dark:bg-gray-800 bg-gray-100 mb-10">
      <>
        <div className="mx-auto px-3 sm:px-6">
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
              <img src={Logo} className="ml-2" alt="logo"></img>
            </div>
            <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link
                to={URL_PATH.POST}
                className="hidden lg:block md:block py-2 px-4 bg-gray-600 text-white font-bold rounded mr-5"
              >
                Write an article
              </Link>
              <ThemeToggle />
              <button className="h-8 mr-2 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative z-10">
                {({open}) => (
                  <>
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user}
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
                            <Link
                              className={`cursor-pointer ${classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}`}
                              to={URL_PATH.POST}
                            >
                              Write an article
                            </Link>
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
      </>
    </div>
  )
}
export default Header
