import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Frontend Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import StoreContextProvider from "./context/StoreContext"; // Frontend Context

// Admin Components
import AdminNavbar from "./admin/components/Navbar/Navbar";
import Sidebar from "./admin/components/Sidebar/Sidebar";
import Add from "./admin/pages/Add/Add";
import List from "./admin/pages/List/List";
import Orders from "./admin/pages/Orders/Orders";
import AdminStoreContextProvider from "./admin/context/StoreContext"; // Admin Context

// Admin Login Page
import AdminLogin from "./pages/AdminLogin/AdminLogin";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const url = "http://localhost:4000"; // Backend URL

  // Function to check if admin is logged in
  const isAdminAuthenticated = () => {
    return localStorage.getItem("admin") === "true";
  };

  return (
    <StoreContextProvider>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <ToastContainer />
      <Routes>
        {/* Frontend Routes with Spacing */}
        <Route path="/" element={<><Navbar setShowLogin={setShowLogin} /><div className="page-container"><Home /></div><Footer /></>} />
        <Route path="/cart" element={<><Navbar setShowLogin={setShowLogin} /><div className="page-container"><Cart /></div><Footer /></>} />
        <Route path="/order" element={<><Navbar setShowLogin={setShowLogin} /><div className="page-container"><PlaceOrder /></div><Footer /></>} />
        <Route path="/verify" element={<><Navbar setShowLogin={setShowLogin} /><div className="page-container"><Verify /></div><Footer /></>} />
        <Route path="/myorders" element={<><Navbar setShowLogin={setShowLogin} /><div className="page-container"><MyOrders /></div><Footer /></>} />

        {/* Admin Login Route */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Routes - Protected */}
        <Route
          path="/admin/*"
          element={
            isAdminAuthenticated() ? (
              <AdminStoreContextProvider>
                <div>
                  <AdminNavbar />
                  <hr />
                  <div className="app-content">
                    <Sidebar />
                    <Routes>
                      <Route index element={<Navigate to="/admin" replace />} /> {/* Redirect to /admin/list */}
                      <Route path="add" element={<Add url={url} />} />
                      <Route path="list" element={<List url={url} />} />
                      <Route path="orders" element={<Orders url={url} />} />
                    </Routes>
                  </div>
                </div>
              </AdminStoreContextProvider>
            ) : (
              <Navigate to="/admin-login" replace />
            )
          }
        />
      </Routes>
    </StoreContextProvider>
  );
};

export default App;
