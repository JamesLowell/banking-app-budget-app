import React from "react";
import { useNavigate } from "react-router-dom";
import "./assets/bankingLogout.css";
import { Link } from "react-router-dom";
const BankingLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin-info");
    navigate("/landing-page");
  };

  return (
    <div className="logoutContainer">
      <div className="logout-container">
        <p style={{fontWeight:'bold', fontSize:'1.2rem'}}>Are you sure you want to log out?</p>
        <div style={{display:'flex', gap:'2rem'}}>
          <a onClick={handleLogout} className='rounded-md border-2 border-black py-4 px-8 shadow-md shadow-slate-950 hover:shadow-lg hover:shadow-slate-950 font-mulish font-bold'>Yes</a>
        <Link to="/banking-app">
        <button className='rounded-md border-2 border-black py-4 px-8 shadow-md shadow-slate-950 hover:shadow-lg hover:shadow-slate-950 font-mulish font-bold'>No</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default BankingLogout;
