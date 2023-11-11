import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import "./assets/modal.css";

const TransferModal = ({ isOpen, onRequestClose, currentUserId }) => {
  const [transferAmount, setTransferAmount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const referenceUser = users.find((user) => user.id === currentUserId);

      if (!referenceUser) {
        throw new Error('User not found');
      }

      if (transferAmount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      const userIdToTransfer = parseInt(receiver, 10)
      const receiverUser = users.find((user) => user.id === userIdToTransfer);

      if (!receiverUser) {
        throw new Error('Receiver user not found');
      }

      const transferAmount = parseFloat(depositAmount);

      const newSenderBalance = referenceUser.amount - transferAmount;
      referenceUser.amount = newSenderBalance;

      const newReceiverBalance = receiverUser.amount + transferAmount;
      receiverUser.amount = newReceiverBalance;

      const newTransactionSender = {
        date: new Date().toISOString(),
        transaction: 'Transfer (Out)',
        amount: transferAmount,
        receiver: receiverUser.name, 
      };
      referenceUser.transactionHistory.push(newTransactionSender);

      const newTransactionReceiver = {
        date: new Date().toISOString(),
        transaction: 'Transfer (In)',
        amount: transferAmount,
        receiver: null,
      };
      receiverUser.transactionHistory.push(newTransactionReceiver);

      localStorage.setItem('users', JSON.stringify(users));

      toast.success('Transfer successful');
      onRequestClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleDeposit}>
        <h2 className="modal-title">Transfer</h2>
        <div className="transferInput flex flex-col p-4 gap-4">
          <span style={{ fontWeight: 'bold' }}>Transfer Amount:</span>
          <input
            type="number"
            name="transferAmount"
            placeholder="Enter amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <input
            type="text"
            name="receiver"
            placeholder="Enter Receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <input
          type="text"
          name="receiverId"
          placeholder="Enter Receiver Id"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          />
          {/* Add form fields for userId, name, etc. */}
          <button type="submit">Transfer</button>
        </div>
        <button onClick={onRequestClose} className="close">
          <AiOutlineClose />
        </button>
      </form>
    </div>
  );
};

export default TransferModal;
