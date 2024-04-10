import React, { useState } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../utils/apiDomain";

function SignUpForm({ handleSignUp }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      NotificationManager.warning("Please fill in all the fields.", "Warning");
      return;
    }

    if (!validateEmail(email)) {
      NotificationManager.warning(
        "Please enter a valid email address.",
        "Warning"
      );
      return;
    }

    if (password.length < 6) {
      NotificationManager.warning(
        "Password must be at least 6 characters long.",
        "Error",
        2000
      );
      return;
    }

    try {
      const response = await axios.post(`${url}/user/create`, {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      handleSignUp(email);
      console.log("signup response: ", response);
      NotificationManager.success("Sign up successful.", "Success");
      navigate("/login");
    } catch (error) {
      console.error("Sign up error:", error);
      if (error.response) {
        const errorMessage = error.response.data.message;
        {
          NotificationManager.error(errorMessage, "Error");
        }
      } else {
        NotificationManager.error(
          "Failed to sign up. Please try again.",
          "Error"
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-header mb-2">Sign Up</h2>
      <div className="form-control">
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Email:</label>
        <input
          type="email"
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
        Sign Up
      </button>
      <br />
      <p className="form-switch">
        Already have an account? &nbsp;
        <Link to="/login">Login here.</Link>
      </p>
      <NotificationContainer />
    </form>
  );
}

export default SignUpForm;
