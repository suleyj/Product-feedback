import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa6";
import RoadFeedback from "../components/RoadFeedback";
import axios from "axios";

const RoadMap = () => {
    const [feedbackData, setfeedbackData] = useState<Feedback[]>([]);

    useEffect(() => {
        const config = {
            headers: {
                token: localStorage.getItem("token"),
            },
        };

        const url = "/api/feedback";

        axios.get(url, config).then((res) => {
            setfeedbackData(res.data);
        });
    }, []);

    const plannedFeed = feedbackData.filter((feedback) => {
        return feedback.status === "Planned";
    });

    const progressFeed = feedbackData.filter((feedback) => {
        return feedback.status === "In-Progress";
    });

    const liveFeed = feedbackData.filter((feedback) => {
        return feedback.status === "Live";
    });

    const [activeStatus, setActiveStatus] = useState("Planned");
    const handleStatusClick = (status: string) => {
        setActiveStatus(status);
    };

    const plannedStyle = "text-dark !border-b-orange !border-b-4";
    const inProgressStyle = "text-dark !border-b-purple !border-b-4";
    const liveStyle = "text-dark !border-b-lightBlue !border-b-4";

    return (
        <div className="text-sm text-gray md:px-10 md:py-10 md:max-w-[1100px] md:mx-auto ">
            <div className="flex justify-between items-center bg-dark text-white px-6 py-7 md:rounded-lg md:mb-12">
                <div>
                    <Link to="/" className="flex items-center gap-3 mb-1">
                        <svg
                            width="7"
                            height="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
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
                    <FaPlus />
                    <p>Add Feedback</p>
                </Link>
            </div>
            <div className="flex  justify-around font-bold  text-center mb-6 md:hidden">
                <p
                    className={` w-24 flex-1 border-b-gray border-b-[1px] py-5 md:border-none ${
                        activeStatus === "Planned" ? plannedStyle : null
                    }`}
                    onClick={() => handleStatusClick("Planned")}
                >
                    Planned ({plannedFeed.length})
                </p>
                <p
                    className={`${
                        activeStatus === "In-Progress" ? inProgressStyle : null
                    } w-24 flex-1 border-b-gray border-b-[1px] py-5 md:border-none `}
                    onClick={() => handleStatusClick("In-Progress")}
                >
                    In-Progress ({progressFeed.length})
                </p>
                <p
                    className={` w-24 flex-1 border-b-gray border-b-[1px] py-5 md:border-none ${
                        activeStatus === "Live" ? liveStyle : null
                    }`}
                    onClick={() => handleStatusClick("Live")}
                >
                    Live ({liveFeed.length})
                </p>
            </div>
            <div className="px-6 flex flex-col content-center flex-wrap md:hidden">
                <p className="font-bold text-lg mb-2 text-dark">
                    {activeStatus} (
                    {
                        feedbackData.filter((f) => f.status === activeStatus)
                            .length
                    }
                    )
                </p>
                {/* <p className="mb-6">Features currently being developed</p> */}
                <div className="grid grid-cols-1 gap-4 pb-36">
                    {feedbackData
                        .filter((f) => f.status === activeStatus)
                        .map((feedback, index) => {
                            return (
                                <RoadFeedback
                                    title={feedback.title}
                                    description={feedback.details}
                                    tag={feedback.category}
                                    upvotes="112"
                                    comments={feedback.comment_count ?? 0}
                                    status={feedback.status}
                                    key={index}
                                    feedback_id={feedback.id}
                                />
                            );
                        })}
                </div>
            </div>

            <div className="md:flex px-10 gap-3 justify-between md:px-0 hidden ">
                <div className="flex-1">
                    <p className="font-bold">Planned ({plannedFeed.length})</p>
                    <p className="mb-8"> Ideas prioritized for research</p>
                    <div className="grid grid-cols-1 gap-4 pb-36">
                        {plannedFeed.map((feedback, index) => {
                            return (
                                <RoadFeedback
                                    title={feedback.title}
                                    description={feedback.details}
                                    tag={feedback.category}
                                    upvotes="112"
                                    comments={feedback.comment_count ?? 0}
                                    status={feedback.status}
                                    key={index}
                                    feedback_id={feedback.id}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1">
                    <p className="font-bold">
                        In Progress ({progressFeed.length})
                    </p>
                    <p className="mb-8"> Currently being developed</p>
                    <div className="grid grid-cols-1 gap-4 pb-36">
                        {progressFeed.map((feedback, index) => {
                            return (
                                <RoadFeedback
                                    title={feedback.title}
                                    description={feedback.details}
                                    tag={feedback.category}
                                    upvotes="112"
                                    comments={feedback.comment_count ?? 0}
                                    status={feedback.status}
                                    key={index}
                                    feedback_id={feedback.id}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1">
                    <p className="font-bold">Live ({liveFeed.length})</p>
                    <p className="mb-8"> Released Features</p>
                    <div className="grid grid-cols-1 gap-4 pb-36">
                        {liveFeed.map((feedback, index) => {
                            return (
                                <RoadFeedback
                                    title={feedback.title}
                                    description={feedback.details}
                                    tag={feedback.category}
                                    upvotes="112"
                                    comments={feedback.comment_count ?? 0}
                                    status={feedback.status}
                                    key={index}
                                    feedback_id={feedback.id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadMap;
