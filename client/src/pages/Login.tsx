import { useState, useContext } from "react";
import { HiOutlineAtSymbol, HiOutlineLockClosed } from "react-icons/hi2";
import { Link } from "react-router";
import axios from "axios";
import UserContext from "../context/userContext";

type Props = {
    loginUser: (isAuthenticated: boolean) => void;
}

export default function Login( {loginUser} : Props) {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useContext must be inside a UserProvider");
    }

    const { setUserData } = context;

    const [inputs, setinputs] = useState({
        username: "",
        password: "",
        errorMsg: "",
    });

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value, errorMsg: "" });
    };

    const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const url = "/api/auth/login";
        const data = {
            username: inputs.username,
            password: inputs.password,
        };
        axios
            .post(url, data, config)
            .then((res) => {
                if (res.status === 200) {
                    setUserData(res.data.user);
                    localStorage.setItem("token", res.data.token);
                    loginUser(true);
                }
            })
            .catch((err) => {
                console.log(err)
                setinputs({ ...inputs, errorMsg: err.response.data });
            });
    };

    return (
        <div className="flex justify-center items-center mt-20">
            <form
                className="bg-white px-5 py-10 rounded-lg"
                onSubmit={formSubmit}
                autoComplete="off"
            >
                <p className="text-2xl mb-8 font-bold text-navyBlue">Login</p>
                <div className="relative p-2 border-b-2 border-black mb-4">
                    <HiOutlineAtSymbol className="text-xl absolute top-0 left-0 right-0 bottom-0 my-auto" />
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
                    <HiOutlineLockClosed className=" text-xl absolute top-0 left-0 right-0 bottom-0 my-auto" />
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
                <p className="text-red h-6 mb-2">{inputs.errorMsg}</p>
                <p className="text-gray">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-navyBlue font-bold underline"
                    >
                        Register Now
                    </Link>
                </p>
            </form>
        </div>
    );
}
