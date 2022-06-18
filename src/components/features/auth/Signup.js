import React, {useState, useRef, Fragment} from "react"
import google from "../../../assets/Icons/Google.jpg"
import linkedin from "../../../assets/Icons/in.svg"
import facebook from "../../../assets/Icons/path4.svg"
import github from "../../../assets/Icons/path33.svg"
import {XIcon} from "@heroicons/react/outline"
import {Dialog, Transition} from "@headlessui/react"
import {isModalOpen, loginUsingLink} from "./AuthSlice"
import {useSelector, useDispatch} from "react-redux"
import Image from 'next/image'

const Signup = ({renderAsPage, goBack}) => {
  const dispatch = useDispatch()
  const isOpen = useSelector(isModalOpen)
  const open = renderAsPage ? true : isOpen
  const cancelButtonRef = useRef(null)
  const [email, setEmail] = useState("")
  const [emailSentStatus, setEmailSentStatus] = useState()

  const handleClickSend = async () => {
    try {
      const result = await dispatch(loginUsingLink(email)).unwrap()
      if (result) {
        setEmailSentStatus("Magic link sent to your email.")
        setEmail("")
      }
    } catch (e) {
      setEmailSentStatus(e.message || "Unable to send email")
    }
  }

  const onClickGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/connect/google`
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => goBack()}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden 
            shadow-xl transform transition-all lg:max-w-3xl 
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white">
                <div className="sm:flex sm:items-start">
                  <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
                      <div className="absolute top-2 right-2">
                        {/* {!renderAsPage && ( */}
                          <XIcon
                            ref={cancelButtonRef}
                            onClick={() => goBack()}
                            className="h-5 w-5 cursor-pointer"
                          />
                        {/* )} */}
                      </div>
                      <div className="hidden lg:block md:block">
                        <Image
                          src="/writter-min.jpg"
                          className="w-full rounded-tl-lg rounded-bl-lg"
                          alt="poster"
                          height={450}
                          width={300}
                          layout="responsive"
                        />
                        <div className="absolute top-10 left-24 m-auto text-gray-600">
                          <h2 className="text-lg text-center ml-1">
                            THERE IS NO <br />
                            <i className="font-bold">RIGHT OR WRONG</i>
                            <p className="font-bold">JUST WRITE</p>
                            <br />
                          </h2>
                        </div>
                      </div>
                      <div className="p-10 w-full">
                        <h2 className="text-xl text-center">Connect with us</h2>
                        <div className="mt-10">
                          {emailSentStatus && (
                            <div className="flex border-blue-600 mb-5 p-2 border-l-2 bg-blue-300">
                              <p className="text text-blue-900 flex-1">
                                {emailSentStatus}
                              </p>
                              <XIcon
                                className="h-4 w-4 cursor-pointer m-auto"
                                onClick={() => {
                                  setEmailSentStatus()
                                }}
                              />
                            </div>
                          )}
                          <label
                            class="block text-gray-700 text-sm font-bold mb-2"
                            for="username"
                          >
                            Connect using magic link
                          </label>
                          <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={email}
                            onChange={e => {
                              setEmail(e.target.value)
                            }}
                            required
                            placeholder="Enter your email address"
                          />
                          <button
                            class="mt-5 md:mb-0 bg-blue-500 border border-blue-500 px-4 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md
                  hover:shadow-lg hover:bg-blue-600"
                            onClick={() => {
                              handleClickSend()
                            }}
                          >
                            Submit
                          </button>
                          <p className="text-center text-medium font-bold text-gray-800 mt-8">
                            or
                          </p>
                          <div className="flex justify-center mt-8 space-x-4 cursor-pointer">
                            <div
                              class="mt-5 md:mb-0 bg-white p-3 text-sm shadow-sm
                   font-medium tracking-wider border border-gray-400 text-gray-600
                   rounded-md hover:shadow-lg hover:bg-gray-100 h-12 w-12"
                              onClick={() => {
                                onClickGoogle()
                              }}
                            >
                              <Image
                                src={google}
                                className="text-center w-full"
                                alt="google"
                              />
                            </div>
                            <div
                              class="mt-5 md:mb-0 p-3 text-sm shadow-sm
                   font-medium tracking-wider border bg-gray-800 border-gray-400 text-gray-600
                   rounded-md hover:shadow-lg hover:bg-gray-900 h-12 w-12"
                            >
                              <Image
                                src={github}
                                className="text-center w-full"
                                alt="github"
                              />
                            </div>
                            <div
                              class="mt-5 md:mb-0 bg-white p-3 text-sm shadow-sm
                   font-medium tracking-wider border bg-blue-900 border-gray-400 text-gray-600
                   rounded-md hover:shadow-lg hover:bg-blue-800 h-12 w-12"
                            >
                              <Image
                                src={linkedin}
                                className="text-center w-full"
                                alt="linkedin"
                              />
                            </div>
                            <div
                              class="mt-5 md:mb-0 bg-white p-3 space-x-1 text-sm shadow-sm
                   font-medium tracking-wider border bg-blue-700 border-gray-400 text-gray-600
                   rounded-md hover:shadow-lg hover:bg-blue-800 h-12 w-12 flex justify-center"
                            >
                              <Image
                                src={facebook}
                                className="text-center h-6 w-6"
                                alt="facebook"
                              />
                            </div>
                          </div>
                          {renderAsPage && (
                            <div
                              className="text-center text-medium text-blue-600 mt-8 cursor-pointer"
                              onClick={() => goBack()}
                            >
                              Go back
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Signup
