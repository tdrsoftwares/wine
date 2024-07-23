import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavbarOld from "./components/Navbar_old/NavbarOld";
import SidebarOld from "./components/Sidebar_old/SidebarOld";
import AppRoutes from "./AppRoutes";
import {
  LicenseDetailsProvider,
  useLicenseContext,
} from "./utils/licenseContext";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./App.css";
import { clearCookie, getCookie } from "./utils/cookie";
import { getLicenseInfo } from "./services/licenseService";

const AppContent = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const { licenseDetails, setLicenseDetails } = useLicenseContext();

  const fetchLicenseData = async () => {
    try {
      const response = await getLicenseInfo();
      // console.log("lic response ---> ", response);
      if (response.status === 200) {
        setLicenseDetails(response?.data[0]);
      }

      if (response?.response?.status === 400) {
        setLicenseDetails([]);
        NotificationManager.error("No License Data Found", "Error");
      }

    } catch (error) {
      NotificationManager.error(
        "Error fetching license. Please try again later.",
        "Error"
      );
    }
  };

  useEffect(() => {
    fetchLicenseData();
  }, [authenticatedUser]);

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
    // console.log("email: ", email);
    setAuthenticatedUser(email);
  };

  const handleSignout = () => {
    clearCookie("accessToken");
    setAuthenticatedUser(null);
  };

  return (
    <Router>
      <div className="container">
        {authenticatedUser && <NavbarOld />}
        <div className="row">
          {authenticatedUser && (
            <div className="col-md-3">
              <SidebarOld handleSignout={handleSignout} />
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
      <NotificationContainer />
    </Router>
  );
};



const App = () => {
  return (
    <LicenseDetailsProvider>
      <AppContent />
    </LicenseDetailsProvider>
  );
}

export default App;
