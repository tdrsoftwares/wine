import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavbarOld from "./components/Navbar_old/NavbarOld";
import SidebarOld from "./components/Sidebar_old/SidebarOld";
import AppRoutes from "./AppRoutes";
import { LoginProvider } from "./utils/loginContext";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./App.css";
import { getCookie } from "./utils/cookie";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      setAuthenticatedUser(token); 
    }
  }, []);

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
          {authenticatedUser && <NavbarOld />}
          <div className="row">
            {authenticatedUser && (
              <div className="col-md-3">
                <SidebarOld />
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
