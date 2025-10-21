import { React, useState, useContext } from "react";
import { IoMailOutline } from "react-icons/io5";
import { IoImagesOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";


const Registration = ({ setAuth }) => {

 const { setUserdata } = useContext(UserContext);

  const [inputs, setinputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirm: "",
    errorMsg: "",
  });

  // const [fileInput, setfileInput] = useState({});

  let inputsChange = (e) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  let formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("image", fileInput);
    formData.append("fullname", inputs.fullname);
    formData.append("username", inputs.username);
    formData.append("password", inputs.password);
    formData.append("confirm", inputs.confirm);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const url = "/api/auth/register";
      const res = await axios.post(url, formData, config);
      setUserdata(res.data.user);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setAuth(true);
      }
    } catch (error) {
      setinputs({ ...inputs, errorMsg: error.response.data });
    }
  };
  return (
    <div className="flex items-center justify-center mt-20">
      <form
        className="px-8 py-10 bg-white rounded-lg w-80"
        onSubmit={formSubmit}
      >
        <p className="mb-8 text-2xl font-bold text-navyBlue">Registration</p>

        <div className="relative p-2 mb-4 border-b border-black">
          <IoPersonAddOutline className="absolute top-0 bottom-0 left-0 right-0 my-auto text-xl" />
          <input
            className="w-full pl-6 focus:outline-none"
            type="text"
            placeholder="Enter your name"
            value={inputs.fullname}
            name="fullname"
            onChange={(e) => inputsChange(e)}
          />
        </div>
        <div className="relative p-2 mb-4 border-b border-black">
          <IoMailOutline className="absolute top-0 bottom-0 left-0 right-0 my-auto text-xl" />
          <input
            className="w-full pl-6 focus:outline-none"
            type="text"
            placeholder="Enter your username"
            value={inputs.username}
            name="username"
            onChange={(e) => inputsChange(e)}
          />
        </div>
        {/* <div className="relative p-2 ">
          <IoImagesOutline className="absolute top-0 bottom-0 left-0 right-0 my-auto text-xl" />
          <input
            type="file"
            className="pl-6 focus:outline-none"
            accept="image/*"
            id="myfile"
            name="myfile"
            placeholder="choose profile image"
            onChange={(e) => setfileInput(e.target.files[0])}
          />
        </div> */}
        <div className="relative p-2 mb-4 border-b border-black">
          <IoLockClosedOutline className="absolute top-0 bottom-0 left-0 right-0 my-auto text-xl " />
          <input
            className="w-full pl-6 focus:outline-none"
            type="password"
            placeholder="Enter your password"
            value={inputs.password}
            name="password"
            onChange={(e) => inputsChange(e)}
          />
        </div>

        <div className="relative p-2 mb-8 border-b border-black">
          <IoLockClosedOutline className="absolute top-0 bottom-0 left-0 right-0 my-auto text-xl " />
          <input
            className="w-full pl-6 focus:outline-none"
            type="password"
            placeholder="Enter password again"
            value={inputs.confirm}
            name="confirm"
            onChange={(e) => inputsChange(e)}
          />
        </div>

        <button className="w-full p-2 mb-4 text-center text-white bg-black rounded-md">
          Register
        </button>
        <p className="h-6 text-red">{inputs.errorMsg}</p>
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-bold underline text-navyBlue">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
