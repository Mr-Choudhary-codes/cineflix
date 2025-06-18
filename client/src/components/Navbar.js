import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Navbar = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to homepage after logout
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-netflix-dark' : 'bg-transparent'}`}>
      <Link to='/' className='text-2xl sm:text-3xl font-bold text-netflix-red'>Movie Magic</Link>
      <div>
        {isAuthenticated ? (
          <>
            {currentUser && <span className='text-gray-300 mr-4'>Welcome, {currentUser.username}!</span>}
            <Link to='/admin/dashboard' className='text-white hover:text-gray-300 mr-4'>Dashboard</Link>
            <button onClick={handleLogout} className='bg-netflix-red hover:bg-red-700 text-white py-2 px-4 rounded transition-colors'>
              Logout
            </button>
          </>
        ) : (
          <Link to='/admin/login' className='text-white hover:text-gray-300'>Admin Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
