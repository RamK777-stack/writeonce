import React, {useState, useEffect, useCallback} from "react"
import {AppWrapper} from "../../common/AppWrapper"
import {uid, objectId, setCaretToEnd} from "../../../utils/index"
import EditableBlock from "../EditableBlock"
import Publish from "./Publish"
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import {usePrevious} from "../../hooks/usePrevious"
import {PhotographIcon} from "@heroicons/react/outline"
import {useSelector, useDispatch} from "react-redux"
import {savePost, saveAsDraft, uploadImage} from "./postSlice"
import {NodeHtmlMarkdown} from "node-html-markdown"
import {useLocation, useNavigate} from "react-router-dom"
import {URL_PATH} from "../../../utils/urlPath"
import sanitizeHtml from "sanitize-html"
import {getCaretCoordinates} from "../../../utils"
import SelectMenu from "../SelectMenu"
import TweetInput from "../TweetInput"
import ImagePicker from "../ImagePicker"
import {isString} from "lodash"
import {AiOutlineUndo, AiOutlineClose} from "react-icons/ai"

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
  // const [coverImage, setCoverImage] = useState("https://res.cloudinary.com/diqjnoirx/image/upload/v1642577761/download_uio4z6.jpg")
  const [coverImage, setCoverImage] = useState()
  const [draftId, setDraftId] = useState()
  const dispatch = useDispatch()
  const prevBlocks = usePrevious(blocks)
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false)
  const [selectMenuPosition, setSelectMenuPosition] = useState({x: 350, y: 150})
  const [tweetInputOpen, setTweetInputOpen] = useState(false)
  const [imagePickerOpen, setImagePickerOpen] = useState(false)
  const [, setHtmlBackUp] = useState()
  const [currentBlock, setCurrentBlock] = useState()
  const [url, setURL] = useState()
  const isImageUploading = useSelector(state => state.post.isImageUploading)
  const [isCoverImage, setIsCoverImage] = useState()

  const onClickEventHandler = useCallback(
    e => {
      if (
        document.getElementById("content-editable")?.contains(e.target) &&
        !selectMenuIsOpen
      ) {
        // Clicked in box
        if (blocks[blocks.length - 1]?.description) {
          const blockElement = [{id: uid(), description: "", tag: "p"}]
          const updatedBlocks = [...blocks]
          updatedBlocks.splice(blocks.length + 1, 0, ...blockElement)
          setBlocks(updatedBlocks)
          setCurrentBlockId(blockElement[0].id)
          setCurrentBlock(blockElement[0])
        }
      }
      if (selectMenuIsOpen) {
        closeSelectMenuHandler()
        // document.removeEventListener("click", closeSelectMenuHandler)
      }
    },
    [blocks, selectMenuIsOpen],
  )
  // eslint-disable-next-line
  const updateBlockHandler = currentBlock => {
    const index = blocks.map(b => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]
    const {tag, description} = currentBlock
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

  const onPasteEventHandler = useCallback(
    e => {
      if (e.target.id !== "addLink") {
        e.preventDefault()
        // let html = e.clipboardData.getData("text/html")
        let text = e.clipboardData.getData("text/plain")
        // console.log(html, text)
        text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        const block = blocks.find(i => parseInt(i.id) === parseInt(e.target.id))
        // let sanitizedContent = html
        //   ? sanitizeHtml(html).trim().replaceAll(" ", "")
        //   : text;
        // console.log(sanitizedContent)
        updateBlockHandler({
          id: parseInt(e.target.id),
          description: block?.description.concat(text) || text,
          tag: block?.tag,
        })
      }
      // let sanitizedText = sanitizedContent.trim().replaceAll(" ","")
      // console.log(sanitizedContent, sanitizedText[0], sanitizedText)
      // console.log(sanitizedText.split(""))
      // console.log(sanitizedText.split("").join("").trim().replace(/\s/g, ''))
      // document.execCommand("insertHTML", false, sanitizedContent)
      // document.execCommand("insertHTML", false, text);
    },
    [blocks, updateBlockHandler],
  )

  useEffect(() => {
    document.addEventListener("paste", onPasteEventHandler)
    return () => {
      document.removeEventListener("paste", onPasteEventHandler)
    }
  }, [blocks, onPasteEventHandler])

  useEffect(() => {
    document.addEventListener("click", onClickEventHandler) // need to change this
    return () => {
      document.removeEventListener("click", onClickEventHandler)
    }
  }, [selectMenuIsOpen, blocks, onClickEventHandler])

  const openSelectMenuHandler = e => {
    const {x, y} = getCaretCoordinates(e)
    setSelectMenuPosition({x: Math.round(x), y: Math.round(y)})
    setSelectMenuIsOpen(true)
    // document.addEventListener("click", onClickEventHandler) // need to change this
  }

  const closeSelectMenuHandler = e => {
    setSelectMenuIsOpen(false)
    // const nextBlock = document.querySelector(
    //   `[data-position="${currentBlock.id}"]`,
    // )
    // alert(nextBlock)
    // console.log(nextBlock)
    // nextBlock.focus()
  }

  const closeTweetInputHandler = () => {
    setTweetInputOpen(false)
    setURL(null)
  }

  const closeImagePickerHandler = () => {
    setIsCoverImage(false)
    setImagePickerOpen(false)
  }

  const tagSelectionHandler = tag => {
    if (tag === "tweet") {
      setTweetInputOpen(true)
      closeSelectMenuHandler()
      return
    }
    if (tag === "image") {
      setImagePickerOpen(true)
      setTweetInputOpen(false)
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

  const addBlockHandler = (currentBlock, addAtPosition) => {
    if (!selectMenuIsOpen) {
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
  }

  // const stripeHTML = html => {
  //   let tmp = document.createElement("DIV")
  //   tmp.innerHTML = html
  //   return tmp.textContent || tmp.innerText || ""
  // }

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
    if (nextBlock && !selectMenuIsOpen) {
      nextBlock.focus()
    }
  }

  // const chooseCoverImage = e => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     const url = reader.readAsDataURL(file)
  //     reader.onloadend = () => {
  //       setCoverImage(reader.result)
  //     }
  //   }
  // }

  const concatAllBlocks = () => {
    let description = ""
    let markdown = ""
    const nhm = new NodeHtmlMarkdown()
    blocks.forEach((item, i) => {
      if (i) {
        if (item.tag === "code") {
          description += sanitizeHtml(
            `<pre><code class="language-jsx"><${item.tag}>${item.description}</${item.tag}></code></pre>`,
            {
              allowedClasses: {
                code: ["language-*", "lang-*"],
                "*": ["fancy", "simple"],
              },
            },
          )
        } else if (item.resource_type === "image") {
          description += sanitizeHtml(item.description, {
            allowedTags: ["img"],
            allowedAttributes: {img: ["src", "alt"]},
          })
        } else {
          description += sanitizeHtml(
            `<${item.tag}>${item.description}</${item.tag}>`,
          )
        }
      }
    })
    markdown = nhm.translate(description)

    return {description, markdown}
  }

  const handleSavePost = async (isDraft, hashtags) => {
    if (isDraft) {
      await dispatch(saveAsDraft({draftId, blocks, isDraft}))
      navigate(URL_PATH.DRAFT)
    } else {
      const concatedBlocks = concatAllBlocks() || {}
      concatedBlocks["blocks"] = blocks
      concatedBlocks["draftId"] = draftId
      concatedBlocks["hashtags"] = hashtags
      concatedBlocks["coverImage"] = coverImage
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

  const embedLink = (url, resource_type) => {
    let newBlocks = JSON.parse(JSON.stringify(blocks))
    let index = blocks.findIndex(item => item.id === currentBlockId)
    newBlocks[index].description =
      resource_type === "image"
        ? `<img src=${url} alt="embedded link" /> </img>`
        : `<a href=${url}> </a>`
    newBlocks[index].tag = `div`
    newBlocks[index].url = url
    newBlocks[index].resource_type = resource_type
    setBlocks(newBlocks)
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

  const isRemoteUrl = url => {
    return (
      isString(url) &&
      /^ftp:|^https?:|^gs:|^s3:|^data:([\w-.]+\/[\w-.]+(\+[\w-.]+)?)?(;[\w-.]+=[\w-.]+)*;base64,([a-zA-Z0-9/+\n=]+)$/.test(
        url,
      )
    )
  }

  const onSelectImage = async e => {
    setIsCoverImage(false)
    setImagePickerOpen(false)
    if (isRemoteUrl(e)) {
      let formdata = new FormData()
      formdata.append("url", e)
      const result = await dispatch(uploadImage(formdata))
      if (isCoverImage) {
        setCoverImage(result?.payload?.secure_url)
      } else {
        embedLink(result?.payload?.secure_url, result?.payload?.resource_type)
      }
      return
    }
    let formdata = new FormData()
    formdata.append("files", e.target.files[0])
    const result = await dispatch(uploadImage(formdata))
    if (isCoverImage) {
      setCoverImage(result?.payload?.secure_url)
    } else {
      embedLink(result?.payload?.secure_url, result?.payload?.resource_type)
    }
  }

  const removeImage = (e, {isCoverImage}) => {
    e.preventDefault()
    e.stopPropagation()
    if (isCoverImage) {
      setCoverImage(null)
    }
  }

  const openCoverImagePicker = () => {
    setIsCoverImage(true)
    setSelectMenuPosition({x: 350, y: 150})
    setImagePickerOpen(true)
  }

  return (
    <div className="Page flex justify-center mt-18 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
      <div
        className="w-full lg:w-3/4 lg:px-20 md:px-20 lg:ml-20 md:ml-20"
        id="content-editable"
      >
        <label for="cover">
          <div
            className="ml-12 flex mb-5"
            onClick={() => {
              openCoverImagePicker()
            }}
          >
            {!coverImage && (
              <>
                <PhotographIcon className="h-5 w-5 mr-2" />
                <div className="flex">
                  <div>Add cover image</div>
                  {isImageUploading && (
                    <div className="ml-5 flex">
                      Uploading
                      <svg
                        class="ml-3 mt-1 animate-spin h-4 w-4 rounded-full bg-transparent border-t-2 border-r-2 border-opacity-50 border-indigo-800"
                        viewBox="0 0 24 24"
                      ></svg>
                    </div>
                  )}
                </div>
              </>
            )}
            {coverImage && (
              <div className="relative group">
                <img
                  src={coverImage}
                  alt="cover"
                  className="block object-cover w-full h-full rounded"
                />
                <div className="hidden group-hover:block flex absolute top-3 right-5">
                  <button className="rounded bg-slate-50 p-2" type="button">
                    <AiOutlineUndo className="h-4 w-4" />
                  </button>
                  <button
                    className="ml-3 rounded bg-slate-50 p-2"
                    type="button"
                    onClick={e => {
                      removeImage(e, {isCoverImage: true})
                    }}
                  >
                    <AiOutlineClose className="h-4 w-4" />
                  </button>
                </div>
                {isImageUploading && (
                  <div className="absolute top-3 right-28 flex bg-slate-50 p-2 space-x-2 text-gray-600 rounded">
                    <span className="text-sm">Uploading</span>
                    <svg
                      class="ml-3 mt-1 animate-spin h-4 w-4 rounded-full bg-transparent border-t-2 border-r-2 border-opacity-50 border-indigo-800"
                      viewBox="0 0 24 24"
                    ></svg>
                  </div>
                )}
              </div>
            )}
            {/* <input
              type="file"
              id="cover"
              accept="image/*"
              className="hidden"
              onChange={chooseCoverImage}
            /> */}
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
                      resource_type={block?.resource_type}
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
          id="tweetInput"
          size="md"
        />
        <ImagePicker
          position={selectMenuPosition}
          onSelect={tagSelectionHandler}
          close={closeImagePickerHandler}
          imagePickerOpen={imagePickerOpen}
          id="imagePicker"
          size="lg"
          onSelectImage={onSelectImage}
        />
      </div>
      <div className="w-full lg:w-1/4 text-left pl-5">
        <Publish savePost={handleSavePost} />
      </div>
    </div>
  )
}

export default AppWrapper(Post)
