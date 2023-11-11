import React, { useEffect } from "react";
import { Link, Form } from "react-router-dom";
import "./assets/UserInfo.css";
import { NavLink, useLoaderData } from "react-router-dom";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BiNote } from "react-icons/bi";
import Clock from "../../component/clock";
import RandomQuotes from "../../component/randomQuotes";
import { useState } from "react";
import ReactModal from "react-modal";
import WithdrawModal from "../bank-components/transaction-modal/WithdrawModal";
import DepositModal from "../bank-components/transaction-modal/DepositModal";
import TransferModal from "../bank-components/transaction-modal/TransferModal";

export async function userLoader({ params }) {
  const usersData = (await JSON.parse(localStorage.getItem("users"))) || [];
  const userId = params.userId;
  const user = usersData.find((users) => users.id === Number(userId));
  return user;
}

const UserInfo = () => {
  const user = useLoaderData();

  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type)
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className="userInfoContainer">
      <div className="randomQuotes">
        <h1><RandomQuotes /></h1>
      </div>
      <div style={{ position: "absolute", right: "6rem", top: "1rem" }}>
        <span><Clock /></span>
      </div>    
        <div className="userInfo relative">
          <div style={{ display: "flex", gap: "1rem" }}>
            <h1 className="lastName">{user.lastName},</h1>
            <h1 className="firstName">{user.firstName}</h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontStyle: "italic",
              letterSpacing: ".1rem",
              color: "black",
            }}
          >
            <span className="address">{user.address.houseNumber} {user.address.city} {user.address.province} {user.address.country}</span>
            <span className="contactNumber">{user.contactNumber}</span>
            <span className="email">{user.email}</span>
            <span className="amount">Balance: {user.amount}</span>
            <Form action='edit' className="absolute bottom-4 right-32">
              <Link to={`../user/${user.id}/edit`}>Edit User Information</Link>
            </Form>
          </div>
      </div>
      <div className="transactionContainer">
        <div className="transactionHistoryContainer">
          <h1>Transaction History</h1>
          <ul className="transactionHistoryListContainer">
            {user.transactionHistory.map((transaction, index) => (
              <li key={index} style={{ color: (transaction.transaction === "Withdrawal" || transaction.transaction === "Transfer") ? "#E48585" : "#88C372" }}>
                {(transaction.transaction === "Withdrawal" || transaction.transaction === "Transfer") ? "-" : "+"}
                {transaction.amount > 0 ? "$" : "-$"}{Math.abs(transaction.amount)} | {transaction.date} | {transaction.transaction} |{transaction.receiver ? `Receiver: ${transaction.receiver}` : "No Receiver"}
              </li>
            ))}
          </ul>
        </div>
        <div className="bankActivity" style={{ width: '100%' }}>
          <NavLink onClick={() => {openModal('withdraw') }} className="withDraw">
            <span><BiMoneyWithdraw /></span>
            <div className="text">Withdraw</div>
          </NavLink>
          <NavLink onClick={() => openModal('deposit')} className="deposit">
            <span><GiPayMoney /></span>
            <div className="text">Deposit</div>
          </NavLink>
          <NavLink onClick={() => openModal('transfer')} className="transfer">
            <span><FaMoneyBillTransfer /></span>
            <div className="text">Transfer</div>
          </NavLink>
        </div>
        <button className="addNotes"><BiNote /></button>
      </div>
      <ReactModal
        isOpen={modalType === 'withdraw'}
        onRequestClose={closeModal}
        className="my-modal"
        overlayClassName="my-overlay"
      >
        <WithdrawModal isOpen={true} onRequestClose={closeModal} currentUserId={1} />
      </ReactModal>
      <ReactModal
        isOpen={modalType === 'deposit'}
        onRequestClose={closeModal}
        className="my-modal"
        overlayClassName="my-overlay"
      >
        <DepositModal isOpen={modalType === 'deposit'} onRequestClose={closeModal} currentUserId={user.id}/>
      </ReactModal>
      <ReactModal
        isOpen={modalType === 'transfer'}
        onRequestClose={closeModal}
        className="my-modal"
        overlayClassName="my-overlay"
      >
        <TransferModal isOpen={modalType === 'transfer'} onRequestClose={closeModal} currentUserId={user.id}/>
      </ReactModal>
    </div>
  );
};

export default UserInfo;