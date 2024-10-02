import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../App";

const AdminLogout = () => {
  let navigate = useNavigate();
  let global = useContext(GlobalVariableContext);

  localStorage.removeItem("token");
  global.setToken(null);

  useEffect(() => {
    navigate("/");
  }, []);
  return <div>AdminLogout</div>;
};

export default AdminLogout;
