import React, { useEffect, useState, useRef } from "react";
import { matchSorter } from "match-sorter";

const SelectMenu = (props) => {
  const MENU_HEIGHT = 150;
  const allowedTags = [
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
  ];
  const [command, setCommand] = useState("");
  const [items, setItems] = useState(allowedTags);
  const [selectedItem, setSelectedItem] = useState(0);

  const keyDownHandler = (e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        props.onSelect(items[selectedItem].tag);
        break;
      case "Backspace":
        if (!command) props.close();
        setCommand(command.substring(0, command.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevSelected =
          selectedItem === 0 ? items.length - 1 : selectedItem - 1;
        setSelectedItem(prevSelected);
        break;
      case "ArrowDown":
      case "Tab":
        e.preventDefault();
        const nextSelected =
          selectedItem === items.length - 1 ? 0 : selectedItem + 1;
        setSelectedItem(nextSelected);
        break;
      default:
        setCommand(command + e.key);
        break;
    }
  };

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevState = usePrevious({ command });

  const mounted = useRef();

  useEffect(() => {
    if (props.selectMenuIsOpen && prevState.command !== command) {
      const items = matchSorter(allowedTags, command, { keys: ["tag"] });
      setItems(items);
    }
  }, [props.selectMenuIsOpen, command]);

  const x = props.position.x + 25;
  const y = props.position.y + 25;
  const positionAttributes = { top: y, left: x };

  const handleClickOption = (item, key) => {
    setSelectedItem(key);
    props.onSelect(item.tag);
  };

  return (
    <div className={`SelectMenuWrapper`} style={positionAttributes}>
      <div
        className={`SelectMenu dark:bg-gray-700 ${
          !props.selectMenuIsOpen && "hidden"
        }`}
      >
        <div
          className={`border-b border-dashed border-gray-200 border-opacity-0 p-2 border-light-blue-500 dark:border-gray-100`}
          key="ChooseBlockType"
        >
          Choose Block Type
        </div>
        {items.map((item, key) => {
          const isSelected = items.indexOf(item) === selectedItem;
          return (
            <div
              className={`${
                isSelected && "Selected"
              } border-b-1 p-2 border-light-blue-500 dark:border-gray-100 transition duration-200 hover:bg-blue-100 dark:hover:bg-gray-500`}
              key={key}
              role="button"
              tabIndex="0"
              onClick={() => handleClickOption(item, key)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectMenu;
