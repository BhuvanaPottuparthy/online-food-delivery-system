import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { toast } from "react-toastify";
import Back from "./Back";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin@123";

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
      localStorage.setItem("admin", "true"); // Store admin login state
      toast.success("Admin Logged in Successfully");
      navigate("/admin", { replace: true }); // Navigate immediately
    } else {
      toast.error("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="admin-login-input"
            type="email"
            name="email"
            placeholder="Admin Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            className="admin-login-input"
            type="password"
            name="password"
            placeholder="Admin Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button className="admin-login-button" type="submit">Login</button>
        </form>
        <Back />
      </div>
    </div>
  );
};

export default AdminLogin;
