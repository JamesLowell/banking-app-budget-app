import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./assets/modal.css";
import "./LandingPageLogin.css";

const LandingPageLogin = ({ isOpen, onRequestClose }) => {
  return (
    <div>
      <h2 className="modal-title">Hi there!</h2>
      <div className="landingPageLogin-container">
        <p style={{fontSize:'2.5rem'}}>Choose Account</p>
        <div style={{display:'flex', gap:'3rem'}}>
          <a href="/budget/login" className='rounded-md border-2 border-black py-4 px-8 shadow-md shadow-slate-950 hover:shadow-lg hover:shadow-slate-950 font-mulish font-bold'>USER</a>
          <a href="/bankinglogin" className='rounded-md border-2 border-black py-4 px-8 shadow-md shadow-slate-950 hover:shadow-lg hover:shadow-slate-950 font-mulish font-bold'>ADMIN</a>
        </div>
      </div>

      <button onClick={onRequestClose} className="close">
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default LandingPageLogin;
