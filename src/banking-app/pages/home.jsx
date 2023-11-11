import React, { useState } from "react";
import Clock from "../../component/clock";
import "./assets/home.css";
import RandomQuotes from "../../component/randomQuotes";
import { BiNote } from "react-icons/bi";
import TodoModal from "../bank-components/TodoModal";

const Home = () => {
  const admin = JSON.parse(localStorage.getItem("admin-info")) || {};
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <main style={{ position: "fixed", marginLeft: "5rem" }}>
      <div className="homeContainer">
        <div className="home-container">
          <h1 className="clock">
            <Clock />
          </h1>
          <span className="greetings">Hello, {admin.firstName}!</span>
        </div>
        <div className="add-notes">
          <BiNote onClick={openModal} />
          <TodoModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        <p className="random-quotes">
          <RandomQuotes />
        </p>
      </div>
    </main>
  );
};

export default Home;