import React, { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const [loginResponse, setLoginResponse] = useState("");

  return (
    <LoginContext.Provider value={{ loginResponse, setLoginResponse }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
