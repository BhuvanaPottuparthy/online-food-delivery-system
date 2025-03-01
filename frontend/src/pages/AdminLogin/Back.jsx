import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="admin-login-back" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default Back;
