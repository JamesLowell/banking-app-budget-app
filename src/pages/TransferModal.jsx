import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./modal.css";

const TransferModal = ({ isOpen, onRequestClose }) => {
  return (
    <div>
      <form>
        <h2 className="modal-title">Transfer</h2>
        <p>Transfer Modal Content</p>
        
        <button onClick={onRequestClose} className="close">
          <AiOutlineClose />
        </button>
      </form>
    </div>
  );
};

export default TransferModal;