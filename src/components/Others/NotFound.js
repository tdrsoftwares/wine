import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 Not Found</h1>
      <p className="not-found-message">
        The page you are looking for does not exist. <br/>Go back to{" "}
        <Link to="/">home</Link> or <Link to="/login">log in</Link> to continue.
      </p>
    </div>
  );
};

export default NotFound;
