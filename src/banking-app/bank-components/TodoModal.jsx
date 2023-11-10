import React from "react";
import TodoList from "./TodoList";
import './assets/TodoList.css'
import { RxCross2 } from "react-icons/rx";

const TodoModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="todoListOverlay">
      <div className="todoListModal">
        <span className="close-button" onClick={onClose}>
          <RxCross2/>
        </span>
        <TodoList />
      </div>
    </div>
  );
};

export default TodoModal;