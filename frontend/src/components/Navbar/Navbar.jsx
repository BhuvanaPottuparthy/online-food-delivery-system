import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, userName, setUserName } = useContext(StoreContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // Toggle state

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken("");
    setUserName("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h2 alt="" className="logo">BR FOOD DEL</h2> 
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <>
            <button onClick={() => setShowLogin(true)}>Sign In</button>
            <button onClick={() => navigate("/admin-login")} className="admin-login-btn">Admin Login</button>
          </>
        ) : (
          <div className="navbar-profile">
            <img 
              src={assets.profile_icon} 
              alt="Profile" 
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle on click
              className="profile-icon"
            />
            <ul className={`nav-profile-dropdown ${dropdownOpen ? "show" : ""}`}> {/* Add .show class dynamically */}
              <li className="profile-name">
              <img src={assets.profile_icon} alt="Profile" />
                <p> {userName}</p>
              </li>
              <hr />
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
