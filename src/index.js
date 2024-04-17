import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LoginProvider } from "./utils/loginContext";
import { ChakraProvider } from '@chakra-ui/react';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ChakraProvider> */}
      <LoginProvider>
        <App />
      </LoginProvider>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);
