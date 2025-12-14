import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (isAuthenticated) {
      if (window.confirm('Do you want to logout?')) {
        logout();
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src='./logo.png' className='logo-icon' height={80} width={80}/>
          
        </div>

        <div className="search-bar desktop-only">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search artists, songs, or podcasts..." />
        </div>

        <div className="header-controls">
          {/* <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button> */}
          <button className="search-toggle" aria-label="Open search" onClick={() => setShowMobileSearch(v => !v)}>
            <FiSearch />
          </button>
          <button 
            className="user-btn" 
            onClick={handleUserClick}
            title={isAuthenticated ? `Logged in as ${user?.username}` : 'Login'}
          >
            {isAuthenticated ? <FiLogOut /> : <FiUser />}
          </button>
        </div>
      </header>

      {showMobileSearch && (
        <div className="mobile-search-container">
          <div className="mobile-search-bar">
            {/* <FiSearch className="search-icon" /> */}
            <input type="text" placeholder="Search artists, songs, or podcasts..."  />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;