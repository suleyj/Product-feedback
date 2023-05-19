import React from "react";

const Tag = (props) => {
  const style =
    props.selectedTag === props.tagName ? " text-white font bg-blue" : "";
  return (
    <div
      className={
        "rounded-lg px-4 py-2 inline-block bg-gray-300 text-blue bg-lightIndigo font-bold text-[13px] cursor-pointer" +
        style
      }
      onClick={props.onTagClick}
    >
      {props.tagName}
    </div>
  );
};

export default Tag;
