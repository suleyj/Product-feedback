import React from "react";

const Status = (props) => {
  return (
    <div className="flex justify-between mb-2">
      <div className="flex items-center">
        <div className={"w-2 h-2 rounded-full mr-2 " + props.color}>&nbsp;</div>
        <p>{props.title}</p>
      </div>
      <p className="font-bold">0</p>
    </div>
  );
};

export default Status;
