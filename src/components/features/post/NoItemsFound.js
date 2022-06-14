import React from "react";
import noDraftImage from "../../../assets/images/noblog.png";
import Image from 'next/image'

export default function NoItemsFound({ content, onClickHandler, buttonText }) {
  return (
    <div className="text-center w-full lg:w-3/4 md:w-3/4 text-gray-500 -mt-5">
      <Image height={320} width={320} className="h-80 w-80 m-auto dark:hidden" src={noDraftImage} alt="no draft" />
      {/* <Image
        className="h-80 w-80 m-auto hidden dark:block"
        src={noDraftImageDark}
        alt="no draft" 
      /> */}
      <h1 className="text-2xl">{content}</h1>
      <button
        className="mt-5 items-center px-5 py-1 text-xl border-2 dark:border border-blue-300 dark:border-blue-400
        hover:bg-blue-500 dark:hover:bg-gray-700 dark:text-gray-300 hover:text-white text-gray-600 font-bold rounded-full"
        onClick={() => {
          onClickHandler();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
