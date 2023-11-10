import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./modal.css";
import { useLoaderData } from "react-router-dom";

const WithdrawModal = ({ isOpen, onRequestClose }) => {
  const initialUser = useLoaderData();
  const [user, setUser] = useState(initialUser);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && withdrawAmount <= user.amount) {
      const newBalance = user.amount - withdrawAmount;
      const newTransaction = {
        date: new Date().toISOString(),
        transaction: "Withdrawal",
        amount: withdrawAmount,
        receiver: null,
      };
      user.amount = newBalance;
      user.transactionHistory.push(newTransaction);
      setWithdrawAmount(0);
      setUser({ ...user });
      localStorage.setItem("user", JSON.stringify(user));
      console.log (newBalance)
    } else {
      
    }
  };
  return (
    <div>
      <h2 className="modal-title">Withdraw</h2>
      <div className="userName">
        <h2 className="firstName">{user.firstName}</h2>
        <h1 className="lastName">{user.lastName}</h1>
      </div>
      <div className="userBalance">
        <span>Your Balance: </span>
        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{user.amount}</span>
      </div>
      <div className="withdrawalInput">
        <span style={{ fontWeight: "bold" }}>Withdrawal Amount:</span>
        <input
  type="number"
  placeholder="Enter amount"
  value={withdrawAmount || ''}
  onChange={(e) => setWithdrawAmount(parseFloat(e.target.value) || 0)} 
/>
        <button onClick={handleWithdraw} type="submit">
          Withdraw
        </button>
      </div>
      <button onClick={onRequestClose} className="close">
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default WithdrawModal;
