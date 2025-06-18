import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // For login API call

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Load token from localStorage
  const [loading, setLoading] = useState(true); // To manage initial auth state check

  useEffect(() => {
    // You might want to verify the token with the backend here or decode it to get user info
    // For simplicity, if a token exists, we'll assume the user might be logged in.
    // A robust implementation would verify the token against a backend endpoint.
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem('user'); // Clear corrupted data
        localStorage.removeItem('token');
        setToken(null);
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/admin/login', { username, password });
      if (response.data.token) {
        setToken(response.data.token);
        // Assuming the backend returns some user info (e.g., username, userId)
        const userData = { username: response.data.username, userId: response.data.userId };
        setCurrentUser(userData);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user info
        return true; // Indicate login success
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      // Rethrow or handle error appropriately for the UI
      throw error.response?.data?.message || new Error('Login failed');
    }
    return false; // Indicate login failure
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    token,
    login,
    logout,
    isAuthenticated: !!token, // Or !!currentUser, depending on your logic
    loadingAuth: loading // To let components know if auth state is being determined
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Don't render children until initial auth check is done */}
    </AuthContext.Provider>
  );
};
