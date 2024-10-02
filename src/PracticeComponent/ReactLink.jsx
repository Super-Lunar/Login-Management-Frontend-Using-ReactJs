import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalVariableContext } from "../App";
import "../Css/ReactLink.css";
const ReactLink = () => {
  let global = useContext(GlobalVariableContext);
  return (
    <nav className="navbar">
      {!global.token ? (
        <div>
          <NavLink to="/admin/register" activeClassName="active">
            Admin Register
          </NavLink>
          <NavLink to="/admin/login" activeClassName="active">
            Admin Login
          </NavLink>
        </div>
      ) : null}

      {global.token ? (
        <div>
          <NavLink to="/admin/my-profile" activeClassName="active">
            My Profile
          </NavLink>
          <NavLink to="/admin/read-all-users" activeClassName="active">
            Read All Users
          </NavLink>
          <NavLink to="/admin/logout" activeClassName="active">
            Logout
          </NavLink>
        </div>
      ) : null}
    </nav>
  );
};

export default ReactLink;
