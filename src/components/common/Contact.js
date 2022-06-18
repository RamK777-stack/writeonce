import React from "react"
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineCopyrightCircle,
} from "react-icons/ai"
import {FaDiscord} from "react-icons/fa"

export default function Contact() {
  const redirectionLink = url => {
    window.open(url)
  }

  return (
    <div className="hidden lg:block dark:bg-gray-700 dark:text-white mt-10 bg-white rounded drop-shadow-lg p-8 h-56 w-auto">
      <div className="flex flex-row space-x-5 items-center cursor-pointer">
        <AiOutlineTwitter
          className="h-10 w-10 dark:bg-blue-400 bg-blue-50 rounded-full p-2"
          onClick={() => redirectionLink("https://twitter.com/once_write")}
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
  )
}
