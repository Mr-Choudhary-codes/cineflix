import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import WatchPage from './pages/WatchPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import { AuthProvider, useAuth } from './context/AuthContext'; // Import Auth context

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, loadingAuth } = useAuth(); // Use new auth context

  if (loadingAuth) {
    return <div>Loading authentication...</div>; // Or a spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function AppContent() { // Renamed App to AppContent to use hooks from AuthProvider
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8"> {/* Added some padding */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route path="*" element={<div className="text-center text-2xl mt-10">404 - Page Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider> {/* Wrap everything with AuthProvider */}
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
