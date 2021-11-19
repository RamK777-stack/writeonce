/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
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
} from "@heroicons/react/outline";
import Logo from "../../assets/images/feather.svg";
import Home from "../../assets/images/Home.svg";
import Post from "../../assets/images/Post.svg";
import Tag from "../../assets/images/Tag.svg";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { URL_PATH } from "../../utils/urlPath";
import { openModal, closeModal } from "../features/auth/AuthSlice";
import { useDispatch } from "react-redux";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="fixed dark:bg-gray-900 bg-blue-800 text-blue-100 w-16 px-1 
     inset-y-0 transform -translate-x-full 
    flex flex-col justify-start md:translate-x-0 transition duration-200 ease-in-out"
    >
      <a
        href="#"
        className="items-center spacing-x-2 py-2.5 px-4 mt-5 transition duration-200 ease-in-out"
      >
        <Link to={URL_PATH.HOME}>
          <img src={Logo}></img>
        </Link>
      </a>
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
        <LoginIcon
          className="w-8 h-8"
          onClick={() => {
            dispatch(openModal());
          }}
        />
      </div>
      <ReactTooltip place="right" effect="float" />
    </div>
  );
};
export default Sidebar;
