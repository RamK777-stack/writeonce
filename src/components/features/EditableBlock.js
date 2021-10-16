import React from "react";
import ContentEditable from "react-contenteditable";
import { setCaretToEnd, getCaretCoordinates } from "../../utils";
import SelectMenu from "./SelectMenu";

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
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  onKeyUpHandler = (e) => {
    console.log(e);
    if (e.key === "/") {
      this.openSelectMenuHandler();
    }
  };

  openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates();
    console.log(x, y);
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
    console.log(e.key);
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

  componentDidUpdate() {
    const htmlChanged = this.props.html !== this.state.html;
    const tagChanged = this.props.tag !== this.state.tag;
    const imageChanged = this.props.imageUrl !== this.state.imageUrl;
    if (htmlChanged || tagChanged || imageChanged) {
      this.props.updatePage({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
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
    return size[this.state.tag]
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
        <ContentEditable
          className={`Block ${this.getClassName()}`}
          innerRef={this.contentEditable}
          html={this.state.html}
          tagName={this.state.tag}
          onChange={this.onChangeHandler}
          onKeyDown={this.onKeyDownHandler}
          onKeyUp={this.onKeyUpHandler}
        />
      </>
    );
  }
}

export default EditableBlock;
