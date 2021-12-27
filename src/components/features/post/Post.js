import React, {useState, useEffect} from "react"
import {AppWrapper} from "../../common/AppWrapper"
import {uid, objectId, setCaretToEnd} from "../../../utils/index"
import EditableBlock from "../EditableBlock"
import Publish from "./Publish"
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import {usePrevious} from "../../hooks/usePrevious"
import {PhotographIcon} from "@heroicons/react/outline"
import {useSelector, useDispatch} from "react-redux"
import {getPosts, savePost, saveAsDraft} from "./postSlice"
import {NodeHtmlMarkdown, NodeHtmlMarkdownOptions} from "node-html-markdown"
import {useLocation, useNavigate} from "react-router-dom"
import {URL_PATH} from "../../../utils/urlPath"
import sanitizeHtml from "sanitize-html"
import {getCaretCoordinates} from "../../../utils"
import SelectMenu from "../SelectMenu"
import TweetInput from "../TweetInput"
var htmlparser = require("htmlparser2")

const initialBlock = [
  {id: uid(), description: "Title here", tag: "h1"},
  // {
  //   id: uid(),
  //   description: "Enter content",
  //   // description: "<blockquote class='twitter-tweet'> <a href='https://twitter.com/x/status/807811447862468608'></a> </blockquote>",
  //   tag: "p",
  // },
]

const Post = props => {
  const location = useLocation()
  const navigate = useNavigate()
  const [blocks, setBlocks] = useState(initialBlock)
  const [currentBlockId, setCurrentBlockId] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [mark, setMark] = useState("")
  const [draftId, setDraftId] = useState()
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post.posts)
  const prevBlocks = usePrevious(blocks)
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false)
  const [selectMenuPosition, setSelectMenuPosition] = useState({x: 100, y: 0})
  const [tweetInputOpen, setTweetInputOpen] = useState(false)
  const [htmlBackup, setHtmlBackUp] = useState()
  const [currentBlock, setCurrentBlock] = useState()
  const [url, setURL] = useState()

  useEffect(() => {
    document.addEventListener("click", onClickEventHandler) // need to change this
    return () => {
      document.removeEventListener("click", onClickEventHandler)
    }
  }, [selectMenuIsOpen, blocks])

  const openSelectMenuHandler = e => {
    const {x, y} = getCaretCoordinates(e)
    setSelectMenuIsOpen(true)
    setSelectMenuPosition({x: Math.round(x), y: Math.round(y)})
    // document.addEventListener("click", onClickEventHandler) // need to change this
  }

  const onClickEventHandler = e => {
    console.log(document.getElementById("content-editable"))
    console.log(e.target)
    console.log(document.getElementById("content-editable").contains(e.target))
    if (document.getElementById("content-editable").contains(e.target)) {
      // Clicked in box
      console.log("inside box")
      if (blocks[blocks.length - 1]?.description) {
        const blockElement = [{id: uid(), description: "", tag: "p"}]
        const updatedBlocks = [...blocks]
        updatedBlocks.splice(blocks.length + 1, 0, ...blockElement)
        console.log(updatedBlocks, "2222222")
        setBlocks(updatedBlocks)
        setCurrentBlockId(blockElement[0].id)
        setCurrentBlock(blockElement[0])
      }
    }
    if (selectMenuIsOpen) {
      closeSelectMenuHandler()
      // document.removeEventListener("click", closeSelectMenuHandler)
    }
  }

  const closeSelectMenuHandler = e => {
    setSelectMenuIsOpen(false)
  }

  const closeTweetInputHandler = () => {
    setTweetInputOpen(false)
    setURL(null);
  }

  const tagSelectionHandler = tag => {
    if (tag === "tweet") {
      setTweetInputOpen(true)
      closeSelectMenuHandler()
      return
    }
    const {id, description, imageUrl} = currentBlock
    updateBlockHandler({
      id: id,
      description: description,
      tag: tag,
      imageUrl: imageUrl,
    })
    closeSelectMenuHandler()
  }

  useEffect(() => {
    if (location?.state?.id) {
      const {id, draft_blocks} = location.state
      setBlocks(draft_blocks)
      setDraftId(id)
    } else {
      setBlocks(initialBlock)
      setDraftId()
    }
    // dispatch(getPosts());
  }, [location.state])

  // Handling the cursor and focus on adding and deleting blocks
  useEffect(() => {
    // If a new block was added, move the caret to it
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      let nextBlockPosition = blocks.map(b => b.id).indexOf(currentBlockId) + 1
      if (blocks[nextBlockPosition]) {
        nextBlockPosition = blocks[nextBlockPosition].id
        const nextBlock = document.querySelector(
          `[data-position="${nextBlockPosition}"]`,
        )
        if (nextBlock) {
          nextBlock.focus()
        }
      }
    }
    // If a block was deleted, move the caret to the end of the last block
    if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      let lastBlockPosition =
        prevBlocks.map(b => b.id).indexOf(currentBlockId) - 1
      lastBlockPosition =
        lastBlockPosition >= 0 && prevBlocks[lastBlockPosition].id
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`,
      )
      if (lastBlock) {
        setCaretToEnd(lastBlock)
      }
    }
  }, [blocks, prevBlocks, currentBlockId])

  const updateBlockHandler = currentBlock => {
    const index = blocks.map(b => b.id).indexOf(currentBlock.id)
    const oldBlock = blocks[index]
    const updatedBlocks = [...blocks]
    const {tag, description} = currentBlock
    console.log(tag, description, ";;;")
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      description:
        ["ol", "ul"].includes(tag) &&
        !["<li>", "</li>"].includes(description) &&
        !["<li>", "</li>"].some(i => description.includes(i))
          ? `<li>${description}</li>`
          : currentBlock.description,
      imageUrl: currentBlock.imageUrl,
    }
    if (
      index === blocks.length - 1 &&
      ["code", "blockquote"].includes(currentBlock.tag)
    ) {
      const newBlock = {
        id: objectId(),
        tag: "p",
        description: "",
        imageUrl: "",
      }
      updatedBlocks.splice(index + 1, 0, newBlock)
    }
    setBlocks(updatedBlocks)
  }

  const addBlockHandler = (currentBlock, addAtPosition) => {
    setCurrentBlockId(currentBlock.id)
    const index = blocks.map(b => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]

    if (addAtPosition === "start" && currentBlock.description) {
      if (index - 1 === -1) {
        updatedBlocks.unshift(...currentBlock.newBlock)
      } else {
        updatedBlocks.splice(index, 0, ...currentBlock.newBlock)
      }
    } else if (addAtPosition === "middle") {
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        description: currentBlock.rangeBeforeText,
      }
      updatedBlocks.splice(index + 1, 0, ...currentBlock.newBlock)
    } else {
      // const newBlock = [
      //   {
      //     id: objectId(),
      //     tag: "p",
      //     descripti      //     imageUrl: "",
      //   },
      // ];
      updatedBlocks.splice(index + 1, 0, ...currentBlock.newBlock)
    }
    setBlocks(updatedBlocks)
  }

  const stripeHTML = html => {
    let tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  const deleteBlockHandler = currentBlock => {
    if (blocks.length > 1) {
      setCurrentBlockId(currentBlock.id)
      const index = blocks.map(b => b.id).indexOf(currentBlock.id)
      const deletedBlock = blocks[index]
      const updatedBlocks = [...blocks]
      if (currentBlock.deleteAtPosition === "start" && index - 1 >= 0) {
        updatedBlocks[index - 1].description =
          updatedBlocks[index - 1].description + deletedBlock.description
      }
      index && updatedBlocks.splice(index, 1)
      setBlocks(updatedBlocks)
    }
  }

  const onDragEndHandler = result => {
    const {destination, source} = result

    // If we don't have a destination (due to dropping outside the droppable)
    // or the destination hasn't changed, we change nothing
    if (
      !destination ||
      destination.index === source.index ||
      destination.index === 1
    ) {
      return
    }

    const updatedBlocks = [...blocks]
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1)
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0])
    setBlocks(updatedBlocks)
  }

  const moveToBlock = currentBlock => {
    let nextBlockPosition = blocks.map(b => b.id).indexOf(currentBlock.id)
    nextBlockPosition += currentBlock.direction === "up" ? -1 : 1
    nextBlockPosition =
      nextBlockPosition >= 0 && blocks[nextBlockPosition]
        ? blocks[nextBlockPosition].id
        : null
    const nextBlock = document.querySelector(
      `[data-position="${nextBlockPosition}"]`,
    )
    if (nextBlock) {
      nextBlock.focus()
    }
  }

  const chooseCoverImage = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      const url = reader.readAsDataURL(file)
      reader.onloadend = () => {
        setCoverImage(reader.result)
      }
    }
  }

  const concatAllBlocks = () => {
    let description = ""
    let markdown = ""
    const nhm = new NodeHtmlMarkdown()
    blocks.forEach((item, i) => {
      item.description = sanitizeHtml(item.description)
      if (i) {
        if (item.tag === "code") {
          console.log(item.description)
          description += sanitizeHtml(
            `<pre><${item.tag}>${item.description}</${item.tag}></pre>`,
          )
        } else {
          description += sanitizeHtml(
            `<${item.tag}>${item.description}</${item.tag}>`,
          )
        }
      }
    })
    console.log(description, ";;;")
    markdown = nhm.translate(description)
    console.log(markdown, ";;;")

    return {description, markdown}
  }

  const handleSavePost = async isDraft => {
    if (isDraft) {
      await dispatch(saveAsDraft({draftId, blocks, isDraft}))
      navigate(URL_PATH.DRAFT)
    } else {
      const concatedBlocks = concatAllBlocks() || {}
      concatedBlocks["blocks"] = blocks
      concatedBlocks["draftId"] = draftId
      await dispatch(savePost(concatedBlocks, isDraft))
      navigate(URL_PATH.HOME)
    }
  }

  const onKeyUpHandler = (e, id) => {
    if (e.key === "/") {
      const currentBlock = blocks.find(item => item.id === id)
      openSelectMenuHandler(e)
      setCurrentBlock(currentBlock)
      setCurrentBlockId(id)
    }
  }

  const embedLink = url => {
    let newBlocks = JSON.parse(JSON.stringify(blocks))
    let index = blocks.findIndex(item => item.id === currentBlockId)
    console.log(index, newBlocks, currentBlockId)
    console.log(blocks)
    newBlocks[index].description = `<a href=${url}></a>`
    newBlocks[index].tag = `div`
    newBlocks[index].url = url
    console.log(newBlocks)
    setBlocks(newBlocks)
    console.log(blocks)
    setTweetInputOpen(false)
    setURL(null)
    //add this url into block array with tag type a
  }

  // const closeHandler = e => {
  //   console.log(document.getElementById("tweetInput"))
  //   console.log(e.target)
  //   console.log(document.getElementById("tweetInput").contains(e.target))
  //   if (document.getElementById("tweetInput").contains(e.target)) {
  //     // Clicked in box
  //     console.log("inside box", props.tweetInputOpen)
  //   } else {
  //     // Clicked outside the box
  //     props.close()
  //     console.log("outside box", props.tweetInputOpen)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener("click", closeHandler)
  //   return () => {
  //     document.removeEventListener("click", closeHandler)
  //   }
  // })
  console.log(tweetInputOpen, "q1q", url)
  return (
    <div className="Page flex justify-center mt-18 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
      <div className="w-full lg:w-3/4 px-20 ml-20" id="content-editable">
        <label for="cover">
          <div className="ml-12 flex mb-5">
            {!coverImage && (
              <>
                <PhotographIcon className="h-5 w-5 mr-2" /> Add cover image
              </>
            )}
            {coverImage && (
              <img src={coverImage} className="h-60 w-full object-cover" />
            )}
            <input
              type="file"
              id="cover"
              accept="image/*"
              className="hidden"
              onChange={chooseCoverImage}
            />
          </div>
        </label>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId={uid()}>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {blocks.map((block, i) => {
                  const position = blocks.map(b => b.id).indexOf(block.id) + 1
                  return (
                    <EditableBlock
                      index={position}
                      key={block.id}
                      position={block.id}
                      id={block.id}
                      tag={block.tag}
                      description={block.description}
                      imageUrl={block.imageUrl}
                      pageId={props.id}
                      addBlock={addBlockHandler}
                      deleteBlock={deleteBlockHandler}
                      updateBlock={updateBlockHandler}
                      moveToBlock={moveToBlock}
                      isDragDisabled={i === 0}
                      onKeyUpHandler={onKeyUpHandler}
                      setHtmlBackUp={setHtmlBackUp}
                      url={block?.url}
                    />
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <SelectMenu
          position={selectMenuPosition}
          onSelect={tagSelectionHandler}
          close={closeSelectMenuHandler}
          selectMenuIsOpen={selectMenuIsOpen}
          tweetInputOpen={tweetInputOpen}
        />
        <TweetInput
          position={selectMenuPosition}
          onSelect={tagSelectionHandler}
          close={closeTweetInputHandler}
          tweetInputOpen={tweetInputOpen}
          embedLink={embedLink}
          url={url}
          onChangeURL={url => {
            setURL(url)
          }}
        />
      </div>
      <div className="w-full lg:w-1/4 text-left pl-5">
        <Publish savePost={handleSavePost} />
      </div>
    </div>
  )
}

export default AppWrapper(Post)
