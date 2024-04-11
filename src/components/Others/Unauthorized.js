import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-heading">Unauthorized Access!</h1>
      <p className="unauthorized-message">
        Please <Link to="/login">log in</Link> or&nbsp;
        <Link to="signup">create an account</Link>.
      </p>
    </div>
  );
};

export default Unauthorized;
