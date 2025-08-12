import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Signup = () => {
  const [signUpInfo, setsignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copysignUp = { ...signUpInfo };
    copysignUp[name] = value;
    setsignUpInfo(copysignUp);
  };

  //   console.log('login info', signUpInfo)
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "https://dashboard-mern-api.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      const result = await response.json();
      const { success, message, errors } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else if (errors) {
        handleError(errors[0]);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container  h-[100vh] flex justify-center items-center">
      <div className=" input-cont w-100 h-[80vh] shadow-2xl wrapper flex flex-col justify-center items-center gap-10">
        <h1 className=" mt-10 text-[2rem]">Sign up</h1>
        <form
          onSubmit={handleSignup}
          className=" w-full h-fit flex flex-col justify-center items-start gap-3"
        >
          <div className="input-chl">
            <label htmlFor="name" className="my-input">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name"
              value={signUpInfo.name}
            />
          </div>
          <div className="input-chl">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={signUpInfo.email}
            />
          </div>
          <div className="input-chl">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={signUpInfo.password}
            />
          </div>
          <button type="submit" className="btn-1 w-[50%]">
            Sign up
          </button>
          <span>
            Already have an account?{" "}
            <Link className="al-log" to="/login">
              Login
            </Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
