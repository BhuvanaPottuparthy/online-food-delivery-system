import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserName } = useContext(StoreContext); // Added setUserName
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let newUrl = url + (currentState === "Login" ? "/api/user/login" : "/api/user/register");
  
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        if (currentState === "Login") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
  
          // Extract the username from email (before @)
          let extractedName = data.name || data.email.split("@")[0];
  
          // Remove numbers and special characters, keep only letters
          extractedName = extractedName.match(/[a-zA-Z]+/g)?.join("") || "User";
  
          // Store and set username
          localStorage.setItem("userName", extractedName);
          setUserName(extractedName);
  
          toast.success("Login Successfully");
          setShowLogin(false);
        } else {
          toast.success("Account created successfully. Please login.");
          setCurrentState("Login");
        }
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Wrong Credentials. Please try again.");
    }
  };  

  return (
    <div className="login-popup">
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currentState !== "Login" && (
            <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
          )}
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Your password" required />
          <br></br>
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <button type="submit">{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
        {currentState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
