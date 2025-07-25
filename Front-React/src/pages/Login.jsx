// pages/Login.jsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as THREE from 'three';
import RINGS from 'vanta/dist/vanta.rings.min';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  // Initialize Vanta.js on mount
  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = RINGS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x111827,
        color: 0x6366f1,
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://gravity-2-1.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div ref={vantaRef} className="min-h-screen w-full flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 animate-slide-down">
          Welcome Back 👋
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm text-center animate-pulse">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-700 text-center mt-4">
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
