import { useState, useEffect, useContext } from "react";
import axios from "axios";
import suggestionsImg from "../assets/suggestions/icon-suggestions.svg";
import emptyImg from "../assets/suggestions/illustration-empty.svg";
import { FaPlus } from "react-icons/fa6";
import Dashboard from "../components/Dashboard";
import Dropdown from "../components/Dropdown";
import Feedback from "../components/Feedback";
import { Link } from "react-router";
import UserContext from "../context/userContext";
type Props = {
    loginUser: (isAuthenticated: boolean) => void;
};
const Home = ({ loginUser }: Props) => {
    const logout = () => {
        localStorage.removeItem("token");
        loginUser(false);
    };

    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useContext must be inside a UserProvider");
    }

    const { user } = context;

    const [active, setActive] = useState(false);
    const [select, setselect] = useState("Most Comments");
    const [feedbackData, setfeedbackData] = useState<Feedback[]>([]);
    const [chosenTag, setChosenTag] = useState("");

    const activeChange = () => {
        setActive(!active);
    };

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

    //status totals
    const PlannedTotal = feedbackData.filter((feedback) => {
        return feedback.status === "Planned";
    }).length;

    const InProgressTotal = feedbackData.filter((feedback) => {
        return feedback.status === "In-Progress";
    }).length;

    const LiveTotal = feedbackData.filter((feedback) => {
        return feedback.status === "Live";
    }).length;

    const feedbacks = feedbackData.filter((feedback) => {
        return feedback.status === "Suggestion";
    });

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

    const selectChange = (value: string) => {
        setselect(value);
        setActive(!active);
    };

    const onTagClick = (value: string) => setChosenTag(value);

    const mostUpvotes = (a: Feedback, b: Feedback) =>
        (b.upvote_count ?? 0) - (a.upvote_count ?? 0);

    const leastUpvotes = (a: Feedback, b: Feedback) =>
        (a.upvote_count ?? 0) - (b.upvote_count ?? 0);

    const mostComments = (a: Feedback, b: Feedback) =>
        (b.comment_count ?? 0) - (a.comment_count ?? 0);

    const leastComments = (a: Feedback, b: Feedback) =>
        (a.comment_count ?? 0) - (b.comment_count ?? 0);

    const sortFunc = (sort: string) => {
        switch (sort) {
            case "Most Upvotes":
                return mostUpvotes;
            case "Least Upvotes":
                return leastUpvotes;
            case "Most Comments":
                return mostComments;
            case "Least Comments":
                return leastComments;
            default:
                return undefined;
        }
    };

    const feedbackTotal = feedbacks.length;

    return (
        <div className="flex flex-col">
            <div className="md:px-9 md:py-14 max-w-[1110px] lg:grid lg:grid-cols-4 lg:mx-auto gap-[30px] h-full md:pb-0">
                <Dashboard
                    chosenTag={chosenTag}
                    onTagClick={(value: string) => onTagClick(value)}
                    plannedTotal={PlannedTotal}
                    inProgressTotal={InProgressTotal}
                    liveTotal={LiveTotal}
                />
                <div className="lg:col-span-3 lg:self-start">
                    <div className="bg-dark p-4 text-white flex flex-col items-center gap-6 min-[500px]:flex-row justify-between mt-[60px] md:mt-10 md:rounded-xl  lg:mt-0">
                        <div className="flex items-center gap-10">
                            <div className="hidden md:flex">
                                <img
                                    src={suggestionsImg}
                                    alt="Suggestions Icon"
                                    className="mr-4"
                                />
                                <p className="mr-2">{feedbackTotal}</p>
                                <p>Suggestions</p>
                            </div>
                            <Dropdown
                                selectChange={selectChange}
                                active={active}
                                select={select}
                                activeChange={() => activeChange()}
                            />
                        </div>
                        <div className="flex gap-6 order-first min-[500px]:order-2">
                            <button
                                className="flex items-center gap-1 px-6 py-3 text-xs font-bold text-white rounded-lg bg-slate-600"
                                onClick={() => logout()}
                            >
                                Logout
                            </button>
                            <Link
                                to="/add"
                                className="flex items-center gap-1 px-6 py-3 text-xs font-bold text-white rounded-lg bg-purple"
                            >
                                <FaPlus />
                                <p>Add Feedback</p>
                            </Link>
                        </div>
                    </div>
                    {feedbackTotal < 1 ? (
                        <div className="flex flex-col items-center justify-center py-20 mx-6 mt-8 text-center bg-white rounded-xl px-7 md:mx-0 md:px-40">
                            <img
                                className=" mb-11"
                                src={emptyImg}
                                width="102"
                                alt="Empty feedback list"
                            />
                            <p className="mb-4 text-lg font-bold text-navyBlue">
                                There is no feedback yet.
                            </p>
                            <p className="mb-7 text-navyBlue">
                                Got a suggestion? Found a bug that needs to be
                                squashed? We love hearing about new ideas to
                                improve our app
                            </p>
                            <Link
                                to="/add"
                                className="flex items-center gap-1 px-6 py-3 text-xs font-bold text-white rounded-lg bg-purple"
                            >
                                <FaPlus />
                                <p>Add Feedback</p>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 px-6 pt-8 pb-14 md:px-0 lg:col-start-2 lg:col-span-4 lg:self-start">
                            {feedbacks
                                .filter((feedback) => {
                                    if (
                                        chosenTag === "All" ||
                                        chosenTag === ""
                                    ) {
                                        return true;
                                    } else if (chosenTag === "User") {
                                        return feedback.user_id === user?.id;
                                    }
                                    return feedback.category === chosenTag;
                                })
                                .sort(sortFunc(select))
                                .map((feedback, index) => {
                                    return (
                                        <Feedback
                                            key={index}
                                            title={feedback.title}
                                            description={feedback.details}
                                            tag={feedback.category}
                                            upvotes={feedback.upvote_count ?? 0}
                                            comments={
                                                feedback.comment_count ?? 0
                                            }
                                            feedback_id={feedback.id}
                                            user_id={user?.id}
                                            username={feedback.username}
                                        />
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
