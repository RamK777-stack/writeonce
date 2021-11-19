import React from "react";
import ContentEditable from "react-contenteditable";
import { setCaretToEnd, getCaretCoordinates, objectId } from "../../utils";
import SelectMenu from "./SelectMenu";
import { Draggable } from "react-beautiful-dnd";
import { ViewGridIcon, ViewListIcon } from "@heroicons/react/outline";

class EditableBlock extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      description: "",
      tag: "p",
      tag: "p",
      previousKey: "",
      selectMenuIsOpen: false,
      selectMenuPosition: {
        x: null,
        y: null,
      },
      htmlBackup: "",
      hasPlaceholder: false,
    };
  }

  componentDidMount() {
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.props.description || this.props.imageUrl,
    });
    // if (!hasPlaceholder) {
    //   this.setState({
    //     ...this.state,
    //     description: this.props.description,
    //     tag: this.props.tag,
    //   });
    // }
  }

  componentWillUnmount() {
    // In case, the user deleted the block, we need to cleanup all listeners
    document.removeEventListener("click", this.closeActionMenu, false);
  }

  closeActionMenu = () => {
    this.setState({
      ...this.state,
      actionMenuPosition: { x: null, y: null },
      actionMenuOpen: false,
    });
    document.removeEventListener("click", this.closeActionMenu, false);
  };

  // Show a placeholder for blank pages
  addPlaceholder = ({ block, position, content }) => {
    const isFirstBlockWithoutHtml = position === 1 && !content;
    const isFirstBlockWithoutSibling = !block.parentElement.nextElementSibling;
    if (isFirstBlockWithoutHtml) {
      this.setState({
        ...this.state,
        description: "Post title here",
        tag: "h1",
        placeholder: true,
        isTyping: false,
      });
      return true;
    } else {
      return false;
    }
  };

  onKeyUpHandler = (e) => {
    if (e.key === "/") {
      this.openSelectMenuHandler();
    }
  };

  handleFocus = () => {
    // If a placeholder is set, we remove it when the block gets focused
    if (this.state.placeholder) {
      this.setState({
        ...this.state,
        description: "",
        placeholder: false,
        isTyping: true,
      });
    } else {
      this.setState({ ...this.state, isTyping: true });
    }
  };

  handleBlur = (e) => {
    // Show placeholder if block is still the only one and empty
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.props.description || this.props.imageUrl,
    });
    if (!hasPlaceholder) {
      this.setState({ ...this.state, isTyping: false });
    }
  };

  openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates();
    this.setState({
      selectMenuIsOpen: true,
      selectMenuPosition: { x, y },
    });
    document.addEventListener("click", this.closeSelectMenuHandler);
  };

  closeSelectMenuHandler = () => {
    this.setState({
      selectMenuIsOpen: false,
      selectMenuPosition: { x: null, y: null },
    });
    document.removeEventListener("click", this.closeSelectMenuHandler);
  };

  tagSelectionHandler = (tag) => {
    this.props.updateBlock({
      id: this.props.id,
      description: this.state.htmlBackup,
      tag: tag,
      imageUrl: this.props.imageUrl,
    });
    // this.setState({ tag: tag, description: this.state.htmlBackup }, () => {
    // setCaretToEnd(this.contentEditable.current);
    // this.contentEditable.current.focus();
    // console.log(this.props.id, this.state.description);
    this.closeSelectMenuHandler();
    // });
  };

  isListEnter = () => {
    return (
      ["ol", "ul"].includes(this.props.tag) &&
      this.state.previousKey === "Enter"
    );
  };

  stripeHTML = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  onKeyDownHandler = (e) => {
    if (e.key === "ArrowUp") {
      this.props.moveToBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
        direction: "up",
      });
    }
    if (e.key === "ArrowDown") {
      this.props.moveToBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
        direction: "down",
      });
    }
    if (e.key === "/") {
      this.setState({ htmlBackup: this.props.description });
    }
    if (e.key === "Enter") {
      if (
        this.state.previousKey !== "Shift" &&
        (!["code", "ol", "ul"].includes(this.props.tag) || this.isListEnter())
      ) {
        e.preventDefault();
        const selection = window.getSelection();

        let rangeBefore = document.createRange();
        let rangeAfter = document.createRange();
        let fullRange = document.createRange();
        const r = selection.getRangeAt(0);

        rangeBefore.setStart(r.startContainer, 0);
        rangeBefore.setEnd(r.startContainer, r.startOffset);

        rangeAfter.setStart(r.endContainer, r.endOffset);
        rangeAfter.setEnd(r.endContainer, r.endContainer.length);

        fullRange.setStart(r.startContainer, 0);
        fullRange.setEnd(r.endContainer, r.endContainer.length);

        const endIndex = r.endOffset;
        const fullLength = fullRange.toString().length;

        let addAtPosition = "";
        let newBlock = [
          {
            id: objectId(),
            tag: "p",
            description: "",
            imageUrl: "",
          },
        ];
        if (this.isListEnter()) {
          addAtPosition = "end";
        } else {
          switch (endIndex) {
            case 0:
              addAtPosition = "start";
              break;
            case fullLength:
              addAtPosition = "end";
              break;
            default:
              addAtPosition = "middle";
              newBlock[0].description = rangeAfter.toString();
              break;
          }
        }
        this.props.addBlock(
          {
            id: this.props.id,
            description: this.props.description,
            tag: this.props.tag,
            imageUrl: this.props.imageUrl,
            ref: this.contentEditable.current,
            newBlock: newBlock,
            rangeBeforeText: rangeBefore.toString(),
          },
          addAtPosition
        );
      }
    }
    if (e.key === "Backspace") {
      const selection = window.getSelection();
      let rangeBefore = document.createRange();
      let rangeAfter = document.createRange();
      let fullRange = document.createRange();
      const r = selection.getRangeAt(0);

      rangeBefore.setStart(r.startContainer, 0);
      rangeBefore.setEnd(r.startContainer, r.startOffset);

      rangeAfter.setStart(r.endContainer, r.endOffset);
      rangeAfter.setEnd(r.endContainer, r.endContainer.length);

      fullRange.setStart(r.startContainer, 0);
      fullRange.setEnd(r.endContainer, r.endContainer.length);

      const endIndex = r.endOffset;
      const fullLength = fullRange.toString().length;
      let deleteAtPosition = "";

      switch (endIndex) {
        case 0:
          deleteAtPosition = "start";
          break;
        case fullLength:
          deleteAtPosition = "end";
          break;
        default:
          deleteAtPosition = "middle";
          break;
      }
      if (["code", "ul", "ol"].some((i) => this.props.tag.includes(i))) {
        console.log(this.stripeHTML(this.props.description), deleteAtPosition);
      }
      if (
        ["code", "ul", "ol"].some((i) => this.props.tag.includes(i)) &&
        !this.stripeHTML(this.props.description)
      ) {
        this.props.deleteBlock({
          id: this.props.id,
          ref: this.contentEditable.current,
        });
      }
      if (
        !["code", "ul", "ol"].some((i) => this.props.tag.includes(i)) &&
        (deleteAtPosition === "start" || !this.props.description)
      ) {
        this.props.deleteBlock({
          id: this.props.id,
          ref: this.contentEditable.current,
          deleteAtPosition: deleteAtPosition,
        });
      }
    }
    this.setState({ previousKey: e.key });
  };

  componentDidUpdate(prevProps, prevState) {
    const hasNoPlaceholder = !this.state.placeholder;
    const htmlChanged = this.props.description !== this.state.description;
    const tagChanged = this.props.tag !== this.state.tag;
    // if ((htmlChanged || tagChanged) && hasNoPlaceholder) {
    //   this.props.updateBlock({
    //     id: this.props.id,
    //     description: this.state.description,
    //     tag: this.state.tag,
    //     imageUrl: this.state.imageUrl,
    //   });
    // }
  }

  onChangeHandler(e) {
    // this.setState({ description: e.target.value });
    this.props.updateBlock({
      id: this.props.id,
      description: e.target.value,
      tag: this.props.tag,
      imageUrl: this.props.imageUrl,
    });
  }

  getClassName = () => {
    const size = {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      p: "text-xl",
      blockquote: "bg-gray-200 border-l-4 border-gray-300 dark:bg-gray-700",
      code: "bg-gray-100 dark:bg-gray-700",
      ol: "list-decimal",
      ul: "list-disc",
    };
    return size[this.props.tag];
  };
  render() {
    return (
      <>
        <SelectMenu
          position={this.state.selectMenuPosition}
          onSelect={this.tagSelectionHandler}
          close={this.closeSelectMenuHandler}
          selectMenuIsOpen={this.state.selectMenuIsOpen}
        />
        <Draggable
          draggableId={this.props.id.toString()}
          index={this.props.index}
          isDragDisabled={this.props.isDragDisabled}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="flex flex-row group focus:bg-gray-600 focus:outline-none"
            >
              <span
                role="button"
                tabIndex="0"
                {...provided.dragHandleProps}
                className="flex items-center mr-5 invisible group-hover:visible"
              >
                <ViewListIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <ContentEditable
                className={`Block ${this.getClassName()} flex-1 focus:bg-gray-20 focus:outline-none`}
                innerRef={this.contentEditable}
                html={this.props.description}
                tagName={this.props.tag}
                onChange={this.onChangeHandler}
                onKeyDown={this.onKeyDownHandler}
                onKeyUp={this.onKeyUpHandler}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                data-position={this.props.position}
              />
            </div>
          )}
        </Draggable>
      </>
    );
  }
}

export default EditableBlock;
