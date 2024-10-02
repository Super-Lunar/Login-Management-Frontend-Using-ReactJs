import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Css/AdminProfile.css";

const AdminProfile = () => {
  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  let [profile, setProfile] = useState({});

  const getAdminProfile = async () => {
    try {
      let result = await axios({
        url: "http://localhost:8000/web-users/my-profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(result.data.data);

      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>
      <div className="profile-info">
        <p>Full name = {profile.fullName}</p>
        <p>Email = {profile.email}</p>
        <p>Gender = {profile.gender}</p>
        <p>Date of birth = {new Date(profile.dob).toLocaleDateString()}</p>
        <p>Role = {profile.role}</p>
      </div>

      <div className="button-container">
        <button
          className="profile-button"
          onClick={() => navigate("/admin/update-profile")}
        >
          Update Profile
        </button>
      </div>

      <div className="button-container">
        <button
          className="profile-button"
          onClick={() => navigate("/admin/update-password")}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
