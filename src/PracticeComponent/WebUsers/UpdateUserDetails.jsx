import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Css/UpdateUser.css";

const UpdateUserDetails = () => {
  let [fullName, setFullName] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("male");
  let params = useParams();
  let id = params.id;
  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  const getUser = async () => {
    try {
      let result = await axios({
        url: `http://localhost:8000/web-users/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = result.data.result;
      setFullName(data.fullName);
      const formattedDob = moment(data.dob).format("YYYY-MM-DD");

      setDob(formattedDob);
      setGender(data.gender);
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
    }
  };

  useEffect(() => {
    getUser();
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
        url: `http://localhost:8000/web-users/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/admin/${id}`);
      toast.success(result.data.message);
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
    <div className="update-user-container">
      <h2>Update User Details</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            placeholder="Eg: nitan"
            id="name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="dob">DOB:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
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
                onChange={(e) => {
                  setGender(e.target.value);
                }}
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

export default UpdateUserDetails;
