import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Login failed");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Signup failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isSignUpForm ? "Create Account" : "Welcome Back"}
        </h2>
        <div className="space-y-4">
          {isSignUpForm && (
            <>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 peer"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder=" "
                  id="firstName"
                />
                <label
                  htmlFor="firstName"
                  className="absolute top-3 left-4 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-pink-500"
                >
                  First Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 peer"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder=" "
                  id="lastName"
                />
                <label
                  htmlFor="lastName"
                  className="absolute top-3 left-4 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-pink-500"
                >
                  Last Name
                </label>
              </div>
            </>
          )}
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 peer"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder=" "
              id="email"
            />
            <label
              htmlFor="email"
              className="absolute top-3 left-4 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-pink-500"
            >
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 peer"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              id="password"
            />
            <label
              htmlFor="password"
              className="absolute top-3 left-4 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-pink-500"
            >
              Password
            </label>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>
        )}
        <div className="mt-6">
          <button
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity"
            onClick={isSignUpForm ? handleSignUp : handleLogin}
          >
            {isSignUpForm ? "Sign Up" : "Log In"}
          </button>
        </div>
        <p
          className="text-center mt-4 text-gray-600 underline cursor-pointer hover:text-pink-500"
          onClick={() => setIsSignUpForm(!isSignUpForm)}
        >
          {isSignUpForm
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
