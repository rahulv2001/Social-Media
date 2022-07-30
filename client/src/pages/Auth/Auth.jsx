import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  // console.log(loading);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div className="Auth">
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>RV Media</h1>
          <h6>Explore the world througn this.</h6>
        </div>
      </div>
      {/* <SignUp /> */}
      {/* <LogIn /> */}
      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                className="infoInput"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                className="infoInput"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              name="username"
              className="infoInput"
              placeholder="User Name"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="infoInput"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                name="confirmpass"
                className="infoInput"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password Is Not Same!
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
            { loading ? "Loading..." : isSignUp ? "Sign up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
