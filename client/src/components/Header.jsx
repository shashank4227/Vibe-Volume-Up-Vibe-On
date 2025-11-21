import React, { useState } from 'react';
import { FiSearch, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
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
          <FiUser className="user-avatar" />
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