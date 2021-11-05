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
} from "@heroicons/react/outline";
import Logo from "../../assets/images/feather.svg";
import Home from "../../assets/images/Home.svg";
import Post from "../../assets/images/Post.svg";
import Tag from "../../assets/images/Tag.svg";
import ReactTooltip from 'react-tooltip';

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
  return (
    <div className="dark:bg-gray-900 dark:border-r dark:border-red-800 bg-blue-800 text-blue-100 w-18 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <a
        href="#"
        className="flex items-center spacing-x-2 py-2.5 px-4 mt-5 transition duration-200 ease-in-out"
      >
        <img src={Logo} classNam=""></img>
      </a>
      <nav className="mt-4">
        <a
          href="#"
          data-tip="Home"
          className="px-4 py-3 block rounded transition duration-200 hover:bg-blue-700"
        >
          <HomeIcon className="h-7 w-7" />
        </a>
        <a
          href="#"
          data-tip="Drafts"
          className="px-4 py-3 block rounded transition duration-200 hover:bg-blue-700"
        >
          <DocumentTextIcon className="h-7 w-7" />
        </a>
        <a
          href="#"
          data-tip="Bookmarks"
          className="px-4 py-3 block rounded transition duration-200 hover:bg-blue-700"
        >
          <BookmarkIcon className="h-7 w-7" />
        </a>
      </nav>
      <ReactTooltip place="right" effect="float"/>
    </div>
  );
};
export default Sidebar;
