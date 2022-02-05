import React, {useEffect, useState, useRef, useCallback, useMemo} from "react"
import {matchSorter} from "match-sorter"

const useKeyPress = targetKey => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = ({key}) => {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({key}) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  })

  return keyPressed
}

const SelectMenu = props => {
  const allowedTags = useMemo(
    () => [
      {
        id: "page-title",
        tag: "h1",
        label: "Page Title",
      },
      {
        id: "heading",
        tag: "h2",
        label: "Heading",
      },
      {
        id: "subheading",
        tag: "h3",
        label: "Subheading",
      },
      {
        id: "paragraph",
        tag: "p",
        label: "Paragraph",
      },
      {
        id: "blockquote",
        tag: "blockquote",
        label: "Blockquote",
      },
      {
        id: "code",
        tag: "code",
        label: "code",
      },
      {
        id: "ol",
        tag: "ol",
        label: "Ordered List",
      },
      {
        id: "ul",
        tag: "ul",
        label: "Unordered List",
      },
      {
        id: "tweet",
        tag: "tweet",
        label: "Embed tweet, youtube, codepen etc..",
      },
      {
        id: "image",
        tag: "image",
        label: "Attach image",
      },
    ],
    [],
  )

  const [command] = useState("")
  const [items, setItems] = useState(allowedTags)
  const [, setSelectedItem] = useState(0)

  const downPress = useKeyPress("ArrowDown")
  const upPress = useKeyPress("ArrowUp")
  const enterPress = useKeyPress("Enter")
  const [cursor, setCursor] = useState(0)
  const [, setSelected] = useState(undefined)

  useEffect(() => {
    if (items.length && downPress) {
      setCursor(prevState =>
        prevState < items.length - 1 ? prevState + 1 : prevState,
      )
    }
  }, [items, downPress])
  useEffect(() => {
    if (items.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState))
    }
  }, [items, upPress])

  const handleClickOption = useCallback(
    (item, key) => {
      setSelectedItem(key)
      props.onSelect(item.tag)
    },
    [props],
  )

  useEffect(() => {
    if (items.length && enterPress) {
      setSelected(items[cursor])
      if (props.selectMenuIsOpen) {
        handleClickOption(items[cursor], cursor)
      }
    }
  }, [items, cursor, enterPress, props, handleClickOption])

  // const keyDownHandler = e => {
  //   switch (e.key) {
  //     case "Enter":
  //       e.preventDefault()
  //       props.onSelect(items[selectedItem].tag)
  //       break
  //     case "Backspace":
  //       if (!command) props.close()
  //       setCommand(command.substring(0, command.length - 1))
  //       break
  //     case "ArrowUp":
  //       e.preventDefault()
  //       const prevSelected =
  //         selectedItem === 0 ? items.length - 1 : selectedItem - 1
  //       setSelectedItem(prevSelected)
  //       break
  //     case "ArrowDown":
  //     case "Tab":
  //       e.preventDefault()
  //       const nextSelected =
  //         selectedItem === items.length - 1 ? 0 : selectedItem + 1
  //       setSelectedItem(nextSelected)
  //       break
  //     default:
  //       setCommand(command + e.key)
  //       break
  //   }
  // }

  const usePrevious = value => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const prevState = usePrevious({command})

  useEffect(() => {
    if (props.selectMenuIsOpen && prevState.command !== command) {
      const items = matchSorter(allowedTags, command, {keys: ["tag"]})
      setItems(items)
    }
  }, [props.selectMenuIsOpen, allowedTags, prevState, command])

  const x = props.position.x + 25
  const y = props.position.y + 25
  const positionAttributes = {top: y, left: x}

  return (
    <div
      className={`absolute h-auto w-80 flex flex-col justify-end`}
      style={positionAttributes}
    >
      <div
        className={`SelectMenu dark:bg-gray-700 w-80 h-auto min-h-min overflow-y-auto ${
          !props.selectMenuIsOpen && "hidden"
        }`}
      >
        <div
          className={`border-b border-dashed border-gray-200 border-opacity-0 p-2 border-light-blue-500 dark:border-gray-100`}
          key="ChooseBlockType"
        >
          Choose Block Type
        </div>
        <ul className="list-none" id="SelectMenu">
          {items.map((item, key) => {
            return (
              <li
                className={`${
                  cursor === key && "bg-blue-100 dark:bg-gray-500"
                } border-b-1 p-2 border-light-blue-500 dark:border-gray-100 transition duration-200 hover:bg-blue-100 dark:hover:bg-gray-500`}
                key={key}
                role="button"
                tabIndex="0"
                onClick={() => handleClickOption(item, key)}
                id={item.id}
              >
                {item.label}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SelectMenu
