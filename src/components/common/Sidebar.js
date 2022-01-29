/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useEffect} from "react"
import {Disclosure, Menu, Transition} from "@headlessui/react"
import {
  BellIcon,
  MenuIcon,
  XIcon,
  AnnotationIcon,
  ClipboardIcon,
  HomeIcon,
  BookmarkIcon,
  DocumentTextIcon,
  LoginIcon,
  LogoutIcon,
} from "@heroicons/react/outline"
import Logo from "../../assets/images/feather.svg"
import ReactTooltip from "react-tooltip"
import {Link} from "react-router-dom"
import {URL_PATH} from "../../utils/urlPath"
import {openModal, closeModal, logOut} from "../features/auth/AuthSlice"
import {useDispatch} from "react-redux"
import {useNavigate, useLocation} from "react-router-dom"
import SecureLS from "secure-ls"
import { pageViewAnalytics } from '../../utils/index'

const ls = new SecureLS()

const navigation = [
  {name: "Dashboard", href: "#", current: true},
  {name: "Team", href: "#", current: false},
  {name: "Projects", href: "#", current: false},
  {name: "Calendar", href: "#", current: false},
]

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let location = useLocation();

  const session = ls.get("userSession")

  const handleLogOut = () => {
    logOut()
    navigate(URL_PATH.HOME)
  }

  useEffect(() => {
    console.log(location.pathname, location.search)
    pageViewAnalytics(location.pathname + location.search)
    // ReactGA.pageview(location.pathname + location.search)
  }, [location])

  return (
    <div
      className="fixed dark:bg-gray-900 bg-blue-800 text-blue-100 w-16 px-1 
     inset-y-0 transform -translate-x-full 
    flex flex-col justify-start md:translate-x-0 transition duration-200 ease-in-out"
    >
      <Link
        to={URL_PATH.HOME}
        className="items-center spacing-x-2 py-2.5 px-4 mt-5 transition duration-200 ease-in-out"
      >
        <img src={Logo}></img>
      </Link>
      <nav className="mt-4">
        <Link
          to={URL_PATH.HOME}
          data-tip="Home"
          className="px-4 py-3 block rounded transition duration-200 hover:bg-blue-700"
        >
          <HomeIcon className="h-7 w-7" />
        </Link>
        <Link
          to={URL_PATH.DRAFT}
          data-tip="Drafts"
          className="px-4 py-3 block rounded transition duration-200 hover:bg-blue-700"
        >
          <DocumentTextIcon className="h-7 w-7" />
        </Link>
        <Link
          to={URL_PATH.BOOKMARKS}
          data-tip="Bookmarks"
          className="px-4 py-3 block rounded transition duration-200 hover:bg-blue-700"
        >
          <BookmarkIcon className="h-7 w-7" />
        </Link>
      </nav>
      <div className="flex mt-auto mb-10 justify-center cursor-pointer">
        {session ? (
          <LoginIcon
            className="w-8 h-8"
            data-tip="Logout"
            onClick={() => {
              handleLogOut()
            }}
          />
        ) : (
          <LogoutIcon
            className="w-8 h-8"
            data-tip="Login"
            onClick={() => {
              navigate(URL_PATH.SIGN_IN)
            }}
          />
        )}
      </div>
      <ReactTooltip place="right" effect="float" type="dark" />
    </div>
  )
}
export default Sidebar
