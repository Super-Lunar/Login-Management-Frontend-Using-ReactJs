import React, { useState, createContext } from "react";
import ReactRouter from "./PracticeComponent/ReactRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Css/App.css";

// Create a context
export const GlobalVariableContext = createContext();

const App = () => {
  // Use state for token
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <GlobalVariableContext.Provider value={{ token, setToken }}>
      <ToastContainer />
      <ReactRouter />
    </GlobalVariableContext.Provider>
  );
};

export default App;
