import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Get login function from context

  const from = location.state?.from?.pathname || "/admin/dashboard"; // Redirect to previous or dashboard

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password); // Call login from context
      navigate(from, { replace: true }); // Navigate to dashboard or intended page
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Login failed. Please check credentials.');
      console.error("Login page error:", err);
    }
  };

  return (
    <div className="admin-login-page flex flex-col items-center justify-center min-h-screen pt-16"> {/* Added pt-16 for navbar */}
      <form onSubmit={handleSubmit} className="bg-netflix-light-gray p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-netflix-red hover:bg-red-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
