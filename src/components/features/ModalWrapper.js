import React, {useCallback, useEffect} from "react"

const ModalWrapper = props => {
  const x = props.position.x + 25
  const y = props.position.y + 25
  const positionAttributes = {top: y, left: x}

  const closeHandler = useCallback(e => {
    if (
      document.getElementById(`ModalWrapper-${props.id}`).contains(e.target)
    ) {
      // Clicked in box
    } else {
      // Clicked outside the box
      props.close()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
 
  useEffect(() => {
    if (props.modalWrapperOpen) {
      document.addEventListener("click", closeHandler)
      return () => {
        document.removeEventListener("click", closeHandler)
      }
    }
  }, [props.modalWrapperOpen, closeHandler])

  const getSize = size => {
    switch (size) {
      case "md":
        return "w-auto lg:w-96 md:w-96 px-2"
      case "lg":
        return "w-auto lg:w-128 md:w-128 px-2"
      default:
        return "w-auto lg:w-96 md:w-96 px-2"
    }
  }

  return (
    <div id={`ModalWrapper-${props.id}`}>
      <div
        className={`z-10 absolute ${getSize(props.size)} flex flex-col justify-end positionAttributes`}
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
