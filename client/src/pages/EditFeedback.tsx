import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import FormDropdown from "../components/FormDropdown";
import { Link } from "react-router";
import axios from "axios";
import editIcon from "../assets/shared/icon-edit-feedback.svg";

const FeedbackBaseURL = "/api/feedback";

const EditFeedback = () => {
    const { id } = useParams();
    const [feedback, setfeedback] = useState<Feedback | undefined>(undefined);
    const navigate = useNavigate();

    //Drop Down states
    const [active, setActive] = useState(false);
    const [statusActive, setStatusActive] = useState(false);
    const [select, setselect] = useState("");
    const [statusSelect, setStatusselect] = useState("");

    const selectChange = (value: string) => {
        setselect(value);
        setActive(!active);
    };

    const activeChange = () => {
        setActive(!active);
    };

    const activeStatusChange = () => {
        setStatusActive(!statusActive);
    };

    const statusSelectChange = (value: string) => {
        setStatusselect(value);
        setStatusActive(!statusActive);
    };
    const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];

    const status = ["Suggestion", "Planned", "In-Progress", "Live"];

    //Title and Description state
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");

    const onTitleChange = (value: string) => {
        settitle(value);
    };

    const onDescriptionChange = (value: string) => {
        setdescription(value);
    };

    //Button event

    const BaseURL = "/api/feedback";

    const config = {
        headers: {
            token: localStorage.getItem("token"),
        },
    };

    const saveFeedback = async () => {
        const url = `${BaseURL}/${id}`;
        const payload = {
            title: title,
            category: select,
            status: statusSelect,
            description: description,
        };

        await axios.put(url, payload, config);
        navigate("/");
    };

    const deleteFeedback = async () => {
        const url = `${BaseURL}/${id}`;
        await axios.delete(url, config);
        navigate("/");
    };

    useEffect(() => {
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
                setselect(data.category);
                setStatusselect(data.status);
                settitle(data.title);
                setdescription(data.details);
            } catch {
                navigate("/404", { replace: true });
            }
        }
        getFeedback();
    }, [id, navigate]);

    if (!feedback) return <p>Loading...</p>;

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
                <div className="absolute top-0 inline-block -translate-y-1/2 rounded-full w-12">
                    <img src={editIcon} />
                </div>
                <p className="text-navyBlue font-bold text-lg mb-6">
                    Editing '{feedback.title}'
                </p>
                <p className="font-bold text-navyBlue mb-1">Feedback Title</p>
                <p className=" mb-4">Add a short, descriptive headline</p>
                <textarea
                    className="border-none resize-none bg-lightIndigo rounded-md w-full h-12 p-3 focus:outline-1 focus:outline-blue pb-1 mb-1"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
                <p className="font-bold text-navyBlue mb-1">Category</p>
                <p className="mb-4">Choose a category for your feedback</p>
                <FormDropdown
                    selectChange={selectChange}
                    active={active}
                    select={select}
                    activeChange={activeChange}
                    options={categories}
                />
                <p className="font-bold text-navyBlue mb-1">Update Status</p>
                <p className="mb-4">Change feature state</p>
                <FormDropdown
                    selectChange={statusSelectChange}
                    active={statusActive}
                    select={statusSelect}
                    activeChange={activeStatusChange}
                    options={status}
                />
                <p className="font-bold text-navyBlue mb-1">Feedback Detail</p>
                <p className="mb-4">
                    Include any specific comments on what should be improved,
                    added, etc.
                </p>
                <textarea
                    className="border-none resize-none bg-lightIndigo rounded-md w-full h-28 mb-10 p-3 focus:outline-1 focus:outline-blue pb-1"
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                />
                <div className="flex justify-between gap-2">
                    <button
                        className=" bg-red  text-lightIndigo font-bold rounded-lg px-8 py-3"
                        onClick={(e) => {
                            e.preventDefault();
                            deleteFeedback();
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className=" bg-purple text-lightIndigo font-bold rounded-lg px-8 py-3"
                        onClick={(e) => {
                            e.preventDefault();
                            saveFeedback();
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditFeedback;
