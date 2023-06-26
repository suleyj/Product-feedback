import { React, useState } from "react";
import FormDropdown from "../components/FormDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditFeedback = () => {
  const feedback = useLocation().state;
  console.log(feedback);
  const navigate = useNavigate();

  //Drop Down states
  const [active, setActive] = useState(false);
  const [statusActive, setStatusActive] = useState(false);
  const [select, setselect] = useState(feedback.tag);
  const [statusSelect, setStatusselect] = useState(feedback.status);

  const selectChange = (e) => {
    setselect(e.currentTarget.firstChild.innerHTML);
    setActive(!active);
  };

  const statusSelectChange = (e) => {
    setStatusselect(e.currentTarget.firstChild.innerHTML);
    setStatusActive(!statusActive);
  };
  const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];

  const status = ["Suggestion", "Planned", "In-Progress", "Live"];

  //Title and Description state
  const [title, settitle] = useState(feedback.title);
  const [description, setdescription] = useState(feedback.description);

  const onTitleChange = (e) => {
    settitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setdescription(e.target.value);
  };

  //Button event

  const BaseURL = "http://localhost:5000/feedback";

  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  const saveFeedback = async (e) => {
    e.preventDefault();
    let url = `${BaseURL}/${feedback.id}`;
    let payload = {
      title: title,
      category: select,
      status: statusSelect,
      description: description,
    };
    try {
      await axios.put(url, payload, config);
    } catch (error) {}
    navigate("/");
  };

  const deleteFeedback = async (e) => {
    e.preventDefault();
    let url = `${BaseURL}/${feedback.feedback_id}`;
    try {
      await axios.delete(url, config);
    } catch (error) {}
    navigate("/");
  };

  return (
    <div className=" text-sm px-6 pt-8 pb-16 text-gray md:max-w-[540px] md:mx-auto md:pt-14">
      <Link to="/" className="flex items-center gap-3 mb-14 ">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 9L2 5l4-4"
            stroke="#4661E6"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <p className="text-gray font-bold">Go Back</p>
      </Link>

      <form className="bg-white rounded-lg p-6 pt-16 relative">
        <div className="bg-purple inline-block p-4 rounded-full absolute top-0 -translate-y-1/2 ">
          <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
            <text
              transform="translate(-24 -20)"
              fill="#F2F4FE"
              fillRule="evenodd"
              fontFamily="Jost-Bold, Jost"
              fontSize="14"
              fontWeight="bold"
            >
              <tspan x="24" y="27.5">
                +
              </tspan>
            </text>
          </svg>
        </div>
        <p className="text-navyBlue font-bold text-lg mb-6">
          Editing '{feedback.title}'
        </p>
        <p className="font-bold text-navyBlue mb-1">Feedback Title</p>
        <p className=" mb-4">Add a short, descriptive headline</p>
        <textarea
          className="border-none resize-none bg-lightIndigo rounded-md w-full h-12 p-3 outline-1 outline-blue pb-1"
          value={title}
          onChange={(e) => onTitleChange(e)}
        />
        <p className="font-bold text-navyBlue mb-1">Category</p>
        <p className="mb-4">Choose a category for your feedback</p>
        <FormDropdown
          selectChange={selectChange}
          active={active}
          select={select}
          activeChange={setActive}
          options={categories}
        />
        <p className="font-bold text-navyBlue mb-1">Update Status</p>
        <p className="mb-4">Change feature state</p>
        <FormDropdown
          selectChange={statusSelectChange}
          active={statusActive}
          select={statusSelect}
          activeChange={setStatusActive}
          options={status}
        />
        <p className="font-bold text-navyBlue mb-1">Feedback Detail</p>
        <p className="mb-4">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          className="border-none resize-none bg-lightIndigo rounded-md w-full h-28 mb-10 p-3 outline-1 outline-blue pb-1"
          value={description}
          onChange={(e) => onDescriptionChange(e)}
        />
        <div className="flex flex-col gap-2">
          <button
            className=" bg-purple text-lightIndigo font-bold rounded-lg px-14 py-3"
            onClick={saveFeedback}
          >
            Save Changes
          </button>
          <button
            className=" bg-red  text-lightIndigo font-bold rounded-lg px-14 py-3"
            onClick={deleteFeedback}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFeedback;
