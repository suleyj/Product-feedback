import React from "react";
import { Link } from "react-router-dom";

const Feedback = ({ title, description, tag, upvotes, comments, id }) => {
  return (
    <div className="bg-white p-6 rounded-xl text-sm grid grid-cols-2 md:grid-cols-6 md:px-8 md:py-7">
      <div className=" col-span-2 md:col-span-4">
        <p className="text-navyBlue font-bold mb-3">{title}</p>
        <p className="text-gray mb-2">{description}</p>
        <div className="rounded-lg px-4 py-2 inline-block text-blue bg-lightIndigo font-bold mb-2">
          {tag}
        </div>
      </div>
      <div className="rounded-lg px-4 py-2 bg-lightIndigo text-navyBlue font-bold flex items-center gap-2 justify-self-start md:order-first md:self-start  md:flex-col md:px-3 md:py-4">
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6l4-4 4 4"
            stroke="#4661E6"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        {upvotes}
      </div>

      <Link
        to="/detail"
        state={{ title, description, tag, upvotes, id }}
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
