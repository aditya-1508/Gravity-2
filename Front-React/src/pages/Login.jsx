// pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/animations.css'; // Optional extra animation styles
import '../index.css'; // ✅ Tailwind styles

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://gravity-2-1.onrender.com/api/auth/login', { email, password });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center animate-fade-in">
      

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-500 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 animate-slide-down">
          Welcome Back 👋
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm text-center animate-pulse">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
