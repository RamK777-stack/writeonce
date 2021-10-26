import React, { useState, useEffect } from "react";
import { AppWrapper } from "../../common/AppWrapper";
import { uid, objectId, setCaretToEnd } from "../../../utils/index";
import EditableBlock from "../EditableBlock";
import Publish from "./Publish";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { usePrevious } from "../../hooks/usePrevious";
import { PhotographIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postSlice";

const initialBlock = [
  { _id: uid(), html: "", tag: "h1" },
  { _id: uid(), html: "", tag: "p" },
];

const Post = ({ id, fetchedBlocks, err }) => {
  const [blocks, setBlocks] = useState(initialBlock);
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  const prevBlocks = usePrevious(blocks);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  // Handling the cursor and focus on adding and deleting blocks
  useEffect(() => {
    console.log(prevBlocks, blocks);
    // If a new block was added, move the caret to it
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      const nextBlockPosition =
        blocks.map((b) => b._id).indexOf(currentBlockId) + 1 + 1;
      const nextBlock = document.querySelector(
        `[data-position="${nextBlockPosition}"]`
      );
      console.log(currentBlockId, nextBlockPosition, nextBlock, "111");
      if (nextBlock) {
        nextBlock.focus();
      }
    }
    // If a block was deleted, move the caret to the end of the last block
    if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      const lastBlockPosition = prevBlocks
        .map((b) => b._id)
        .indexOf(currentBlockId);
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
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    const newBlock = { _id: objectId(), tag: "p", html: "", imageUrl: "" };
    updatedBlocks.splice(index + 1, 0, newBlock);
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    console.log(updatedBlocks);
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
    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedBlocks = [...blocks];
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
    setBlocks(updatedBlocks);
  };

  const moveToBlock = (currentBlock) => {
    console.log(currentBlock, blocks);
    const nextBlockPosition = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const nextBlock = document.querySelector(
      `[data-position="${
        nextBlockPosition + (currentBlock.direction === "up" ? 0 : 2)
      }"]`
    );
    console.log(nextBlockPosition, ";;", currentBlock.direction);
    console.log(
      `[data-position="${
        nextBlockPosition + (currentBlock.direction === "up" ? 0 : 2)
      }"]`
    );
    if (nextBlock) {
      nextBlock.focus();
    }
  };
  

  return (
    <div className="Page flex justify-center mt-20 flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
      <div className="w-full lg:w-3/4 ml-24">
        <div className="ml-12 flex mb-5">
          <PhotographIcon className="h-5 w-5 mr-2" /> Add cover image
        </div>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId={uid()}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {blocks.map((block) => {
                  const position =
                    blocks.map((b) => b._id).indexOf(block._id) + 1;
                  return (
                    <EditableBlock
                      key={block._id}
                      position={position}
                      id={block._id}
                      tag={block.tag}
                      html={block.html}
                      imageUrl={block.imageUrl}
                      pageId={id}
                      addBlock={addBlockHandler}
                      deleteBlock={deleteBlockHandler}
                      updateBlock={updateBlockHandler}
                      moveToBlock={moveToBlock}
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
        <Publish />
      </div>
    </div>
  );
};

export default AppWrapper(Post);
