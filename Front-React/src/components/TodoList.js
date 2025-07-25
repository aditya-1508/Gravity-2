import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function TodoList() {
  const { token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // Fetch todos from backend
  const fetchTodos = async () => {
    const res = await fetch('http://localhost:5000/api/todos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAdd = async () => {
    if (!task.trim()) return;
    const res = await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ task })
    });
    if (res.ok) {
      setTask('');
      fetchTodos();
    }
  };

  // Toggle complete
  const toggleTodo = async id => {
    const res = await fetch(`http://localhost:5000/api/todos/${id}/toggle`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchTodos();
  };

  // Delete todo
  const deleteTodo = async id => {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchTodos();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">My ToDos</h2>
      <div className="flex mb-4">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="Enter a task"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks yet.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li
              key={todo._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span
                onClick={() => toggleTodo(todo._id)}
                className={`cursor-pointer ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {todo.task}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
