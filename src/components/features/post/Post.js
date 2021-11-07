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

const initialBlock = [
  { _id: uid(), description: "Title here", tag: "h1" },
  {
    _id: uid(),
    description: "Enter your content",
    tag: "p",
  },
];

const Post = ({ id, fetchedBlocks, err }) => {
  const [blocks, setBlocks] = useState(initialBlock);
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [mark, setMark] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  const prevBlocks = usePrevious(blocks);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  // Handling the cursor and focus on adding and deleting blocks
  useEffect(() => {
    // If a new block was added, move the caret to it
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      let nextBlockPosition =
        blocks.map((b) => b._id).indexOf(currentBlockId) + 1;
      nextBlockPosition = blocks[nextBlockPosition]._id;
      const nextBlock = document.querySelector(
        `[data-position="${nextBlockPosition}"]`
      );
      if (nextBlock) {
        nextBlock.focus();
      }
    }
    // If a block was deleted, move the caret to the end of the last block
    if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      let lastBlockPosition =
        prevBlocks.map((b) => b._id).indexOf(currentBlockId) - 1;
      lastBlockPosition =
        lastBlockPosition >= 0 && prevBlocks[lastBlockPosition]._id;
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`
      );
      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    }
  }, [blocks, prevBlocks, currentBlockId]);

  const updateBlockHandler = (currentBlock) => {
    const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const oldBlock = blocks[index];
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      description: currentBlock.description,
      imageUrl: currentBlock.imageUrl,
    };
    if (index === blocks.length - 1 && (currentBlock.tag === 'code' || currentBlock.tag === 'blockquote')) {
      const newBlock = {
        _id: objectId(),
        tag: "p",
        description: "",
        imageUrl: "",
      };
      updatedBlocks.splice(index + 1, 0, newBlock);
    }
    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    const newBlock = [
      {
        _id: objectId(),
        tag: "p",
        description: "",
        imageUrl: "",
      },
    ];

    updatedBlocks.splice(index + 1, 0, ...newBlock);
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      description: currentBlock.description,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock) => {
    if (blocks.length > 1) {
      setCurrentBlockId(currentBlock.id);
      const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
      const deletedBlock = blocks[index];
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
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
    let nextBlockPosition = blocks.map((b) => b._id).indexOf(currentBlock.id);
    nextBlockPosition += currentBlock.direction === "up" ? -1 : 1;
    nextBlockPosition =
      nextBlockPosition >= 0 && blocks[nextBlockPosition]
        ? blocks[nextBlockPosition]._id
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

  const handleSavePost = async (isDraft) => {
    if (isDraft) {
      const nhm = new NodeHtmlMarkdown();
      blocks.forEach((item) => {
        let mark = nhm.translate(
          `<${item.tag}>${item.description}</${item.tag}>`
        );
        item.description = `<${item.tag}>${item.description}</${item.tag}>`
        console.log(mark);
        setMark(mark);
      });
      await dispatch(saveAsDraft(blocks, isDraft));
    } else {
      await dispatch(savePost(blocks, isDraft));
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
            {coverImage && <img src={coverImage} className="h-60 w-full object-cover" />}
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
                    blocks.map((b) => b._id).indexOf(block._id) + 1;
                  return (
                    <EditableBlock
                      index={position}
                      key={block._id}
                      position={block._id}
                      id={block._id}
                      tag={block.tag}
                      description={block.description}
                      imageUrl={block.imageUrl}
                      pageId={id}
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
