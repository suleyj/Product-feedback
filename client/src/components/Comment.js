import React from "react";
import profileImg1 from "../assets/user-images/image-elijah.jpg";

const Comment = ({ info }) => {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-4">
      <img
        src={profileImg1}
        width="40"
        className=" rounded-full"
        alt="Message Icon"
      />
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-bold text-navyBlue">Elijah Moss</p>
          <p>@hexagon.bestagon</p>
        </div>

        <p className="font-semibold text-blue">Reply</p>
      </div>
      <p className="text-gray col-span-2">{info}</p>
    </div>
  );
};

export default Comment;
