import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./modal.css";

const DepositModal = ({ isOpen, onRequestClose }) => {
  return (
    <div>
      <h2 className="modal-title">Deposit</h2>
      <p>Deposit Modal Content</p>
      <button onClick={onRequestClose} className="close">
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default DepositModal;