import { React, useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Feedback from "../components/Feedback";
import Comment from "../components/Comment";
import axios from "axios";
import { UserContext } from "../context/userContext";

const BaseURL = "http://localhost:5000/comments";

const FeedbackDetail = () => {
  //Feedback Id
  const linkState = useLocation().state;
  const id = linkState.id;
  console.log(linkState);
  //state
  const [commentData, setcommentData] = useState([]);
  const [commentInput, setCommentInput] = useState({
    text: "",
    errFlag: false,
  });
  const [flag, setflag] = useState(true);

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
        console.log(response.data);
        setcommentData(response.data);
      } catch (err) {}
    }

    getComments();
  }, [id, flag]);

  const postComment = async (e) => {
    e.preventDefault();
    if (commentInput.errFlag === true) return;
    const url = `${BaseURL}`;
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    const payload = {
      account_id: userdata.id,
      feedback_id: id,
      comment_text: commentInput.text,
    };

    try {
      await axios.post(url, payload, config);
    } catch (error) {}
    console.log(commentInput.text);
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
            state={{
              id: linkState.id,
              title: linkState.title,
              tag: linkState.tag,
              category: linkState.category,
              status: linkState.status,
              description: linkState.description,
            }}
            className="bg-blue text-lightIndigo font-bold rounded-lg px-4 py-3"
          >
            Edit Feedback
          </Link>
        )}
      </div>
      <Feedback
        title={linkState.title}
        description={linkState.description}
        tag={linkState.tag}
        upvotes={linkState.upvotes}
        comments={commentData.length}
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
