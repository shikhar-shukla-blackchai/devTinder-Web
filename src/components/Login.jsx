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
      setError(err?.response?.data);
      console.error();
    }
  };

  const handleSignUP = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-300 w-96 shadow-sm rounded-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isSignUpForm ? "signUp" : "Login"}{" "}
          </h2>
          <div>
            {isSignUpForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-950 font-bold text-xl">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!isSignUpForm) {
                  handleLogin();
                } else handleSignUP();
              }}
            >
              {isSignUpForm ? "Sing Up" : " login"}
            </button>
          </div>
          <p onClick={() => setIsSignUpForm((value) => !value)}>
            {isSignUpForm
              ? "already have an account then Login!!"
              : "Don't have an account? create the account"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
