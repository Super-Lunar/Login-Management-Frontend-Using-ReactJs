import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "../../Css/AdminForgotPassword.css";

const AdminForgotPassword = () => {
  let [email, setEmail] = useState("");

  let onSubmit = async (e) => {
    e.preventDefault();

    let data = {
      email,
    };

    // login api hit
    try {
      let result = await axios({
        url: "http://localhost:8000/web-users/forgot-password",
        method: "POST",
        data: data,
      });

      setEmail("");

      // toast message preview
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Admin Forgot Password</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="nitan425@gmail.com"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Send Mail</button>
        </div>
      </form>
    </div>
  );
};

export default AdminForgotPassword;
