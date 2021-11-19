import React, { useState, useEffect } from "react";
import { AppWrapper } from "../../common/AppWrapper";
import { uid, objectId, setCaretToEnd } from "../../../utils/index";
import EditableBlock from "../EditableBlock";
import Publish from "./Publish";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { usePrevious } from "../../hooks/usePrevious";
import { PhotographIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, savePost, saveAsDraft } from "./postSlice";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";
import { useLocation, useNavigate } from "react-router-dom";
import { URL_PATH } from "../../../utils/urlPath";
import sanitizeHtml from "sanitize-html";

const initialBlock = [
  { id: uid(), description: "Title here", tag: "h1" },
  {
    id: uid(),
    description: "Enter your content",
    tag: "p",
  },
];

const Post = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState(initialBlock);
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [mark, setMark] = useState("");
  const [draftId, setDraftId] = useState();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const prevBlocks = usePrevious(blocks);

  useEffect(() => {
    if (location?.state?.id) {
      const { id, draft_blocks } = location.state;
      setBlocks(draft_blocks);
      setDraftId(id);
    } else {
      setBlocks(initialBlock);
      setDraftId();
    }
    // dispatch(getPosts());
  }, [location.state]);

  // Handling the cursor and focus on adding and deleting blocks
  useEffect(() => {
    // If a new block was added, move the caret to it
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      let nextBlockPosition =
        blocks.map((b) => b.id).indexOf(currentBlockId) + 1;
      if (blocks[nextBlockPosition]) {
        nextBlockPosition = blocks[nextBlockPosition].id;
        const nextBlock = document.querySelector(
          `[data-position="${nextBlockPosition}"]`
        );
        if (nextBlock) {
          nextBlock.focus();
        }
      }
    }
    // If a block was deleted, move the caret to the end of the last block
    if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      let lastBlockPosition =
        prevBlocks.map((b) => b.id).indexOf(currentBlockId) - 1;
      lastBlockPosition =
        lastBlockPosition >= 0 && prevBlocks[lastBlockPosition].id;
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`
      );
      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    }
  }, [blocks, prevBlocks, currentBlockId]);

  const updateBlockHandler = (currentBlock) => {
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const oldBlock = blocks[index];
    const updatedBlocks = [...blocks];
    const { tag, description } = currentBlock;
    console.log(sanitizeHtml(description), ";;;");
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      description:
        ["ol", "ul"].includes(tag) &&
        !["<li>", "</li>"].includes(description) &&
        !["<li>", "</li>"].some((i) => description.includes(i))
          ? `<li>${description}</li>`
          : currentBlock.description,
      imageUrl: currentBlock.imageUrl,
    };
    if (
      index === blocks.length - 1 &&
      ["code", "blockquote"].includes(currentBlock.tag)
    ) {
      const newBlock = {
        id: objectId(),
        tag: "p",
        description: "",
        imageUrl: "",
      };
      updatedBlocks.splice(index + 1, 0, newBlock);
    }
    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock, addAtPosition) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];

    if (addAtPosition === "start" && currentBlock.description) {
      if (index - 1 === -1) {
        updatedBlocks.unshift(...currentBlock.newBlock);
      } else {
        updatedBlocks.splice(index, 0, ...currentBlock.newBlock);
      }
    } else if (addAtPosition === "middle") {
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        description: currentBlock.rangeBeforeText,
      };
      updatedBlocks.splice(index + 1, 0, ...currentBlock.newBlock);
    } else {
      // const newBlock = [
      //   {
      //     id: objectId(),
      //     tag: "p",
      //     descripti      //     imageUrl: "",
      //   },
      // ];
      updatedBlocks.splice(index + 1, 0, ...currentBlock.newBlock);
    }
    setBlocks(updatedBlocks);
  };

  const stripeHTML = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const deleteBlockHandler = (currentBlock) => {
    if (blocks.length > 1) {
      setCurrentBlockId(currentBlock.id);
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const deletedBlock = blocks[index];
      const updatedBlocks = [...blocks];
      if (currentBlock.deleteAtPosition === "start" && index - 1 >= 0) {
        updatedBlocks[index - 1].description =
          updatedBlocks[index - 1].description + deletedBlock.description;
      }
      index && updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
    }
  };

  const onDragEndHandler = (result) => {
    const { destination, source } = result;

    // If we don't have a destination (due to dropping outside the droppable)
    // or the destination hasn't changed, we change nothing
    if (
      !destination ||
      destination.index === source.index ||
      destination.index === 1
    ) {
      return;
    }

    const updatedBlocks = [...blocks];
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
    setBlocks(updatedBlocks);
  };

  const moveToBlock = (currentBlock) => {
    let nextBlockPosition = blocks.map((b) => b.id).indexOf(currentBlock.id);
    nextBlockPosition += currentBlock.direction === "up" ? -1 : 1;
    nextBlockPosition =
      nextBlockPosition >= 0 && blocks[nextBlockPosition]
        ? blocks[nextBlockPosition].id
        : null;
    const nextBlock = document.querySelector(
      `[data-position="${nextBlockPosition}"]`
    );
    if (nextBlock) {
      nextBlock.focus();
    }
  };

  const chooseCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
    }
  };

  const concatAllBlocks = () => {
    console.log(blocks);
    let description = "";
    let markdown = "";
    const nhm = new NodeHtmlMarkdown();
    blocks.forEach((item) => {
      description += `<${item.tag}>${item.description}</${item.tag}> /n`;
      markdown += `${nhm.translate(
        `<${item.tag}>${item.description}</${item.tag}>`
      )}  `;
    });
    console.log(description, markdown);
    return { description, markdown };
  };

  const handleSavePost = async (isDraft) => {
    if (isDraft) {
      await dispatch(saveAsDraft({ draftId, blocks, isDraft }));
      navigate(URL_PATH.DRAFT);
    } else {
      const concatedBlocks = concatAllBlocks() || {};
      concatedBlocks['blocks'] = blocks;
      concatedBlocks['draftId'] = draftId;
      await dispatch(savePost(concatedBlocks, isDraft));
      navigate(URL_PATH.HOME);
    }
  };

  return (
    <div className="Page flex justify-center mt-18 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
      {/* <p>{mark}</p> */}
      <div className="w-full lg:w-3/4 ml-20">
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
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {blocks.map((block, i) => {
                  const position =
                    blocks.map((b) => b.id).indexOf(block.id) + 1;
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
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="w-full lg:w-1/4 text-left pl-5">
        <Publish savePost={handleSavePost} />
      </div>
    </div>
  );
};

export default AppWrapper(Post);
