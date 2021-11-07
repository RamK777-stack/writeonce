import React from "react";

export default function Search() {
  return (
    <div className="relative lg:w-3/4 text-gray-600 focus-within:text-gray-400">
      <input
        id="candidates"
        type="search"
        name="search"
        placeholder="Quick search for post     Ctrl + K"
        className="dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-3xl h-10 w-full text-gray-600 border-gray-300 rounded"
      />
    </div>
  );
}
