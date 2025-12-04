import plusIcon from "../assets/shared/icon-new-feedback.svg";
import { useReducer, useContext } from "react";
import { Link } from "react-router";
import FormDropdown from "../components/FormDropdown";
import axios from "axios";
import UserContext from "../context/userContext";

type FeedbackState = {
    title: string;
    details: string;
    myActive: boolean;
    mySelect: string;
    submitMsg: string;
    titleMsg: string;
    detailsMsg: string;
    titleOutline: boolean;
    detailsOutline: boolean;
};

type Action =
    | { type: "newTitle"; payload: string }
    | { type: "newDetails"; payload: string }
    | { type: "newSelect"; payload: string }
    | { type: "newActive" }
    | { type: "newSubmitMsg"; payload: string }
    | { type: "newTitleMsg"; payload: string }
    | { type: "newDetailsMsg"; payload: string }
    | { type: "titleOutline"; payload: boolean }
    | { type: "detailsOutline"; payload: boolean };

const BaseURL = "/api/feedback";
const reducer = (state: FeedbackState, action: Action) => {
    switch (action.type) {
        case "newTitle":
            return { ...state, title: action.payload };
        case "newDetails":
            return { ...state, details: action.payload };
        case "newSelect":
            return {
                ...state,
                myActive: !state.myActive,
                mySelect: action.payload,
            };
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
            return state;
    }
};
export default function AddFeedback() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useContext must be inside a UserProvider");
    }

    const { user } = context;

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

    const selectChange = (value: string) => {
        dispatch({
            type: "newSelect",
            payload: value,
        });
        clearSubmitMsg();
    };

    const titleChange = (value: string) => {
        dispatch({ type: "newTitle", payload: value });
        if (value) {
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

    const clearSubmitMsg = () => {
        dispatch({
            type: "newSubmitMsg",
            payload: "",
        });
    };

    const detailsChange = (value: string) => {
        dispatch({ type: "newDetails", payload: value });
        if (value) {
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

    const submit = (e: React.FormEvent) => {
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
                        user_id: user?.id,
                        title: state.title,
                        details: state.details,
                        category: state.mySelect,
                    },
                    config,
                )
                .then(function () {
                    dispatch({
                        type: "newSubmitMsg",
                        payload: "New feedback created!",
                    });
                    dispatch({ type: "newDetails", payload: "" });
                    dispatch({ type: "newTitle", payload: "" });
                })
                .catch(function () {
                    dispatch({
                        type: "newSubmitMsg",
                        payload: "Error occured when adding feedback",
                    });
                });
        }
    };

    console.log(state.detailsOutline)

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
                <p className="font-bold text-gray">Go Back</p>
            </Link>

            <form className="relative p-6 pt-8 mb-1 bg-white rounded-lg">
                <div className="absolute top-0 inline-block -translate-y-1/2 rounded-full w-12">
                    <img src={plusIcon} />
                </div>
                <p className="mb-6 text-lg font-bold text-navyBlue">
                    Create New Feedback
                </p>
                <p className="mb-1 font-bold text-navyBlue">Feedback Title</p>
                <p className="mb-4 ">Add a short, descriptive headline</p>
                <textarea
                    className={`resize-none bg-lightIndigo rounded-md w-full h-12 p-3 focus:outline-1 focus:outline-blue pb-1 ${
                        state.titleOutline
                            ? "border-red border-2 border-solid"
                            : ""
                    } cursor-pointer`}
                    onChange={(e) => titleChange(e.target.value)}
                    onFocus={clearSubmitMsg}
                    value={state.title}
                />
                <p className="h-6 text-red my-1">{state.titleMsg}</p>
                <p className="mb-1 font-bold text-navyBlue">Category</p>
                <p className="mb-4">Choose a category for your feedback</p>
                <FormDropdown
                    selectChange={selectChange}
                    active={state.myActive}
                    select={state.mySelect}
                    activeChange={() => {
                        dispatch({ type: "newActive" });
                    }}
                    options={["Feature", "UI", "UX", "Enhancement", "Bug"]}
                />
                <p className="mb-1 font-bold text-navyBlue">Feedback Detail</p>
                <p className="mb-4">
                    Include any specific comments on what should be improved,
                    added, etc.
                </p>
                <textarea
                    className={`resize-none bg-lightIndigo rounded-md w-full h-20 p-3 focus:outline-1 focus:outline-blue pb-1 ${
                        state.detailsOutline
                            ? "border-red border-2 border-solid"
                            : ""
                    } cursor-pointer`}
                    onChange={(e) => detailsChange(e.target.value)}
                    onFocus={clearSubmitMsg}
                    value={state.details}
                />
                <p className="h-6 text-red my-1">{state.detailsMsg}</p>
                <button
                    type="submit"
                    className="block w-full py-3 font-bold rounded-lg bg-purple text-lightIndigo px-14"
                    onClick={submit}
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
}
