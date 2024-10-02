import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Css/AdminUpdatePassword.css";

const AdminUpdatePassword = () => {
  let [oldPassword, setOldPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");

  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  let onSubmit = async (e) => {
    e.preventDefault();

    let data = {
      oldPassword,
      newPassword,
    };

    try {
      let result = await axios({
        url: "http://localhost:8000/web-users/update-password",
        method: "PATCH",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove token from localStorage to logout
      navigate("/admin/logout");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="admin-update-password-container">
      <h2>Update Password</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="text"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="text"
            value={newPassword}
            id="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  );
};

export default AdminUpdatePassword;
