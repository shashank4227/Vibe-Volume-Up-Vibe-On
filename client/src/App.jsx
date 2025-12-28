import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './Home'
import Explore from './pages/Explore'
import Library from './pages/Library'
import Login from './pages/Login'
import AlbumDetails from './pages/AlbumDetails'
import { PlayerProvider } from './context/PlayerContext.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'

import { AuthProvider } from './context/AuthContext.jsx'

import { useLocation } from 'react-router-dom'

function AppContent() {
  const location = useLocation();
  const showPlayer = location.pathname !== '/login';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/library" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/album/:id" element={<AlbumDetails />} />
        </Routes>
      </main>
      {showPlayer && <MusicPlayer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <PlayerProvider>
          <AppContent />
        </PlayerProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
