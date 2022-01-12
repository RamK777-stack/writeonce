import React, {useEffect, useState, useRef} from "react"
import ModalWrapper from "./ModalWrapper"
import {Tab, Transition} from "@headlessui/react"
import {CloudUploadIcon} from "@heroicons/react/outline"

const ImagePicker = props => {
  const onSubmit = () => {
    if (props.url) {
      props.embedLink(props.url)
    }
  }

  return (
    <ModalWrapper {...props} modalWrapperOpen={props.imagePickerOpen}>
      <Tab.Group>
        <Tab.List className="sticky top-0">
          <div class="mb-4 border-b border-gray-200 dark:border-gray-700 bg-white">
            <Tab>
              {({selected}) => (
                <button
                  class={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 ${
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
                  class={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 ${
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
              <button className="flex justify-center dark:bg-blue-700 bg-blue-500 text-white font-bold py-2 px-6 rounded">
                Choose image <CloudUploadIcon className="ml-3 h-4 w-4 mt-1" />
              </button>
            </p>
          </Tab.Panel>
          <Tab.Panel>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              <div className="flex justify-center">
                <input
                  type="text"
                  className="bg-gray-200 rounded b-0 border-gray-100 w-full m-2"
                  placeholder="Search for image"
                ></input>
              </div>
              <div className="grid grid-flow-row grid-cols-3 p-2 gap-4 ">
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1450149632596-3ef25a62011a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDN8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDJ8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1429041966141-44d228a42775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDF8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1450149632596-3ef25a62011a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDN8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDJ8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1429041966141-44d228a42775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDF8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDJ8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1429041966141-44d228a42775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDF8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDJ8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1429041966141-44d228a42775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDF8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDJ8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1429041966141-44d228a42775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDF8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDJ8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
                <div>
                  <img
                    className="rounded w-100 h-100"
                    src="https://images.unsplash.com/photo-1429041966141-44d228a42775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzkyMXwwfDF8c2VhcmNofDF8fGJyaWRnZXN8ZW58MHx8fHwxNjQxODU4NTU4&ixlib=rb-1.2.1&q=80&w=200"
                  />
                </div>
              </div>
            </p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </ModalWrapper>
  )
}

export default ImagePicker
