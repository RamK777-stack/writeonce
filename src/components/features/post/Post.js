import React, { useState } from "react";
import { AppWrapper } from "../../common/AppWrapper";
import { uid, setCaretToEnd } from "../../../utils/index";
import EditableBlock from "../EditableBlock";

const initialBlock = { id: uid(), html: "Test", tag: "p" };

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blocks: [initialBlock] };
  }

  updatePageHandler = (updatedBlock) => {
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
    };
    this.setState({ blocks: updatedBlocks });
  }

  moveToBlock = (currentBlock) => {
    const index = this.state.blocks.map((b) => b.id).indexOf(currentBlock.id);
    if(currentBlock.direction === 'up' && currentBlock.ref.previousElementSibling){
       currentBlock.ref.previousElementSibling.focus()
    }else if(currentBlock.direction === 'down' && currentBlock.ref.nextElementSibling){
        currentBlock.ref.nextElementSibling.focus()
    }
  }

  addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    console.log(updatedBlocks)
    updatedBlocks.splice(index + 1, 0, newBlock);
    this.setState({ blocks: updatedBlocks }, () => {
      console.log(currentBlock);
      currentBlock.ref.nextElementSibling.focus();
    });
  }

  deleteBlockHandler = (currentBlock) => {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const blocks = this.state.blocks;
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      this.setState({ blocks: updatedBlocks }, () => {
        setCaretToEnd(previousBlock);
        previousBlock.focus();
      });
    }
  }

  render() {
    return (
      <div className="Page flex justify-center mt-20">
        <div>
          {this.state.blocks.map((block, key) => {
            return (
              <EditableBlock
                key={key}
                id={block.id}
                tag={block.tag}
                html={block.html}
                updatePage={this.updatePageHandler}
                addBlock={this.addBlockHandler}
                deleteBlock={this.deleteBlockHandler}
                moveToBlock={this.moveToBlock}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default AppWrapper(Post);
