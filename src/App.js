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
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { PermissionsProvider, usePermissions } from "./utils/PermissionsContext";

const AppContent = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { licenseDetails, setLicenseDetails } = useLicenseContext();

  const { setPermissionsData, setRoleData } = usePermissions();

  const fetchLicenseData = async () => {
    try {
      const response = await getLicenseInfo();
      // console.log("lic response ---> ", response);
      if (response.status === 200) {
        setLicenseDetails(response?.data[0]);
      }

      if (response?.response?.status === 400) {
        setLicenseDetails([]);
        // NotificationManager.error("No License Data Found", "Error");
      }

    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching license. Please try again later.",
      //   "Error"
      // );
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
    document.cookie = `accessToken=""; path=/;`;
    document.cookie = `refreshToken=""; path=/;`;
    clearCookie("accessToken");
    clearCookie("refreshToken");
  
    setAuthenticatedUser(null);
    setRoleData(null);
    setPermissionsData(null);
  
    localStorage.removeItem("permissions");
    localStorage.removeItem("role");
  };
  

  return (
    <Router>
      <div className="container">
        {authenticatedUser && <NavbarOld />}
        <div className="row">
          {authenticatedUser && (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className="menu-button"
              >
                {sidebarVisible ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
              {sidebarVisible && (
                <div className="col-md-3">
                  <SidebarOld
                    handleSignout={handleSignout}
                    sidebarVisible={sidebarVisible}
                  />
                </div>
              )}
            </>
          )}
          <div
            className={
              authenticatedUser && sidebarVisible ? "col-md-9" : "col-md-12"
            }
          >
            <AppRoutes
              authenticatedUser={authenticatedUser}
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
              sidebarVisible={sidebarVisible}
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
    <PermissionsProvider>
        <AppContent />
    </PermissionsProvider>
  );
}

export default App;
