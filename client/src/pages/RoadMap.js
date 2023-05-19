import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import plusIcon from "../assets/shared/icon-plus.svg";
import RoadFeedback from "../components/RoadFeedback";

const RoadMap = () => {
  const [activeStatus, setActiveStatus] = useState("In Progress");
  const handleStatusClick = (status) => {
    setActiveStatus(status);
  };

  let plannedStyle = "text-dark border-b-orange border-b-4";
  let inProgressStyle = "text-dark border-b-purple border-b-4";
  let liveStyle = "text-dark border-b-lightBlue border-b-4";

  return (
    <div className="text-sm text-gray">
      <div className="flex justify-between items-center bg-dark text-white px-6 py-7">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-1">
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 9L2 5l4-4"
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
            <p className="font-bold">Go Back</p>
          </Link>
          <p className="font-bold text-lg">RoadMap</p>
        </div>

        <Link
          to="/add"
          className="bg-purple flex px-6 py-3 text-white font-bold items-center gap-1 rounded-lg"
        >
          <img src={plusIcon} alt="Plus icon" />
          <p>Add Feedback</p>
        </Link>
      </div>
      <div className="flex  justify-around font-bold  text-center mb-6">
        <p
          className={` w-24 flex-1 border-b-gray border-b-[1px] py-5 md:border-none ${
            activeStatus === "Planned" ? plannedStyle : null
          }`}
          onClick={() => handleStatusClick("Planned")}
        >
          Planned (2)
        </p>
        <p
          className={` w-24 flex-1 border-b-gray border-b-[1px] py-5 md:border-none ${
            activeStatus === "In Progress" ? inProgressStyle : null
          }`}
          onClick={() => handleStatusClick("In Progress")}
        >
          In-Progress (3)
        </p>
        <p
          className={` w-24 flex-1 border-b-gray border-b-[1px] py-5 md:border-none ${
            activeStatus === "Live" ? liveStyle : null
          }`}
          onClick={() => handleStatusClick("Live")}
        >
          Live (1)
        </p>
      </div>
      <div className="px-6">
        <p className="font-bold text-lg mb-2 text-dark">In-Progress (3)</p>
        <p className="mb-6">Features currently being developed</p>
        <RoadFeedback
          title="Add tags for solutions"
          description="Easier to search for solutions based on a specific stack"
          tag="Enhancement"
          upvotes="112"
          comments="2"
          status="Live"
        />
      </div>
    </div>
  );
};

export default RoadMap;
