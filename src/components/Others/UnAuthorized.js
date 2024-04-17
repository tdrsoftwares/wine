import React from "react";
import { Link } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-heading">Unauthorized Access</h1>
      <p className="unauthorized-message">
        You do not have permission to access this page. <br />
        Please go back to &nbsp;
        <Link to="/">home</Link> or <Link to="/login">log in</Link> to
        continue.
      </p>
    </div>
  );
};

export default UnAuthorized;
