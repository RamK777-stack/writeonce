import React from "react";
import noDraftImage from "../../../assets/images/noblog.png";
import noDraftImageDark from "../../../assets/images/noblogdark4.png";

export default function NoItemsFound({ content, onClickHandler, buttonText }) {
  return (
    <div className="text-center w-3/4 text-gray-500 -mt-5">
      <img className="h-80 w-80 m-auto dark:hidden" src={noDraftImage} />
      <img
        className="h-80 w-80 m-auto hidden dark:block"
        src={noDraftImageDark}
      />
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
