import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin"); // Remove admin session
    toast.success("Admin Logged Out Successfully");
    navigate("/admin-login"); // Redirect to login page
  };

  return (
    <div className="navbar">
      <h2 alt="" className="logo">BR FOOD DEL</h2> 
      <div className="navbar-right">
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
