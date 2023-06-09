import { React, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import FormDropdown from "../components/FormDropdown";
import axios from "axios";
import { UserContext } from "../context/userContext";

const BaseURL = "http://localhost:5000/feedback";
const reducer = (state, action) => {
  switch (action.type) {
    case "newTitle":
      return { ...state, title: action.payload };
    case "newDetails":
      return { ...state, details: action.payload };
    case "newSelect":
      return { ...state, myActive: !state.myActive, mySelect: action.payload };
    case "newActive":
      return { ...state, myActive: !state.myActive };
    case "newSubmitMsg":
      return { ...state, submitMsg: action.payload };
    case "newTitleMsg":
      return {
        ...state,
        titleMsg: action.payload,
      };
    case "newDetailsMsg":
      return {
        ...state,
        detailsMsg: action.payload,
      };
    case "titleOutline":
      return {
        ...state,
        titleOutline: action.payload,
      };
    case "detailsOutline":
      return {
        ...state,
        detailsOutline: action.payload,
      };
    default:
      return null;
  }
};
const AddFeedback = () => {
  const { userdata } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    details: "",
    myActive: false,
    mySelect: "Feature",
    submitMsg: "",
    titleMsg: "",
    detailsMsg: "",
    titleOutline: false,
    detailsOutline: false,
  });

  const selectChange = (e) => {
    dispatch({
      type: "newSelect",
      payload: e.currentTarget.firstChild.innerHTML,
    });
  };

  const titleChange = (e) => {
    dispatch({ type: "newTitle", payload: e.target.value });
    if (e.target.value) {
      dispatch({
        type: "newTitleMsg",
        payload: "",
      });
      dispatch({
        type: "titleOutline",
        payload: false,
      });
    }
  };

  const detailsChange = (e) => {
    dispatch({ type: "newDetails", payload: e.target.value });
    if (e.target.value) {
      dispatch({
        type: "newDetailsMsg",
        payload: "",
      });
      dispatch({
        type: "detailsOutline",
        payload: false,
      });
    }
  };

  let test = (e) => {
    e.preventDefault();
    let missingInputFlag = false;
    if (!state.title) {
      missingInputFlag = true;
      dispatch({ type: "newTitleMsg", payload: "Cant be empty" });
      dispatch({
        type: "titleOutline",
        payload: true,
      });
    }

    if (!state.details) {
      missingInputFlag = true;
      dispatch({ type: "newDetailsMsg", payload: "Cant be empty" });
      dispatch({
        type: "detailsOutline",
        payload: true,
      });
    }

    if (missingInputFlag) {
      return;
    } else {
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      axios
        .post(
          BaseURL,
          {
            account_id: userdata.id,
            title: state.title,
            details: state.details,
            category: state.mySelect,
          },
          config
        )
        .then(function (response) {
          dispatch({ type: "newSubmitMsg", payload: "New feedback created!" });
          dispatch({ type: "newDetails", payload: "" });
          dispatch({ type: "newTitle", payload: "" });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: "newSubmitMsg",
            payload: "Duplicate feedback title",
          });
        });
    }
  };

  return (
    <div className=" text-sm px-8 text-gray md:max-w-[540px] md:mx-auto md:pt-8">
      <Link to="/" className="flex items-center gap-3 mb-10 ">
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

      <form className="bg-white rounded-lg p-6 pt-8 relative mb-1">
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
          Create New Feedback
        </p>
        <p className="font-bold text-navyBlue mb-1">Feedback Title</p>
        <p className=" mb-4">Add a short, descriptive headline</p>
        <textarea
          className={`resize-none bg-lightIndigo rounded-md w-full h-12 p-3 outline-1 outline-blue pb-1 ${
            state.titleOutline ? "border-red border-2 border-solid" : ""
          } cursor-pointer`}
          onChange={titleChange}
          value={state.title}
        />
        <p className="text-red h-6">{state.titleMsg}</p>
        <p className="font-bold text-navyBlue mb-1">Category</p>
        <p className="mb-4">Choose a category for your feedback</p>
        <FormDropdown
          selectChange={selectChange}
          active={state.myActive}
          select={state.mySelect}
          activeChange={(e) => {
            dispatch({ type: "newActive" });
          }}
          options={["Feature", "UI", "UX", "Enhancement", "Bug"]}
        />
        <p className="font-bold text-navyBlue mb-1">Feedback Detail</p>
        <p className="mb-4">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          className={`resize-none bg-lightIndigo rounded-md w-full h-20 p-3 outline-1 outline-blue pb-1 ${
            state.detailsOutline ? "border-red border-2 border-solid" : ""
          } cursor-pointer`}
          onChange={detailsChange}
          value={state.details}
        />
        <p className="text-red h-6">{state.detailsMsg}</p>
        <button
          type="submit"
          className="block w-full bg-purple text-lightIndigo font-bold rounded-lg px-14 py-3"
          onClick={test}
        >
          Add Feedback
        </button>
      </form>
      <p
        className={`${
          state.submitMsg === "New feedback created!"
            ? "text-green-600"
            : "text-red"
        } font-bold`}
      >
        {state.submitMsg}
      </p>
    </div>
  );
};

export default AddFeedback;
