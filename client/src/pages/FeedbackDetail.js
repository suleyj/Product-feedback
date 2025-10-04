import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Feedback from "../components/Feedback";
import Comment from "../components/Comment";
import axios from "axios";
import { UserContext } from "../context/userContext";

const CommentBaseURL = "http://localhost:5000/comments";
const FeedbackBaseURL = "http://localhost:5000/feedback";

const FeedbackDetail = () => {

  const { id } = useParams();
  //state
  const [commentData, setcommentData] = useState([]);
  const [commentInput, setCommentInput] = useState({
    text: "",
    errFlag: false,
  });
  const [flag, setflag] = useState(true);
  const [feedback, setfeedback] = useState(undefined);

  const onCommentChange = (e) => {
    if (commentInput.text.length >= 250)
      setCommentInput({ text: e.target.value, errFlag: true });
    else setCommentInput({ text: e.target.value, errFlag: false });
  };

  //context
  const { userdata } = useContext(UserContext);

  //useEffect
  useEffect(() => {
    async function getComments() {
      const url = `${BaseURL}/${id}`;
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      try {
        const response = await axios.get(url, config);
        setfeedback(response.data);
      } catch (err) {}
    }

    // getComments();
    getFeedback();
  }, [id, flag]);

  const postComment = async (e) => {
    e.preventDefault();
    if (commentInput.errFlag === true) return;
    const url = `${CommentBaseURL}`;
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    const payload = {
      user_id: userdata.id,
      feedback_id: id,
      comment_text: commentInput.text,
    };

    try {
      await axios.post(url, payload, config);
    } catch (error) {}
    setCommentInput({ ...commentData, text: "" });
    setflag(!flag);
  };

  return (
    <div className="text-sm p-6 lg:max-w-[730px] md:px-[39px] md:py-[56px] lg:mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="flex items-center gap-3">
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
        {userdata.role === "admin" && (
          <Link
            to="/edit"
            className="bg-blue text-lightIndigo font-bold rounded-lg px-4 py-3"
          >
            Edit Feedback
          </Link>
        )}
      </div>
      <Feedback
        title={feedback?.title}
        description={feedback?.details}
        tag={feedback?.category}
        upvotes={0}
        comments={commentData.length}
        hideCommentBtn={false}
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
                image_name={comment.image_name}
              />
            );
          })}
        </div>
      </div>
      <form className="bg-white p-6 rounded-lg">
        <p className="font-bold text-navyBlue text-lg mb-6">Add Comment</p>
        <textarea
          placeholder="Type your comment here"
          value={commentInput.text}
          className="w-full h-20 border-none resize-none bg-lightIndigo rounded-md mb-4 outline-1 outline-blue p-4 pb-1"
          onChange={(e) => onCommentChange(e)}
        />
        <div className="flex justify-between items-center">
          <p
            className={
              commentInput.errFlag ? "text-red font-bold" : "text-gray"
            }
          >
            250 Characters
          </p>
          <button
            className="bg-purple text-lightIndigo font-bold rounded-lg px-4 py-3"
            onClick={postComment}
          >
            Post Comments
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackDetail;
