import React, {useEffect, useState, useRef} from "react"

const TweetInput = props => {
  const x = props.position.x + 25
  const y = props.position.y + 25
  const positionAttributes = {top: y, left: x}

  const closeHandler = e => {
    console.log(document.getElementById("tweetInput"))
    console.log(e.target)
    console.log(document.getElementById("tweetInput").contains(e.target))
    if (document.getElementById("tweetInput").contains(e.target)) {
      // Clicked in box
      console.log("inside box", props.tweetInputOpen)
    } else {
      // Clicked outside the box
      props.close()
      console.log("outside box", props.tweetInputOpen)
    }
  }

  useEffect(() => {
    if (props.tweetInputOpen) {
      document.addEventListener("click", closeHandler)
      return () => {
        document.removeEventListener("click", closeHandler)
      }
    }
  }, [props.tweetInputOpen])

  const onSubmit = () => {
    if (props.url) {
      props.embedLink(props.url)
    }
  }

  return (
    <div id="tweetInput">
      <div
        className={`absolute h-auto w-80 flex flex-col justify-end`}
        style={positionAttributes}
      >
        <div
          className={`SelectMenu dark:bg-gray-700 w-80 h-auto min-h-min overflow-y-auto ${
            !props.tweetInputOpen && "hidden"
          }`}
        >
          <div className="p-5 border-gray-200 border-opacity-0 p-2 border-light-blue-500 dark:border-gray-100">
            <label htmlFor="first-name" className="block text-gray-700">
              Add tweet link
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              value={props.url}
              onChange={e => {
                props.onChangeURL(e.target.value)
              }}
              onKeyDown={e => {
                if (e.code === "Enter") {
                  onSubmit()
                }
              }}
              placeholder="https://twitter.com/profile/status/..."
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <button
              class="mt-5 bg-blue-500 text-white font-bold w-full py-1 px-4 rounded"
              onClick={() => {
                onSubmit()
              }}
            >
              Embed Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetInput
