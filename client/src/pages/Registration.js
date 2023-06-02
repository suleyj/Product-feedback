import { React, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { IoImagesOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";

const Registration = ({ setAuth }) => {
  const [inputs, setinputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirm: "",
    errorMsg: "",
  });

  const [fileInput, setfileInput] = useState({});

  let inputsChange = (e) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  let formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput);
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
      const url = "http://localhost:5000/auth/register";
      const res = await axios.post(url, formData, config);
      console.log(res.data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setAuth(true);
      }
    } catch (error) {
      setinputs({ ...inputs, errorMsg: error.response.data });
    }
  };
  return (
    <div className="flex justify-center items-center mt-20">
      <form
        className="bg-white px-8 py-10 rounded-lg w-80"
        onSubmit={formSubmit}
      >
        <p className="text-2xl mb-8 font-bold text-navyBlue">Registration</p>

        <div className="relative p-2 border-b border-black mb-4">
          <IoPersonAddOutline className="text-xl absolute top-0 left-0 right-0 bottom-0 my-auto" />
          <input
            className="pl-6 focus:outline-none w-full"
            type="text"
            placeholder="Enter your name"
            value={inputs.fullname}
            name="fullname"
            onChange={(e) => inputsChange(e)}
          />
        </div>
        <div className="relative p-2 border-b border-black mb-4">
          <IoMailOutline className="text-xl absolute top-0 left-0 right-0 bottom-0 my-auto" />
          <input
            className="pl-6 focus:outline-none w-full"
            type="text"
            placeholder="Enter your username"
            value={inputs.username}
            name="username"
            onChange={(e) => inputsChange(e)}
          />
        </div>
        <div className="relative p-2 ">
          <IoImagesOutline className="text-xl absolute top-0 left-0 right-0 bottom-0 my-auto" />
          <input
            type="file"
            className="pl-6 focus:outline-none"
            accept="image/*"
            id="myfile"
            name="myfile"
            placeholder="choose profile image"
            onChange={(e) => setfileInput(e.target.files[0])}
          />
        </div>
        <div className="relative p-2 border-b border-black mb-4">
          <IoLockClosedOutline className=" text-xl absolute top-0 left-0 right-0 bottom-0 my-auto" />
          <input
            className="pl-6 focus:outline-none w-full"
            type="password"
            placeholder="Enter your password"
            value={inputs.password}
            name="password"
            onChange={(e) => inputsChange(e)}
          />
        </div>

        <div className="relative p-2 border-b border-black mb-8">
          <IoLockClosedOutline className=" text-xl absolute top-0 left-0 right-0 bottom-0 my-auto" />
          <input
            className="pl-6 focus:outline-none w-full"
            type="password"
            placeholder="Enter password again"
            value={inputs.confirm}
            name="confirm"
            onChange={(e) => inputsChange(e)}
          />
        </div>

        <button className="text-center w-full bg-black rounded-md p-2 mb-4 text-white">
          Register
        </button>
        <p className="text-red h-6">{inputs.errorMsg}</p>
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-navyBlue font-bold underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
