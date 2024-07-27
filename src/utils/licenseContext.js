import React, { createContext, useState, useContext } from 'react';

const LicenseContext = createContext();

export const useLicenseContext = () => {
  return useContext(LicenseContext);
};

export const LicenseDetailsProvider = ({ children }) => {
  const [licenseDetails, setLicenseDetails] = useState({});
  // console.log("LicenseDetailsProvider called", licenseDetails)

  return (
    <LicenseContext.Provider value={{ licenseDetails, setLicenseDetails }}>
      {children}
    </LicenseContext.Provider>
  );
};

export default LicenseContext;
