import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Css/AdminProfileUpdate.css";

const AdminProfileUpdate = () => {
  let [fullName, setFullName] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("male");
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  const getAdminProfile = async () => {
    try {
      let result = await axios({
        url: "http://localhost:8000/web-users/my-profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let profile = result.data.data;
      setFullName(profile.fullName);

      const formattedDob = moment(profile.dob).format("YYYY-MM-DD");
      setDob(formattedDob);
      setGender(profile.gender);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

  let onSubmit = async (e) => {
    e.preventDefault();

    let data = {
      fullName,
      dob,
      gender,
    };

    try {
      let result = await axios({
        url: "http://localhost:8000/web-users/update-profile",
        method: "PATCH",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/my-profile");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  let genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="admin-profile-update-container">
      <h2>Admin Profile Update</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            placeholder="Eg: John Doe"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dob">DOB:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="gender-container">
          <label>Gender:</label>
          {genders.map((item, i) => (
            <div key={i}>
              <label htmlFor={item.value}>{item.label}</label>
              <input
                type="radio"
                value={item.value}
                id={item.value}
                checked={gender === item.value}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          ))}
        </div>

        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfileUpdate;
