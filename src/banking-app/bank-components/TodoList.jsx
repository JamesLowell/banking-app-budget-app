import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import "./assets/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    showTasks();
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
      saveTasks([...todos, newTodo]);
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    saveTasks(updatedTodos);
  };

  const saveTasks = (tasks) => {
    localStorage.setItem("data", JSON.stringify(tasks));
  };

  const showTasks = () => {
    const storedTasks = localStorage.getItem("data");
    if (storedTasks) {
      setTodos(JSON.parse(storedTasks));
    }
  };

  return (
    <div className="todo-list">
      <h2 className="todoListTitle">Add Notes</h2>
      <div>
        <input
          style={{ width: "25rem", margin: "1rem", padding: "1rem" }}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>
          <BsFillPencilFill />
        </button>
        <ul>
          {todos.map((todo, index) => (
            <li style={{ padding: "1rem 2rem" }} key={index}>
              {todo}
              <button
                style={{ paddingLeft: "1rem" }}
                onClick={() => removeTodo(index)}
              >
                <AiOutlineDelete />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
