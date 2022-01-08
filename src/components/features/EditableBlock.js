import React from "react"
import ContentEditable from "react-contenteditable"
import {setCaretToEnd, getCaretCoordinates, objectId} from "../../utils"
import SelectMenu from "./SelectMenu"
import TweetInput from "./TweetInput"
import {Draggable} from "react-beautiful-dnd"
import {ViewGridIcon, ViewListIcon, XIcon} from "@heroicons/react/outline"
import CustomTwitterComponent from "../features/post/CustomTwitterComponent"
import EmbedCodepen from "./post/EmbedCodepen"

class EditableBlock extends React.Component {
  constructor(props) {
    super(props)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.contentEditable = React.createRef()
    this.state = {
      description: "",
      tag: "p",
      tag: "p",
      previousKey: "",
      selectMenuIsOpen: false,
      selectMenuPosition: {
        x: 100,
        y: 0,
      },
      htmlBackup: "",
      hasPlaceholder: false,
      tweetInputOpen: false,
    }
  }

  componentDidMount() {
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.props.description || this.props.imageUrl,
    })
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
    document.removeEventListener("click", this.closeActionMenu, false)
  }

  closeActionMenu = () => {
    this.setState({
      ...this.state,
      actionMenuPosition: {x: null, y: null},
      actionMenuOpen: false,
    })
    document.removeEventListener("click", this.closeActionMenu, false)
  }

  // Show a placeholder for blank pages
  addPlaceholder = ({block, position, content}) => {
    const isFirstBlockWithoutHtml = position === 1 && !content
    const isFirstBlockWithoutSibling = !block.parentElement.nextElementSibling
    if (isFirstBlockWithoutHtml) {
      this.setState({
        ...this.state,
        description: "Post title here",
        tag: "h1",
        placeholder: true,
        isTyping: false,
      })
      return true
    } else {
      return false
    }
  }

  onKeyUpHandler = e => {
    if (e.key === "/") {
      this.openSelectMenuHandler(e)
    }
  }

  handleFocus = () => {
    // If a placeholder is set, we remove it when the block gets focused
    if (this.state.placeholder) {
      this.setState({
        ...this.state,
        description: "",
        placeholder: false,
        isTyping: true,
      })
    } else {
      this.setState({...this.state, isTyping: true})
    }
  }

  handleBlur = e => {
    // Show placeholder if block is still the only one and empty
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.props.description || this.props.imageUrl,
    })
    if (!hasPlaceholder) {
      this.setState({...this.state, isTyping: false})
    }
  }

  openSelectMenuHandler = e => {
    const {x, y} = getCaretCoordinates(e)
    this.setState({
      selectMenuIsOpen: true,
      selectMenuPosition: {x: Math.round(x), y: Math.round(y)},
    })
    document.addEventListener("click", this.closeSelectMenuHandler) // need to change this
  }

  closeSelectMenuHandler = () => {
    const {tweetInputOpen, selectMenuPosition} = this.state
    this.setState({
      selectMenuIsOpen: false,
      selectMenuPosition: tweetInputOpen
        ? selectMenuPosition
        : {x: 100, y: null},
    })
    document.removeEventListener("click", this.closeSelectMenuHandler)
  }

  tagSelectionHandler = tag => {
    if (tag === "tweet") {
      this.setState({tweetInputOpen: true}, () => {
        this.closeSelectMenuHandler()
      })
      return
    }
    this.props.updateBlock({
      id: this.props.id,
      description: this.state.htmlBackup,
      tag: tag,
      imageUrl: this.props.imageUrl,
    })
    // this.setState({ tag: tag, description: this.state.htmlBackup }, () => {
    // setCaretToEnd(this.contentEditable.current);
    // this.contentEditable.current.focus();
    // console.log(this.props.id, this.state.description);
    this.closeSelectMenuHandler()
    // });
  }

  isListEnter = () => {
    return (
      ["ol", "ul"].includes(this.props.tag) &&
      this.state.previousKey === "Enter"
    )
  }

  stripeHTML = html => {
    let tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  onKeyDownHandler = e => {
    if (e.key === "ArrowUp") {
      this.props.moveToBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
        direction: "up",
      })
    }
    if (e.key === "ArrowDown") {
      this.props.moveToBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
        direction: "down",
      })
    }
    if (e.key === "/") {
      this.setState({htmlBackup: this.props.description})
    }
    if (e.key === "Enter") {
      if (["code"].includes(this.props.tag)) {
        document.execCommand("insertLineBreak")
        e.preventDefault()
      }
      if (
        this.state.previousKey !== "Shift" &&
        (!["code", "ol", "ul"].includes(this.props.tag) || this.isListEnter())
      ) {
        e.preventDefault()
        const selection = window.getSelection()

        let rangeBefore = document.createRange()
        let rangeAfter = document.createRange()
        let fullRange = document.createRange()
        const r = selection.getRangeAt(0)

        rangeBefore.setStart(r.startContainer, 0)
        rangeBefore.setEnd(r.startContainer, r.startOffset)

        rangeAfter.setStart(r.endContainer, r.endOffset)
        rangeAfter.setEnd(r.endContainer, r.endContainer.length)

        fullRange.setStart(r.startContainer, 0)
        fullRange.setEnd(r.endContainer, r.endContainer.length)

        const endIndex = r.endOffset
        const fullLength = fullRange.toString().length

        let addAtPosition = ""
        let newBlock = [
          {
            id: objectId(),
            tag: "p",
            description: "",
            imageUrl: "",
          },
        ]
        if (this.isListEnter()) {
          addAtPosition = "end"
        } else {
          switch (endIndex) {
            case 0:
              addAtPosition = "start"
              break
            case fullLength:
              addAtPosition = "end"
              break
            default:
              addAtPosition = "middle"
              newBlock[0].description = rangeAfter.toString()
              break
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
          addAtPosition,
        )
      }
    }
    if (e.key === "Backspace") {
      const selection = window.getSelection()
      let rangeBefore = document.createRange()
      let rangeAfter = document.createRange()
      let fullRange = document.createRange()
      const r = selection.getRangeAt(0)

      rangeBefore.setStart(r.startContainer, 0)
      rangeBefore.setEnd(r.startContainer, r.startOffset)

      rangeAfter.setStart(r.endContainer, r.endOffset)
      rangeAfter.setEnd(r.endContainer, r.endContainer.length)

      fullRange.setStart(r.startContainer, 0)
      fullRange.setEnd(r.endContainer, r.endContainer.length)

      const endIndex = r.endOffset
      const fullLength = fullRange.toString().length
      let deleteAtPosition = ""

      switch (endIndex) {
        case 0:
          deleteAtPosition = "start"
          break
        case fullLength:
          deleteAtPosition = "end"
          break
        default:
          deleteAtPosition = "middle"
          break
      }
      if (["code", "ul", "ol"].some(i => this.props.tag.includes(i))) {
        console.log(this.stripeHTML(this.props.description), deleteAtPosition)
      }
      if (
        ["code", "ul", "ol"].some(i => this.props.tag.includes(i)) &&
        !this.stripeHTML(this.props.description)
      ) {
        this.props.deleteBlock({
          id: this.props.id,
          ref: this.contentEditable.current,
        })
      }
      if (
        !["code", "ul", "ol"].some(i => this.props.tag.includes(i)) &&
        (deleteAtPosition === "start" || !this.props.description)
      ) {
        this.props.deleteBlock({
          id: this.props.id,
          ref: this.contentEditable.current,
          deleteAtPosition: deleteAtPosition,
        })
      }
    }
    this.setState({previousKey: e.key})
  }

  componentDidUpdate(prevProps, prevState) {
    const hasNoPlaceholder = !this.state.placeholder
    const htmlChanged = this.props.description !== this.state.description
    const tagChanged = this.props.tag !== this.state.tag
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
    console.log(e)
    // this.setState({ description: e.target.value });
    if (this.props.tag === "code") {
      e.target.value = e.target.value.replaceAll("</div>", "<br/>")
      e.target.value = e.target.value.replaceAll("<div>", "")
    }
    this.props.updateBlock({
      id: this.props.id,
      description: e.target.value,
      tag: this.props.tag,
      imageUrl: this.props.imageUrl,
    })
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
    }
    return size[this.props.tag]
  }

  onDeleteURL = () => {
    this.props.deleteBlock({
      id: this.props.id,
      ref: this.contentEditable.current,
    })
  }

  render() {
    return (
      <div className="">
        {/* <SelectMenu
          position={this.state.selectMenuPosition}
          onSelect={this.tagSelectionHandler}
          close={this.closeSelectMenuHandler}
          selectMenuIsOpen={this.state.selectMenuIsOpen}
          tweetInputOpen={this.state.tweetInputOpen}
        />
        <TweetInput
          position={this.state.selectMenuPosition}
          onSelect={this.tagSelectionHandler}
          close={this.closeSelectMenuHandler}
          tweetInputOpen={this.state.tweetInputOpen}
        /> */}
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
                className="flex items-center mr-5 invisible group-hover:visible"
              >
                {this.props.url?.startsWith("https://twitter.com") && (
                  <XIcon
                    className="h-5 w-5 mr-3"
                    aria-hidden="true"
                    onClick={() => {
                      this.onDeleteURL()
                    }}
                  />
                )}
                <div tabIndex="0" {...provided.dragHandleProps}>
                  <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </span>
              {this.props.url?.startsWith("https://twitter.com") ? (
                <div className="flex w-full justify-center">
                  <CustomTwitterComponent url={this.props.url} />
                </div>
              ): this.props.url?.startsWith("https://codepen.io") ? (
                <div className="flex w-full justify-center">
                  <EmbedCodepen url={this.props.url} />
                </div>
              ): (
                <ContentEditable
                  className={`Block ${this.getClassName()} flex-1 focus:bg-gray-20 focus:outline-none`}
                  innerRef={this.contentEditable}
                  html={this.props.description}
                  tagName={this.props.tag}
                  onChange={this.onChangeHandler}
                  onKeyDown={this.onKeyDownHandler}
                  onKeyUp={e => this.props.onKeyUpHandler(e, this.props.id)}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  data-position={this.props.position}
                />
              )}
            </div>
          )}
        </Draggable>
      </div>
    )
  }
}

export default EditableBlock
