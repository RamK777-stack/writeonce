import React, { useEffect, useState, useRef, Fragment } from "react";
import typeWritter from "../../../assets/images/writter.jpg";
import feather from "../../../assets/Icons/feather.svg";
import google from "../../../assets/Icons/Google.jpg";
import linkedin from "../../../assets/Icons/in.svg";
import facebook from "../../../assets/Icons/path4.svg";
import github from "../../../assets/Icons/path33.svg";
import { XIcon, ExclamationIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { openModal, closeModal, isModalOpen } from "./AuthSlice";
import { useSelector, useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const open = useSelector(isModalOpen);
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => dispatch(closeModal())}
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
                    <div className="grid grid-cols-2">
                      <div className="absolute top-2 right-2">
                        <XIcon
                          ref={cancelButtonRef}
                          onClick={() => dispatch(closeModal())}
                          className="h-5 w-5 cursor-pointer"
                        />
                      </div>
                      <div className="">
                        <img
                          src={typeWritter}
                          className="w-full rounded-tl-lg rounded-bl-lg"
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
                        <h2 className="text-xl text-center">Connect with</h2>
                        <div className="mt-10">
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
                            placeholder="Enter your email address"
                          />
                          <button
                            class="mt-5 md:mb-0 bg-blue-500 border border-blue-500 px-4 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md
                  hover:shadow-lg hover:bg-blue-600"
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
                            >
                              <img
                                src={google}
                                className="text-center w-full"
                              ></img>
                            </div>
                            <div
                              class="mt-5 md:mb-0 bg-white p-3 text-sm shadow-sm
                   font-medium tracking-wider border bg-gray-800 border-gray-400 text-gray-600
                   rounded-md hover:shadow-lg hover:bg-gray-900 h-12 w-12"
                            >
                              <img src={github} className="text-center"></img>
                            </div>
                            <div
                              class="mt-5 md:mb-0 bg-white p-3 text-sm shadow-sm
                   font-medium tracking-wider border bg-blue-900 border-gray-400 text-gray-600
                   rounded-md hover:shadow-lg hover:bg-blue-800 h-12 w-12"
                            >
                              <img
                                src={linkedin}
                                className="text-center w-full"
                              ></img>
                            </div>
                            <div
                              class="mt-5 md:mb-0 bg-white p-3 text-sm shadow-sm
                   font-medium tracking-wider border bg-blue-700 border-gray-400 text-gray-600
                   rounded-md hover:shadow-lg hover:bg-blue-800 h-12 w-12"
                            >
                              <img
                                src={facebook}
                                className="text-center h-6 w-6"
                              ></img>
                            </div>
                          </div>
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
  );
};

export default Signup;
