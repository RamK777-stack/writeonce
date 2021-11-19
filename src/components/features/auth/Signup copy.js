import React, { useEffect, useState, useRef } from "react";
import typeWritter from "../../../assets/images/writter.jpg";
import feather from "../../../assets/Icons/feather.svg";
import google from "../../../assets/Icons/Google.jpg";
import linkedin from "../../../assets/Icons/in.svg";
import facebook from "../../../assets/Icons/path4.svg";
import github from "../../../assets/Icons/path33.svg";
import { XIcon } from "@heroicons/react/outline";

const Signup = () => {
  return (
    <div
      class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none 
      focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div class="w-full max-w-2xl relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div class="">
          <div className="grid grid-cols-2">
            <div className="absolute top-2 right-2">
              <XIcon className="h-6 w-6 cursor-pointer"/>
            </div>
            <div className="">
              <img
                src={typeWritter}
                className="w-full rounded-tl-lg rounded-bl-lg"
              />
              <div className="absolute top-10 left-20">
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
                <div className="flex mt-8 space-x-4 cursor-pointer">
                  <div
                    class="mt-5 md:mb-0 bg-white p-3 text-sm shadow-sm 
                   font-medium tracking-wider border border-gray-400 text-gray-600 
                   rounded-md hover:shadow-lg hover:bg-gray-100 h-12 w-12"
                  >
                    <img src={google} className="text-center w-full"></img>
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
                    <img src={linkedin} className="text-center w-full"></img>
                  </div>
                  <div
                    class="mt-5 md:mb-0 bg-white p-3 text-sm shadow-sm 
                   font-medium tracking-wider border bg-blue-700 border-gray-400 text-gray-600 
                   rounded-md hover:shadow-lg hover:bg-blue-800 h-12 w-12"
                  >
                    <img src={facebook} className="text-center h-6 w-6"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
              Cancel
            </button>
            <button class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
              Delete
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
