import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Css/ReadAllUsers.css";

const ReadAllUsers = () => {
  let [users, setUsers] = useState([]);
  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  const getAllUsers = async () => {
    let result = await axios({
      url: "http://localhost:8000/web-users",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(result.data.result);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = (id) => {
    return async (e) => {
      try {
        let result = await axios({
          url: `http://localhost:8000/web-users/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllUsers();
        toast.success(result.data.message, { theme: "dark" });
      } catch (error) {
        toast.error(error.message, { theme: "dark" });
      }
    };
  };

  const handleView = (id) => {
    return (e) => {
      navigate(`/admin/${id}`);
    };
  };

  const handleUpdate = (id) => (e) => {
    navigate(`/admin/update/${id}`);
  };

  return (
    <div className="read-all-users-container">
      <h2>Read All Users</h2>
      {users.map((item, i) => (
        <div key={item._id} className="user-card">
          <p className="user-details">Name: {item.fullName}</p>
          <div className="button-container">
            <button className="button" onClick={handleView(item._id)}>
              View
            </button>
            <button className="button" onClick={handleUpdate(item._id)}>
              Update
            </button>
            <button className="button" onClick={handleDelete(item._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadAllUsers;
