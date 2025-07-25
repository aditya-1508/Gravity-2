import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const API_URL = 'https://gravity-2-1.onrender.com/api/todos';
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, config);
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await axios.post(API_URL, { text }, config);
      setTodos([res.data, ...todos]);
      setText('');
    } catch (err) {
      console.error('Failed to create todo:', err.response?.data || err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { completed: !completed }, config);
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error('Failed to update todo:', err.response?.data || err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, config);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err.response?.data || err);
    }
  };

  const startEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const res = await axios.put(`${API_URL}/${id}`, { text: editText }, config);
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      setEditId(null);
      setEditText('');
    } catch (err) {
      console.error('Failed to update todo:', err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">📝 Your Todo List</h1>

        <form onSubmit={createTodo} className="flex mb-6 gap-2">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition duration-300"
          >
            Add
          </button>
        </form>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex items-center justify-between px-4 py-3 rounded-xl shadow-md transition-all duration-300 ${
                  todo.completed ? 'bg-green-100' : 'bg-slate-100'
                }`}
              >
                {editId === todo._id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none mr-2"
                    />
                    <button
                      onClick={() => saveEdit(todo._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() => toggleComplete(todo._id, todo.completed)}
                      className={`flex-1 cursor-pointer text-lg ${
                        todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}
                    >
                      {todo.text}
                    </span>
                    <div className="ml-2 flex-shrink-0 space-x-2">
                      <button
                        onClick={() => startEdit(todo._id, todo.text)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ❌
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todo;