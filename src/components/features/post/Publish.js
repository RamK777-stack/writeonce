import React, {useState, useEffect} from "react"
import {XIcon} from "@heroicons/react/outline"
import {useDispatch, useSelector} from "react-redux"
import CreatableSelect from "react-select/creatable"
import {getHashtag, saveHashtag} from "../post/postSlice"
import makeAnimated from "react-select/animated"

const animatedComponents = makeAnimated()

export default function Publish({savePost}) {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState()

  useEffect(() => {
    dispatch(getHashtag())
  }, [])

  const hashtags = useSelector(state => state.post.hashtags)

  const handleCreate = async (inputValue) => {
    console.log(inputValue, "New value")
    setIsLoading(true)
    await dispatch(saveHashtag(inputValue))
    setIsLoading(false)
    // setTimeout(() => {
      // const {options} = this.state
      // const newOption = createOption(inputValue)
      // console.log(newOption)
      // setIsLoading(false)
      // this.setState({
      //   isLoading: false,
      //   options: [...options, newOption],
      //   value: newOption,
      // })
    // }, 1000)  }
  }

  const handleChange = value => {
    console.log(value, "handleChange")
    setSelectedTags(value)
  }

  const handleInputChange = value => {
    console.log(value, "handleInputChange")
  }

  const handleSavePost = isDraft => {
    const hashTags = selectedTags.map(i => i.id)
    savePost(isDraft, hashTags)
  }

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
                <label
                  htmlFor="comments"
                  className="font-medium text-gray-700 dark:text-white"
                >
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
                <label
                  htmlFor="offers"
                  className="font-medium text-gray-700 dark:text-white"
                >
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
                <label
                  htmlFor="ownblog"
                  className="font-medium text-gray-700 dark:text-white"
                >
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
            <div class="pt-2 pr-2 mx-auto text-gray-600">
              <div className="">
                <CreatableSelect
                  className="dark:text-gray-100 dark:bg-gray-900 text-sm focus:outline-none"
                  // value={selectedOption}
                  onChange={handleChange}
                  options={hashtags || []}
                  isMulti={true}
                  isLoading={isLoading}
                  onCreateOption={handleCreate}
                  onInputChange={handleInputChange}
                  components={animatedComponents}
                  isSearchable
                  isClearable
                  getOptionValue={option => option.id}
                />
              </div>
            </div>
          </div>
          <div class="my-3 flex flex-row gap-2 flex-wrap">
            {/* <button class="inline-flex flex-none p-2 items-center px-2 text-xs dark:bg-blue-900 dark:text-white bg-blue-200 w-auto text-blue-600 font-bold rounded-full">
              <span className="ml-2">Nodejs</span>
              <XIcon
                className="h-4 w-4 z-40 dark:text-blue-300 text-blue-500 ml-2"
                aria-hidden="true"
              />
            </button> */}
            {/* <button class="inline-flex flex-none p-2 items-center px-2 text-xs dark:bg-blue-900 dark:text-white bg-blue-200 w-auto text-blue-600 font-bold rounded-full">
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
            </button> */}
          </div>
        </fieldset>
        <button
          class="mt-5 dark:bg-blue-900  bg-blue-500 text-white font-bold py-2 px-6 rounded"
          onClick={() => handleSavePost(false)}
        >
          Publish
        </button>
        <button
          class="mt-5 dark:bg-gray-700 bg-gray-500 text-white font-bold py-2 px-6 rounded ml-2"
          onClick={() => handleSavePost(true)}
        >
          Save as Draft
        </button>
      </div>
    </div>
  )
}
