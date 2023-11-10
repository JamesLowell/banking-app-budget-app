import React from "react";
import Clock from "../clock";
import "./home.css";
import RandomQuotes from "../randomQuotes";
import { BiNote } from "react-icons/bi";

const Home = () => {
  const admin = JSON.parse(localStorage.getItem("admin-info")) || {};
  return (
    <main style={{ position: "fixed", marginLeft: "5rem" }}>
      <div className="homeContainer">
        <div className="home-container">
          <h1 className="clock">
          <Clock />          
        </h1>
        <span className="greetings">Hello, {admin.firstName}!</span>
        </div>
        <button className="add-notes">
          <BiNote/>
        </button>
        <p className="random-quotes">
        <RandomQuotes />
      </p>
       
        
      </div>
      
      
    </main>
  );
};

export default Home;
