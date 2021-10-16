import React, { useState } from "react";
import { AppWrapper } from "../../common/AppWrapper";
import { uid } from "../../../utils/index";
import EditableBlock from "../EditableBlock";

const Post = () => {
  const [blocks, setBlocks] = useState([{ id: uid(), html: "Test", tag: "p" }]);

  const updatePageHandler = (updatedBlock) => {
    const blockElements = blocks;
    const index = blockElements.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blockElements];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
    };
    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const blockElements = blocks;
    const index = blockElements.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blockElements];
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks);
    console.log(currentBlock.ref.nextElementSibling)
    currentBlock.ref.nextElementSibling.focus();
  };

  const setCaretToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
  };

  const deleteBlockHandler = (currentBlock) => {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const blockElements = blocks;
      const index = blockElements.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blockElements];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks, () => {
        setCaretToEnd(previousBlock);
        previousBlock.focus();
      });
    }
  };

  return (
    <div className="p-10 flex justify-center">
      {blocks.map((block, key) => (
        <EditableBlock
          ey={key}
          id={block.id}
          tag={block.tag}
          html={block.html}
          updatePage={updatePageHandler}
          addBlock={addBlockHandler}
          deleteBlock={deleteBlockHandler}
        />
      ))}
    </div>
  );
};

export default AppWrapper(Post)
