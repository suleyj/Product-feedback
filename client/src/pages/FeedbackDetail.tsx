import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Feedback from "../components/Feedback";
import Comment from "../components/Comment";
import axios from "axios";
import UserContext from "../context/userContext";

const CommentBaseURL = "/api/comments";
const FeedbackBaseURL = "/api/feedback";

type CommentData = FeedbackComment & {
    username: string;
    fullname: string;
};
const FeedbackDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    //state
    const [commentData, setcommentData] = useState<CommentData[]>([]);
    const [commentInput, setCommentInput] = useState({
        text: "",
        errFlag: false,
    });
    const [flag, setflag] = useState(true);
    const [feedback, setfeedback] = useState<Feedback | undefined>(undefined);

    const onCommentChange = (value: string) => {
        if (commentInput.text.length >= 250)
            setCommentInput({ text: value, errFlag: true });
        else setCommentInput({ text: value, errFlag: false });
    };

    //context
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useContext must be inside a UserProvider");
    }

    const { user } = context;

    //useEffect
    useEffect(() => {
        async function getComments() {
            const url = `${CommentBaseURL}/${id}`;
            const config = {
                headers: {
                    token: localStorage.getItem("token"),
                },
            };

            try {
                const response = await axios.get(url, config);
                setcommentData(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        async function getFeedback() {
            const url = `${FeedbackBaseURL}/${id}`;
            const config = {
                headers: {
                    token: localStorage.getItem("token"),
                },
            };

            try {
                const { data } = await axios.get(url, config);
                setfeedback(data);
            } catch {
                navigate("/404", { replace: true });
            }
        }

        getComments();
        getFeedback();
    }, [id, flag, navigate]);

    const postComment = async () => {
        if (commentInput.errFlag === true) return;
        const url = `${CommentBaseURL}`;
        const config = {
            headers: {
                token: localStorage.getItem("token"),
            },
        };

        const payload = {
            user_id: user?.id,
            feedback_id: id,
            comment_text: commentInput.text,
        };

        await axios.post(url, payload, config);
        setCommentInput({ text: "", errFlag: false });
        setflag(!flag);
    };

    if (!feedback) return <p>Loading...</p>;

    return (
        <div className="text-sm p-6 lg:max-w-[730px] md:px-[39px] md:py-[56px] lg:mx-auto">
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="flex items-center gap-3">
                    <svg
                        width="7"
                        height="10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
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
                {user?.role === "admin" && (
                    <Link
                        to={`/edit/${feedback?.id}`}
                        className="bg-blue text-lightIndigo font-bold rounded-lg px-4 py-3"
                    >
                        Edit Feedback
                    </Link>
                )}
            </div>
            <Feedback
                username={feedback?.username}
                title={feedback?.title}
                description={feedback?.details}
                tag={feedback?.category}
                upvotes={0}
                comments={commentData.length}
                hideCommentBtn={true}
            />
            <div className="bg-white p-6 mt-6 mb-6 rounded-lg">
                <p className="font-bold text-lg text-navyBlue mb-6">
                    {commentData.length} Comments
                </p>
                <div className="flex flex-col gap-6">
                    {commentData.map((comment, index) => {
                        return (
                            <Comment
                                key={index}
                                fullname={comment.fullname}
                                username={comment.username}
                                comment_text={comment.comment_text}
                            />
                        );
                    })}
                </div>
            </div>
            <form className="bg-white p-6 rounded-lg">
                <p className="font-bold text-navyBlue text-lg mb-6">
                    Add Comment
                </p>
                <textarea
                    placeholder="Type your comment here"
                    value={commentInput.text}
                    className="w-full h-20 border-none resize-none bg-lightIndigo rounded-md mb-4 focus:outline-1 focus:outline-blue p-4 pb-1"
                    onChange={(e) => onCommentChange(e.target.value)}
                />
                <div className="flex justify-between items-center">
                    <p
                        className={
                            commentInput.errFlag
                                ? "text-red font-bold"
                                : "text-gray"
                        }
                    >
                        250 Characters
                    </p>
                    <button
                        className="bg-purple text-lightIndigo font-bold rounded-lg px-4 py-3"
                        onClick={(e) => {
                            e.preventDefault();
                            postComment();
                        }}
                    >
                        Post Comment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FeedbackDetail;
