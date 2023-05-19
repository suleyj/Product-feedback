import React from "react";
import { Link } from "react-router-dom";

const RoadFeedback = ({
  title,
  description,
  tag,
  upvotes,
  comments,
  status,
}) => {
  let color = "";
  switch (status) {
    case "In Progress":
      color = "purple";
      break;
    case "Planned":
      color = "orange";
      break;
    case "Live":
      color = "lightBlue";
      break;
    default:
      break;
  }

  return (
    <div
      className={`bg-white p-6 rounded-lg text-sm border-t-${color} border-t-8`}
    >
      <div className="flex items-center mb-4">
        <div className={`w-2 h-2 rounded-full mr-2 bg-${color} bg-t`}>
          &nbsp;
        </div>
        <p>{status}</p>
      </div>

      <p className="text-navyBlue font-bold mb-3">{title}</p>
      <p className="text-gray mb-2">{description}</p>
      <div className="rounded-lg px-4 py-2 inline-block text-blue bg-lightIndigo hover:bg-blue hover:text-white font-bold mb-2">
        {tag}
      </div>
      <div className="flex justify-between">
        <div className="rounded-lg px-4 py-2 bg-lightIndigo text-navyBlue font-bold flex items-center gap-2">
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
          className="flex items-center gap-2 text-navyBlue font-bold"
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
    </div>
  );
};

export default RoadFeedback;
