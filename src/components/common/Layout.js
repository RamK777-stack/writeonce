import React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import {useRouter} from "next/router"


export const Layout = props => {
  const router = useRouter()

  return (
    <div className="dark:bg-gray-800 dark:text-white flex relative min-h-screen font-sans text-gray-600 subpixel-antialiased">
      <Sidebar {...props} />
      <div className="flex-1">
        <Header {...props} />
        <div
          className={`${
            ["/", "/drafts", "/bookmarks"].includes(router.pathname)
              ? "flex flex-row"
              : ""
          } bg-gray-100 dark:bg-gray-800 min-h-screen`}
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}
