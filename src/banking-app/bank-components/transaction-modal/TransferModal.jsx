import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./assets/modal.css";

const TransferModal = ({ isOpen, onRequestClose }) => {
  return (
    <div>
      <h2 className="modal-title">Transfer</h2>
      <p>transfer Modal Content</p>
      <button onClick={onRequestClose} className="close">
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default TransferModal;