import React from "react";
import { useState } from 'react'
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import "./assets/modal.css";

const DepositModal = ({ isOpen, onRequestClose, currentUserId }) => {
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const referenceUser = users.find(user => user.id === currentUserId);

      if (!referenceUser) {
        throw new Error('User not found');
      }

      if (depositAmount <= 0) {
        throw new Error('Deposit amount must be greater than 0');
      }

      const newBalance = referenceUser.amount + parseFloat(depositAmount);
      referenceUser.amount = newBalance;


      const newTransaction = {
        date: new Date().toISOString(),
        transaction: "Deposit",
        amount: parseFloat(depositAmount),
        receiver: null,
      };
      referenceUser.transactionHistory.push(newTransaction);

      localStorage.setItem('users', JSON.stringify(users));


      toast.success('Deposit successful');


      onRequestClose();

    } catch (error) {

      toast.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleDeposit}>
        <h2 className="modal-title">Deposit</h2>
        {/* Other form fields here */}
        <div className="depositInput flex flex-col p-4 gap-4">
          <span style={{ fontWeight: "bold" }}>Deposit Amount:</span>
          <input
            type="number"
            name="depositAmount"
            placeholder="Enter amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <button type="submit">Deposit</button>
        </div>
        <button onClick={onRequestClose} className="close">
          <AiOutlineClose />
        </button>
      </form>
    </div>
  );
};


export default DepositModal;