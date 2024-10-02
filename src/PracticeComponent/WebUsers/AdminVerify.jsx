import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminVerify = () => {
  let [query] = useSearchParams();
  let token = query.get("token");
  let navigate = useNavigate()

  const verifyEmail = async () => {
    try {
      let result = await axios({
        url: "http://localhost:8000/web-users/verify-email",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
navigate("/admin/login")

    } catch (error) {}
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return <div>AdminVerify</div>;
};

export default AdminVerify;
