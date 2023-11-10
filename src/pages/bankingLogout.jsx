import React from "react";
import { useNavigate } from "react-router-dom";
import "./bankingLogout.css";
import { Link } from "react-router-dom";
const BankingLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin-info");
    navigate("/bankinglogin");
  };

  return (
    <div className="logoutContainer">
      <div className="logout-container">
        <p>Are you sure you want to log out?</p>
        <div style={{display:'flex', gap:'2rem'}}>
          <button onClick={handleLogout}>Yes</button>
        <Link to="/banking-app">
        <button>No</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default BankingLogout;
