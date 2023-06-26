import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Feedback = ({
  title,
  description,
  tag,
  upvotes,
  comments,
  feedback_id,
  account_id,
  status,
  category,
}) => {
  const [upvote, setupvote] = useState(false);

  const upvoteStyle = "text-white bg-blue";

  const url = "http://localhost:5000/upvote";

  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  let payload = {
    account_id: account_id,
    feedback_id: feedback_id,
  };

  const toggleUpvote = async () => {
    setupvote(!upvote);
    try {
      if (upvote) {
        await axios.post(url, payload, config);
      } else {
        await axios.delete(url, payload, config);
      }
    } catch (error) {}
  };

  return (
    <div className="bg-white p-6 rounded-xl text-sm grid grid-cols-2 md:grid-cols-6 md:px-8 md:py-7 text-navyBlue">
      <div className=" col-span-2 md:col-span-4">
        <p className=" font-bold mb-3">{title}</p>
        <p className="text-gray mb-2">{description}</p>
        <div className="rounded-lg px-4 py-2 inline-block text-blue bg-lightIndigo font-bold mb-2">
          {tag}
        </div>
      </div>
      <button
        className={`rounded-lg px-4 py-2 bg-lightIndigo text-navyBlue font-bold flex hidden items-center gap-2 md:justify-self-start md:order-first md:self-start  md:flex-col md:px-2 md:py-3 hover:bg-lightPurple md:w-10 w-[75px] justify-between ${
          upvote ? upvoteStyle : null
        }`}
        onClick={toggleUpvote}
      >
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6l4-4 4 4"
            stroke={upvote ? "#fff" : "#4661E6"}
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        {upvotes}
      </button>

      <Link
        to="/detail"
        state={{
          title,
          description,
          tag,
          upvotes,
          feedback_id,
          status,
          category,
        }}
        className="flex items-center gap-2 text-navyBlue font-bold justify-self-end"
      >
        <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
            fill="#CDD2EE"
            fillRule="nonzero"
          />
        </svg>
        {comments}
      </Link>
    </div>
  );
};

export default Feedback;
