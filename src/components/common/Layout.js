import React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineCopyrightCircle,
} from "react-icons/ai"
import {FaDiscord} from "react-icons/fa"
import {useRouter} from "next/router"

const redirectionLink = url => {
  // https://discord.gg/38wfmggnFs
  window.open(url)
}

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
          }`}
        >
          {props.children}
          {typeof window !== "undefined" &&
            ["/", "/drafts", "/bookmarks"].includes(router.pathname) && (
              <div className="hidden lg:block dark:bg-gray-700 dark:text-white mt-20 bg-white rounded drop-shadow-lg p-8 h-56 w-auto mr-10">
                <div className="flex flex-row space-x-5 items-center cursor-pointer">
                  <AiOutlineTwitter
                    className="h-10 w-10 dark:bg-blue-400 bg-blue-50 rounded-full p-2"
                    onClick={() =>
                      redirectionLink("https://twitter.com/once_write")
                    }
                  />
                  <FaDiscord
                    className="h-10 w-10 dark:bg-blue-400 bg-blue-50 rounded-full p-2 "
                    onClick={() => {
                      redirectionLink("https://discord.gg/38wfmggnFs")
                    }}
                  />
                  <AiOutlineInstagram className="h-10 w-10 dark:bg-blue-400 bg-blue-50 rounded-full p-2" />
                  <AiOutlineMail className="h-10 w-10 dark:bg-blue-400 bg-blue-50 rounded-full p-2" />
                </div>
                <hr className="mt-5" />
                <div className="flex mt-5 gap-12 text-sm">
                  <div>
                    <p className="hover:bg-gray-100 hover:rounded cursor-pointer p-1">
                      About
                    </p>
                    <p className="hover:bg-gray-100 hover:rounded cursor-pointer p-1">
                      Contact us
                    </p>
                  </div>
                  <div>
                    <p className="hover:bg-gray-100 hover:rounded cursor-pointer p-1">
                      Terms of use
                    </p>
                    <p className="hover:bg-gray-100 hover:rounded cursor-pointer p-1">
                      Privacy policy
                    </p>
                  </div>
                </div>
                <div className="flex text-sm mt-3">
                  <AiOutlineCopyrightCircle className="h-5 w-5 mr-1" />
                  2022 writeonce
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
