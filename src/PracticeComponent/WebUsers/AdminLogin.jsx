import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalVariableContext } from "../../App";
import "../../Css/AdminLogin.css";

const AdminLogin = () => {
  let global = useContext(GlobalVariableContext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();

  let onSubmit = async (e) => {
    e.preventDefault();

    let data = { email, password };

    try {
      let result = await axios({
        url: "http://localhost:8000/web-users/login",
        method: "POST",
        data: data,
      });

      let token = result.data.token;
      localStorage.setItem("token", token);
      global.setToken(token);

      navigate("/admin");

      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Admin Login</h2>
      <form onSubmit={onSubmit} className="form">
        <div className="formGroup">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            placeholder="nitan425@gmail.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        <div className="formGroup">
          <button type="submit" className="button">
            Login
          </button>
        </div>

        <div className="formGroup">
          <button
            type="button"
            onClick={() => navigate("/admin/forgot-password")}
            className="forgotButton"
          >
            Forgot Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
