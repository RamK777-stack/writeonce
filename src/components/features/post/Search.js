import React from "react"

export default function Search(props) {
  return (
    <div className="justify-center items-center text-gray-600 focus-within:text-gray-400">
      <input
        id="candidates"
        type="search"
        name="search"
        placeholder="Quick search for post     Ctrl + K"
        className="dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-3xl h-10 w-full text-gray-600 border-gray-300 rounded"
        // onChange={e => props.onChange(e.target.value)}
      />
    </div>
  )
}
