import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Feedback from "../components/Feedback";
import Comment from "../components/Comment";
import axios from "axios";

const BaseURL = "http://localhost:5000/comments";

const FeedbackDetail = () => {
  const linkState = useLocation().state;
  const [commentData, setcommentData] = useState([]);
  const id = linkState.id;
  useEffect(() => {
    let url = `${BaseURL}/${id}`;
    axios.get(url).then((res) => {
      setcommentData(res.data);
    });
  }, [id]);

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
        <Link
          to="/edit"
          className="bg-blue text-lightIndigo font-bold rounded-lg px-4 py-3"
        >
          Edit Feedback
        </Link>
      </div>
      <Feedback
        title={linkState.title}
        description={linkState.description}
        tag={linkState.tag}
        upvotes={linkState.upvotes}
        comments="2"
      />
      <div className="bg-white p-6 mt-6 mb-6 rounded-lg">
        <p className="font-bold text-lg text-navyBlue mb-6">
          {commentData.length} Comments
        </p>
        {commentData.map((comment, index) => {
          return <Comment key={index} info={comment.comment_info} />;
        })}
      </div>
      <form className="bg-white p-6 rounded-lg">
        <p className="font-bold text-navyBlue text-lg mb-6">Add Comment</p>
        <textarea
          placeholder="Type your comment here"
          className="w-full h-20 border-none resize-none bg-lightIndigo rounded-md mb-4 outline-1 outline-blue p-4 pb-1"
        />
        <div className="flex justify-between items-center">
          <p className="text-gray">250 Characters</p>
          <button className="bg-purple text-lightIndigo font-bold rounded-lg px-4 py-3">
            Post Comments
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackDetail;
