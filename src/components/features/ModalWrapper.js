import React, {useEffect, useState, useRef} from "react"

const ModalWrapper = props => {

  const x = props.position.x + 25
  const y = props.position.y + 25
  const positionAttributes = {top: y, left: x}

  const closeHandler = e => {
    
    if (
      document.getElementById(`ModalWrapper-${props.id}`).contains(e.target)
    ) {
      // Clicked in box
    } else {
      // Clicked outside the box
      props.close()
    }
  }

  useEffect(() => {
    if (props.modalWrapperOpen) {
      document.addEventListener("click", closeHandler)
      return () => {
        document.removeEventListener("click", closeHandler)
      }
    }
  }, [props.modalWrapperOpen])

  const getSize = size => {
    switch (size) {
      case "md":
        return "w-96"
      case "lg":
        return "w-128"
      default:
        return "w-96"
    }
  }

  return (
    <div id={`ModalWrapper-${props.id}`}>
      <div
        className={`absolute ${getSize(props.size)} flex flex-col justify-end`}
        style={positionAttributes}
      >
        <div
          className={`SelectMenu dark:bg-gray-700 ${getSize(
            props.size,
          )} max-h-96 overflow-y-auto ${!props.modalWrapperOpen && "hidden"}`}
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default ModalWrapper
