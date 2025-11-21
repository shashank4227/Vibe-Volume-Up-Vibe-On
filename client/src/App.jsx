import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './Home'
import Explore from './pages/Explore'
import Library from './pages/Library'
import Login from './pages/Login'
import { PlayerProvider } from './context/PlayerContext.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'

function App() {
  return (
    <Router>
      <PlayerProvider>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
          {/* <Header /> */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/library" element={<Library />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <MusicPlayer />
        </div>
      </PlayerProvider>
    </Router>
  )
}

export default App
