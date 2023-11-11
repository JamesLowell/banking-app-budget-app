import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./assets/modal.css";
import { toast } from "react-toastify";
import { useLoaderData, Form, redirect } from "react-router-dom";

export async function withdrawAction({ request, params }) {
  try {
    const formData = await request.formData();
    const withdrawForm = Object.fromEntries(formData);
    const users = JSON.parse(localStorage.getItem('users'));

    const referenceUser = users.find(user => user.id === parseInt(params.userId, 10));

    if (referenceUser) {
      if (withdrawForm.withdrawAmount > 0 && withdrawForm.withdrawAmount < referenceUser.amount) {
        const newBalance = referenceUser.amount - withdrawForm.withdrawAmount;
        const newTransaction = {
          date: new Date().toISOString(),
          transaction: "Withdrawal",
          amount: withdrawForm.withdrawAmount, 
          receiver: null,
        };
        referenceUser.amount = newBalance;
        referenceUser.transactionHistory.push(newTransaction);

        localStorage.setItem('users', JSON.stringify(users));
        return redirect(`../user/${params.userId}`)

      } else {
        console.log(parseInt(withdrawForm.withdrawAmount, 10));
        console.log(referenceUser.amount);
        throw new Error('Insufficient balance');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    toast.error(`${error}`);
    return { error: 'An unexpected error occurred' };
  }
}

const WithdrawModal = ({ isOpen, onRequestClose }) => {
  const user = useLoaderData();

  return (
    <div>
      <Form method="post" id="withdraw-form">
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
              name="withdrawAmount"
              placeholder="Enter amount"
            />
          <button type="submit">
            Withdraw
          </button>
        </div>
        <button onClick={onRequestClose} className="close">
          <AiOutlineClose />
        </button>
      </Form>
    </div>
  );
};

export default WithdrawModal;
