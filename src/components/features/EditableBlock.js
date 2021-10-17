import React from "react";
import ContentEditable from "react-contenteditable";
import { setCaretToEnd, getCaretCoordinates } from "../../utils";
import SelectMenu from "./SelectMenu";
import { Draggable } from "react-beautiful-dnd";
import { ViewGridIcon, ViewListIcon } from "@heroicons/react/outline";

class EditableBlock extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      html: "",
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
      content: this.props.html || this.props.imageUrl,
    });
    if (!hasPlaceholder) {
      this.setState({
        ...this.state,
        html: this.props.html,
        tag: this.props.tag,
      });
    }
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
    if (isFirstBlockWithoutHtml && isFirstBlockWithoutSibling) {
      this.setState({
        ...this.state,
        html: "Type a page title...",
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
        html: "",
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
      content: this.state.html || this.state.imageUrl,
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
    this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
      //   setCaretToEnd(this.contentEditable.current);
      //   this.contentEditable.current.focus();
      this.closeSelectMenuHandler();
    });
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
      this.setState({ htmlBackup: this.state.html });
    }
    if (e.key === "Enter") {
      if (this.state.previousKey !== "Shift") {
        e.preventDefault();
        this.props.addBlock({
          id: this.props.id,
          html: this.state.html,
          tag: this.state.tag,
          imageUrl: this.state.imageUrl,
          ref: this.contentEditable.current,
        });
      }
    }
    if (e.key === "Backspace" && !this.state.html) {
      e.preventDefault();
      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      });
    }
    this.setState({ previousKey: e.key });
  };

  componentDidUpdate(prevProps, prevState) {
    const hasNoPlaceholder = !this.state.placeholder;
    const htmlChanged = this.props.html !== this.state.html;
    const tagChanged = this.props.tag !== this.state.tag;
    if ((htmlChanged || tagChanged) && hasNoPlaceholder) {
      this.props.updateBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
      });
    }
  }

  onChangeHandler(e) {
    this.setState({ html: e.target.value });
  }

  getClassName = () => {
    const size = {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      p: "text-xl",
    };
    return size[this.state.tag];
  };

  render() {
    return (
      <>
        {this.state.selectMenuIsOpen && (
          <SelectMenu
            position={this.state.selectMenuPosition}
            onSelect={this.tagSelectionHandler}
            close={this.closeSelectMenuHandler}
          />
        )}
        <Draggable draggableId={this.props.id} index={this.props.position}>
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
                html={this.state.html}
                tagName={this.state.tag}
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
