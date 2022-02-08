import React from "react"
import ModalWrapper from "./ModalWrapper"

const TweetInput = props => {
  const onSubmit = () => {
    if (props.url) {
      props.embedLink(props.url)
    }
  }
  
  return (
    <ModalWrapper {...props} modalWrapperOpen={props.tweetInputOpen}>
      <div className="p-5 border-gray-200 border-opacity-0 p-2 border-light-blue-500 dark:border-gray-100">
        <label htmlFor="addLink" className="block">
          Add tweet link
        </label>
        <input
          type="text"
          name="addLink"
          id="addLink"
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
          class="mt-5 bg-blue-500 text-white font-bold w-full py-2 rounded-md"
          onClick={() => {
            onSubmit()
          }}
        >
          Embed Tweet
        </button>
      </div>
    </ModalWrapper>
  )
}

export default TweetInput
