import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "../../Css/AdminRegister.css";

const AdminRegister = () => {
  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("male");

  let onSubmit = async (e) => {
    e.preventDefault();

    let data = {
      fullName,
      email,
      password,
      dob,
      gender,
    };

    data = {
      ...data,
      role: "admin",
    };

    try {
      let result = await axios({
        url: "http://localhost:8000/web-users",
        method: "POST",
        data: data,
      });

      setFullName("");
      setPassword("");
      setEmail("");
      setGender("male");
      setDob("");

      toast.success("Confirmation Mail has been sent to your email!");
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
    <div className="register-container">
      <h2>Admin Register</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
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

        <div className="form-group gender-group">
          <label>Gender:</label>
          <br />
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
          <button className="submit-btn" type="submit">
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;
