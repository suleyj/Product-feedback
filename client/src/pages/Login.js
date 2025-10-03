import { React, useState, useContext } from "react";
import { IoMailOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Login = ({ setAuth }) => {
  const [inputs, setinputs] = useState({
    username: "",
    password: "",
    errorMsg: "",
  });

  const { setUserdata } = useContext(UserContext);

  const inputChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value, errorMsg: "" });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "http://localhost:5000/auth/login";
    const data = {
      username: inputs.username,
      password: inputs.password,
    };
    axios
      .post(url, data, config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          
          setUserdata(res.data.user);
          localStorage.setItem("token", res.data.token);
          setAuth(true);
        }
      })
      .catch((err) => {
        setinputs({ ...inputs, errorMsg: err.response.data });
      });
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        className="bg-white px-5 py-10 rounded-lg"
        onSubmit={formSubmit}
        autofill="off"
      >
        <p className="text-2xl mb-8 font-bold text-navyBlue">Login</p>
        <div className="relative p-2 border-b-2 border-black mb-4">
          <IoMailOutline className="text-xl absolute top-0 left-0 right-0 bottom-0 my-auto" />
          <input
            className="pl-6 focus:outline-none"
            type="text"
            placeholder="Enter Username"
            value={inputs.username}
            name="username"
            onChange={(e) => {
              inputChange(e);
            }}
          />
        </div>

        <div className="relative p-2 border-b-2 border-black mb-8">
          <IoLockClosedOutline className=" text-xl absolute top-0 left-0 right-0 bottom-0 my-auto" />
          <input
            className="pl-6 focus:outline-none"
            type="password"
            placeholder="Enter Password"
            value={inputs.password}
            name="password"
            onChange={(e) => {
              inputChange(e);
            }}
          />
        </div>
        <button
          className="text-center w-full bg-black rounded-md p-2 mb-4 text-white"
          type="submit"
        >
          Login Now
        </button>
        <p className="text-red h-6">{inputs.errorMsg}</p>
        <p className="text-gray">
          Don't have an account?{" "}
          <Link to="/register" className="text-navyBlue font-bold underline">
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
