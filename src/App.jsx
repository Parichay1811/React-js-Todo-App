import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaSave } from "react-icons/fa";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setTodos((prev) => [
        ...prev,
        { text: input, completed: false },
      ]);
      setInput("");
    }
  };

  // Delete Todo
  const handleDelete = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  // Edit Todo
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  // Save Edited Todo
  const handleSave = () => {
    if (editValue.trim() === "") return;

    setTodos((prev) =>
      prev.map((todo, i) =>
        i === editIndex ? { ...todo, text: editValue } : todo
      )
    );

    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="App">
      <h1>What is your plan today 🙂 ?</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Write your todo here..."
          value={input}
          className="searchBar"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="container">
        {todos.map((todo, index) => (
          <div className="todo-card" key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button className="btn-3" onClick={handleSave}>
                  <FaSave />
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <span className="btn">
                  <button
                    className="btn-1"
                    onClick={() => handleDelete(index)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className="btn-2"
                    onClick={() => handleEdit(index)}
                  >
                    <FaRegEdit />
                  </button>
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
