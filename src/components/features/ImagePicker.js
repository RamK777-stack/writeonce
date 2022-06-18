import React, {useEffect, useState} from "react"
import ModalWrapper from "./ModalWrapper"
import {Tab} from "@headlessui/react"
import {CloudUploadIcon} from "@heroicons/react/outline"
import {useSelector, useDispatch} from "react-redux"
import {getUnsplashImages} from "./post/postSlice"

const ImagePicker = props => {
  const [query, setQuery] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUnsplashImages({query}))
  }, [dispatch, query])

  const images = useSelector(state => state.post.unsplashImages)

  // const onSubmit = () => {
  //   if (props.url) {
  //     props.embedLink(props.url)
  //   }
  // }

  return (
    <ModalWrapper {...props} modalWrapperOpen={props.imagePickerOpen}>
      <Tab.Group>
        <Tab.List className="sticky top-0">
          <div class="dark:bg-slate-900 dark:border-gray-700 bg-white">
            <Tab>
              {({selected}) => (
                <button
                  class={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 ${
                    selected && "border-blue-400"
                  }`}
                >
                  Upload
                </button>
              )}
            </Tab>
            <Tab>
              {({selected}) => (
                <button
                  class={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 ${
                    selected && "border-blue-400"
                  }`}
                >
                  Unsplash
                </button>
              )}
            </Tab>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <p class="text-sm text-gray-500 dark:text-gray-400 p-5 flex justify-center mb-5">
              <label
                for="File-For"
                className="cursor-pointer flex justify-center dark:bg-blue-900 font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 px-6 rounded"
              >
                Choose Image <CloudUploadIcon className="ml-3 h-4 w-4 mt-1" />
              </label>
              <input
                id="File-For"
                type="file"
                className="hidden"
                onChange={e => props.onSelectImage(e)}
              />
            </p>
          </Tab.Panel>
          <Tab.Panel>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              <div className="flex justify-center">
                <input
                  type="text"
                  className="bg-gray-200 rounded b-0 border-gray-100 w-full m-2"
                  placeholder="Search for image"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                ></input>
              </div>
              <div className="grid grid-flow-row grid-cols-3 p-2 gap-4 ">
                {images.map(item => (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      props.onSelectImage(item.links?.download)
                    }}
                  >
                    <img
                      className="rounded h-28 w-full object-cover"
                      src={item.urls?.thumb}
                      alt="thumb"
                    />
                  </div>
                ))}
              </div>
            </p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </ModalWrapper>
  )
}

export default ImagePicker
