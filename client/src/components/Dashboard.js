import React, { useState } from "react";
import hamIcon from "../assets/shared/mobile/icon-hamburger.svg";
import closeIcon from "../assets/shared/mobile/icon-close.svg";
import Tag from "./Tag";
import Status from "./Status";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <div className="md:grid md:grid-cols-3 md:gap-2.5 lg:grid-cols-1 lg:gap-x-0 lg:flex lg:flex-col">
      {show && (
        <div className="fixed h-[90vh] transition duration-[0.7s] ease-in-out w-screen bg-overlay  z-[100] md:hidden"></div>
      )}
      <div className=" bg-gradientMobile md:bg-gradientTablet lg:bg-gradientDesktop bg-cover text-white px-6 py-2 flex justify-between items-center w-full fixed z-[100] md:static md:col-span-1 md:items-end md:pb-6 md:rounded-xl lg:h-[186.5px]">
        <div>
          <p className="font-bold">Frontend Mentor</p>
          <p className="text-sm">Feedback Board</p>
        </div>
        <div onClick={toggle} className="md:hidden">
          {!show ? (
            <img src={hamIcon} alt="Mobile Icon" />
          ) : (
            <img className="" src={closeIcon} alt="Mobile Icon" />
          )}
        </div>
      </div>
      <div
        className={
          show
            ? " fixed top-[60px] transition-all duration-[0.5s] ease-in-out bg-lightIndigo w-4/5 px-6 pt-6 h-screen z-[100] right-[0] md:static md:w-full md:h-auto md:p-0 md:grid md:grid-flow-col md:auto-cols-[1fr] md:col-span-2 md:gap-2.5 lg:flex lg:flex-col"
            : " fixed top-[60px] transition-all duration-[0.5s] ease-in-out bg-lightIndigo w-4/5 px-6 pt-6 h-screen z-[100] right-[-100%] opacity-0 md:static md:w-full md:h-auto md:p-0 md:opacity-100 md:grid md:grid-flow-col md:auto-cols-[1fr] md:col-span-2 md:gap-2.5 lg:flex lg:flex-col"
        }
      >
        <div className="bg-white mb-6 p-6 flex flex-wrap gap-x-2 gap-y-4 rounded-xl md:mb-0">
          <Tag
            tagName="All"
            selectedTag={props.chosenTag}
            onTagClick={props.onTagClick}
          />
          <Tag
            tagName="UI"
            selectedTag={props.chosenTag}
            onTagClick={props.onTagClick}
          />
          <Tag
            tagName="UX"
            selectedTag={props.chosenTag}
            onTagClick={props.onTagClick}
          />
          <Tag
            tagName="User"
            selectedTag={props.chosenTag}
            onTagClick={props.onTagClick}
          />
          <Tag
            tagName="Enhancement"
            selectedTag={props.chosenTag}
            onTagClick={props.onTagClick}
          />
          <Tag
            tagName="Bug"
            selectedTag={props.chosenTag}
            onTagClick={props.onTagClick}
          />
          <Tag
            tagName="Feature"
            selectedTag={props.chosenTag}
            onTagClick={props.onTagClick}
          />
        </div>
        <div className="bg-white text-navyBlue p-6 rounded-xl">
          <div className="flex justify-between mb-6">
            <p className="text-lg font-bold">Roadmap</p>
            <Link to="/roadmap" className="text-blue underline" href="#">
              View
            </Link>
          </div>
          <Status title="Planned" color="bg-orange" />
          <Status title="In-Progress" color="bg-purple" />
          <Status title="Live" color="bg-lightBlue" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
