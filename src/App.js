import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./AppRoutes";
import { LoginProvider } from "./utils/loginContext";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./App.css";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const handleSignUp = (email) => {
    setAuthenticatedUser(email);
  };

  const handleLogin = (email) => {
    console.log("email: ", email);
    setAuthenticatedUser(email);
  };

  return (
    <LoginProvider>
      <Router>
        <div className="container">
          {authenticatedUser && <Navbar />}
          <div className="row">
            {authenticatedUser && (
              <div className="col-md-3">
                <Sidebar />
              </div>
            )}
            <div className={authenticatedUser ? "col-md-9" : "col-md-12"}>
              <AppRoutes
                authenticatedUser={authenticatedUser}
                handleLogin={handleLogin}
                handleSignUp={handleSignUp}
              />
            </div>
          </div>
        </div>
      </Router>
      <NotificationContainer />
    </LoginProvider>
  );
}

export default App;
