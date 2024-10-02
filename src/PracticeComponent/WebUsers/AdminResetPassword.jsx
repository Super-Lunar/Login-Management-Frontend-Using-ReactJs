import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Css/AdminResetPassword.css";

const AdminResetPassword = () => {
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let [query] = useSearchParams();
  let token = query.get("token");

  let onSubmit = async (e) => {
    e.preventDefault();

    let data = {
      password,
    };

    try {
      let result = await axios({
        url: "http://localhost:8000/web-users/reset-password",
        method: "PATCH",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //   redirect to login

      navigate("/admin/login");
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Admin Reset Password</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  );
};

export default AdminResetPassword;
