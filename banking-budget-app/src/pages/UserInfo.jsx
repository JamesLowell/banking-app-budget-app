import React from "react";
import "./UserInfo.css";
import { NavLink } from "react-router-dom";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { BiNote } from 'react-icons/bi';
import Clock from "../clock";
import RandomQuotes from "../randomQuotes";
import { useLocation } from "react-router-dom";

const UserInfo = () => {
  const location = useLocation();
  const user = location.state; // Assuming you want to display the first user's information

  return (
    <>
      <div className="userInfoContainer">
        <div className="randomQuotes">
          <h1><RandomQuotes/></h1>
        </div>
        <div style={{position:'absolute', right: '6rem', top:'1rem'}}>
          <span><Clock/></span>
        </div>
        <div className="userInfo">
          <div style={{ display: "flex", gap: "1rem"}}>
            <h1 className="lastName">{user.lastName},</h1>
            <h1 className="firstName">{user.firstName}</h1>
          </div>
          <div style={{display:'flex', flexDirection:'column',fontStyle:'italic', letterSpacing:'.1rem',color:'black'}}>
          <span className="address">{user.address}</span>
          <span className="contactNumber">{user.contactNumber}</span>
          <span className="email">{user.email}</span>
          <span className="amount">Balance: {user.amount}</span>
          </div>
        </div>
        <div className="transactionContainer">
          <div className="transactionHistoryContainer">
            <h1>Transaction History</h1>
            <ul
  className="transactionHistoryListContainer"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }}
>
  {user.transactionHistory.map((transaction, index) => (
    <li
      key={index}
      style={{
        color:
          transaction.transaction === "Withdrawal" ||
          transaction.transaction === "Transfer"
            ? "#E48585"
            : "#88C372",
      }}
    >
      {transaction.transaction === "Withdrawal" || transaction.transaction === "Transfer"
        ? "-"
        : "+"}
      {transaction.amount > 0 ? "$" : "-$"}
      {Math.abs(transaction.amount)} | {transaction.date} | {transaction.transaction} | 
      {transaction.receiver ? `Receiver: ${transaction.receiver}` : "No Receiver"}
    </li>
  ))}
</ul>
          </div>
          <div className="bankActivity" style={{ width: "100%" }}>
            <NavLink to="" className="withDraw">
              <span>
                <BiMoneyWithdraw />
              </span>
              <div className="text">Withdraw</div>
            </NavLink>
            <NavLink to="" className="deposit">
              <span>
                <GiPayMoney />
              </span>
              <div className="text">Deposit</div>
            </NavLink>
            <NavLink to="" className="transfer">
              <span>
              <FaMoneyBillTransfer />
              </span>
              <div className="text">Transfer</div>
            </NavLink>
          </div>
        </div>
        <button className="addNotes">
          <BiNote/>
        </button>
      </div>
    </>
  );
};

export default UserInfo;