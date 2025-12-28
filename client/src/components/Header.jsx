import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { albums } from '../data/albums';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length < 1) {
      setResults([]);
      return;
    }

    const lowerTerm = searchTerm.toLowerCase();
    const newResults = [];

    albums.forEach(album => {
      // 1. Check Album Title & Artist
      if (album.title.toLowerCase().includes(lowerTerm) || album.artist.toLowerCase().includes(lowerTerm)) {
        newResults.push({ type: 'album', data: album, match: 'Album' });
      }

      // 2. Check Songs
      album.songs.forEach(song => {
        if (song.title.toLowerCase().includes(lowerTerm) || song.artist.toLowerCase().includes(lowerTerm)) {
          // Check if not already added this album as a "Song" match reference (optional, but let's just add the song)
          newResults.push({ type: 'song', data: song, albumId: album.id, albumImage: album.image, match: 'Song' });
        }
      });
    });

    setResults(newResults.slice(0, 10)); // Limit to 10 results
  };

  const handleResultClick = (result) => {
    if (result.type === 'album') {
      navigate(`/album/${result.data.id}`);
    } else if (result.type === 'song') {
      navigate(`/album/${result.albumId}?playSongId=${result.data.id}`);
    }
    setResults([]);
    setQuery('');
    setShowMobileSearch(false);
  };

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

  const SearchResults = () => {
    if (results.length === 0) return null;
    return (
      <div className="absolute top-full left-0 right-0 bg-[#222] border border-[#333] rounded-b-lg shadow-2xl z-50 max-h-[60vh] overflow-y-auto mt-2">
        {results.map((result, idx) => (
          <div 
            key={idx} 
            onClick={() => handleResultClick(result)}
            className="flex items-center gap-3 p-3 hover:bg-[#333] cursor-pointer transition-colors border-b border-white/5 last:border-0"
          >
            <img 
              src={result.type === 'album' ? result.data.image : result.albumImage} 
              alt="art" 
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex flex-col">
              <span className="text-white font-medium text-sm">
                {result.type === 'album' ? result.data.title : result.data.title}
              </span>
              <span className="text-gray-400 text-xs">
                {result.playerMatch || (result.type === 'album' ? 'Album' : `Song • ${result.data.artist}`)}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <header className="header relative z-50">
        <div className="logo cursor-pointer" onClick={() => navigate('/')}>
          <img src='./logo.png' className='logo-icon' height={80} width={80} alt="Vibe Logo"/>
        </div>

        {/* Desktop Search */}
        <div className="search-bar hidden md:flex relative" ref={searchRef}>
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search artists, songs, or albums..." 
            value={query}
            onChange={handleSearch}
          />
          {query.length > 0 && <SearchResults />}
        </div>

        <div className="header-controls">
          <button className="search-toggle md:hidden text-2xl" aria-label="Open search" onClick={() => setShowMobileSearch(v => !v)}>
            {showMobileSearch ? <span className="text-xl">✕</span> : <FiSearch />}
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

      {/* Mobile Search - Slide Down */}
      <div 
        className={`md:hidden bg-black overflow-visible transition-all duration-300 ease-in-out ${
          showMobileSearch ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 relative">
          <div className="flex bg-[#222] rounded-lg items-center px-3 border border-[#333]">
            <FiSearch className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..."  
              value={query}
              onChange={handleSearch}
              className="w-full p-3 bg-transparent text-white outline-none placeholder-gray-500"
            />
          </div>
          
          {/* Mobile Results - Absolute Overlay */}
          {results.length > 0 && showMobileSearch && (
             <div className="absolute top-[calc(100%-8px)] left-0 right-0 mx-4 bg-[#111] border border-[#333] rounded-b-lg shadow-2xl z-40 max-h-[60vh] overflow-y-auto">
                {results.map((result, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleResultClick(result)}
                    className="flex items-center gap-3 p-3 border-b border-white/5 last:border-0 active:bg-[#333]"
                  >
                    <img 
                      src={result.type === 'album' ? result.data.image : result.albumImage} 
                      alt="art" 
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-white font-medium text-sm">
                        {result.type === 'album' ? result.data.title : result.data.title}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {result.playerMatch || (result.type === 'album' ? 'Album' : `Song • ${result.data.artist}`)}
                      </span>
                    </div>
                  </div>
                ))}
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;