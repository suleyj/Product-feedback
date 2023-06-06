import React from "react";
import profileImg1 from "../assets/user-images/image-elijah.jpg";

const Comment = ({ fullname, username, comment_text, image_name }) => {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-4 border-b-[1px] border-gray pb-4 last:border-none">
      <img
        src={profileImg1}
        width="40"
        className=" rounded-full"
        alt="Message Icon"
      />
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-bold text-navyBlue">{fullname}</p>
          <p>@{username}</p>
        </div>

        <p className="font-semibold text-blue">Reply</p>
      </div>
      <p className="text-gray col-start-2">{comment_text}</p>
    </div>
  );
};

export default Comment;
