import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { savePost } from "./postSlice";
import { useDispatch } from "react-redux";

export default function Publish() {
  const dispatch = useDispatch();
  return (
    <div className="dark:text-white">
      <p>Publish to</p>
      <div className="flex-none">
        <fieldset>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700 dark:text-white">
                  Medium
                </label>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="candidates"
                  name="candidates"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="candidates"
                  className="font-medium text-gray-700 dark:text-white"
                >
                  dev.to
                </label>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="offers"
                  name="offers"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="offers" className="font-medium text-gray-700 dark:text-white">
                  hashnode
                </label>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="ownblog"
                  name="ownblog"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="ownblog" className="font-medium text-gray-700 dark:text-white">
                  My Blog
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="mt-5">
          <legend className="text-base font-medium text-gray-900 dark:text-white">
            Hash tags
          </legend>
          <div className="mt-1 space-y-4">
            <div class="pt-2 relative mx-auto text-gray-600">
              <div className="absolut">
                <input
                  class="border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-900 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div class="my-3 flex flex-row gap-2 flex-wrap">
            <button class="inline-flex flex-none p-2 items-center px-2 text-xs dark:bg-blue-900 dark:text-white bg-blue-200 w-auto text-blue-600 font-bold rounded-full">
              <span className="ml-2">Nodejs</span>
              <XIcon
                className="h-4 w-4 z-40 dark:text-blue-300 text-blue-500 ml-2"
                aria-hidden="true"
              />
            </button>
            <button class="inline-flex flex-none p-2 items-center px-2 text-xs dark:bg-blue-900 dark:text-white bg-blue-200 w-auto text-blue-600 font-bold rounded-full">
              <span className="ml-2">Reactjs</span>
              <XIcon
                className="h-4 w-4 z-40 dark:text-blue-300 text-blue-500 ml-2"
                aria-hidden="true"
              />
            </button>
            <button class="inline-flex flex-none p-2 items-center px-2 text-xs dark:bg-blue-900 dark:text-white bg-blue-200 w-auto text-blue-600 font-bold rounded-full">
              <span className="ml-2">Nextjs</span>
              <XIcon
                className="h-4 w-4 z-40 dark:text-blue-300 text-blue-500 ml-2"
                aria-hidden="true"
              />
            </button>
            <button class="inline-flex flex-none p-2 items-center px-2 text-xs dark:bg-blue-900 dark:text-white bg-blue-200 w-auto text-blue-600 font-bold rounded-full">
              <span className="ml-2">Electron</span>
              <XIcon
                className="h-4 w-4 z-40 dark:text-blue-300 text-blue-500 ml-2"
                aria-hidden="true"
              />
            </button>
          </div>
        </fieldset>
        <button
          class="mt-5 dark:bg-blue-900 bg-blue-500 text-white font-bold py-2 px-6 rounded"
          onClick={() => {
            dispatch(savePost());
          }}
        >
          Publish
        </button>
        <button class="mt-5 dark:bg-gray-700 bg-gray-500 text-white font-bold py-2 px-6 rounded ml-2">
          Save as Draft
        </button>
      </div>
    </div>
  );
}
