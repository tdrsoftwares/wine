import axios from "axios";
import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../utils/apiDomain";
import { useLoginContext } from "../../utils/loginContext";

function LoginForm({ handleLogin }) {
  const { loginResponse, setLoginResponse } = useLoginContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      NotificationManager.warning(
        "Please enter both email and password.",
        "Warning",
        2000
      );
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      NotificationManager.warning(
        "Please enter a valid email address.",
        "Warning"
      );
      return;
    }

    try {
      const response = await axios.post(`${url}/user/login`, {
        email,
        password,
      });
      handleLogin(email);
      console.log("response login: ", response);
      NotificationManager.success("Login successful.", "Success");
      navigate("/");
      setLoginResponse(response?.data?.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        NotificationManager.error(
          "Invalid email or password. Please try again.",
          "Error"
        );
      } else {
        NotificationManager.error(
          "Failed to sign in. Please try again.",
          "Error"
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="mb-2 form-header">Sign In</h2>
      <div className="form-control">
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary mt-1">
        Sign In
      </button>
      <br />

      <p className="form-switch">
        Don't have an account? &nbsp;
        <Link to="/signup">Sign up here.</Link>
      </p>
      <NotificationContainer />
    </form>
  );
}

export default LoginForm;
