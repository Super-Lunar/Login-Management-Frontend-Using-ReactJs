import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Css/UserDetails.css";

const UserDetails = () => {
  let params = useParams();
  let id = params.id;
  let navigate = useNavigate();
  let [user, setUser] = useState({});
  let token = localStorage.getItem("token");
  const getUser = async () => {
    try {
      let result = await axios({
        url: `http://localhost:8000/web-users/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(result.data.result);
      toast("🥷 read successfully");
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = (id) => (e) => {
    navigate(`/admin/update/${id}`);
  };
  return (
    <div className="user-details-container">
      <div>
        <div key={user.id} className="user-details-card">
          <p>Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Role: {user.role}</p>
          <p>DOB: {new Date(user.dob).toLocaleDateString()}</p>
          <div>
            <button type="button" onClick={handleUpdate(user._id)}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
