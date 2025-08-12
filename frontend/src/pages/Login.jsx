import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setloginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if ( !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name ,errors } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('loggedInUser', name)
        setTimeout(() => {
          navigate("/home");
        }, 3000);
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
        <h1 className=" mt-10 text-[2rem]">Login</h1>
        <form
          onSubmit={handleLogin}
          className=" w-full h-fit flex flex-col justify-center items-start gap-3"
        >
          <div className="input-chl">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={loginInfo.email}
            />
          </div>
          <div className="input-chl">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={loginInfo.password}
            />
          </div>
          <button type="submit" className="btn-1 w-[50%]">
            Login
          </button>
          <span>
            Don't have an account?{" "}
            <Link className="al-log" to="/signup">
              Sign Up
            </Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
