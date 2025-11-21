import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SongRow from './components/SongRow.jsx';
import SongCard from './components/SongCard.jsx';
// import AlbumCard from './components/AlbumCard.jsx'; // No longer needed
import './style.css';
import { usePlayer } from './context/PlayerContext.jsx';

// --- MOCK DATA ---
const trendingSongs = [
  { id: 1, title: 'Pushpa 1: The Rise', artist: 'Devi Sri Prasad', image: './pushpa.jpg', audioSrc: './audio/pushpa.mp3' },
  { id: 2, title: 'Kingdom', artist: 'Anirudh Ravichander', image: './kingdom.jpg', audioSrc: './audio/kingdom.mp3' },
  { id: 3, title: 'Andhra King Taluka', artist: 'Vivek & Mervin', image: './andhra_king.jpg', audioSrc: './audio/andhra_king.mp3' },
  { id: 4, title: 'Dude', artist: 'Sai Abhyankar', image: './dude.jpg', audioSrc: './audio/dude.mp3' },
  { id: 5, title: 'Mirai', artist: 'Gowra Hari', image: 'mirai.jpg', audioSrc: './audio/mirai.mp3' },
];

const recentlyPlayed = [
  { id: 1, title: 'Meesaala Pilla', artist: 'Bheems Ceciroleo', image: './shankar.jpg', audioSrc: './audio/meesaala_pilla.mp3' },
  { id: 2, title: 'Guns and Roses', artist: 'Thaman S', image: './og.jpeg', audioSrc: './audio/guns_and_roses.m4a' },
  { id: 3, title: 'Sogasu Chudatharama', artist: 'Thaman S', image: './telusu_kadha.jpg', audioSrc: './audio/sogasu.mp3' },
  { id: 4, title: 'Monica', artist: 'Anirudh Ravichander', image: './monica.jpg', audioSrc: './audio/monica.mp3' },
  { id: 5, title: 'Singari', artist: 'Sai Abhyankar', image: './singari.jpg', audioSrc: './audio/singari.mp3' }
];
// ------------------


function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { playSong, setQueue } = usePlayer();

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      
      <div className="particles"></div>

      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <Hero />
      
      <main className="main-content">
        <SongRow title="Trending Albums">
          {trendingSongs.map((song, index) => (
            <SongCard 
              key={song.id} 
              image={song.image} 
              title={song.title} 
              artist={song.artist} 
              audioSrc={song.audioSrc}
              onClick={() => { setQueue(trendingSongs); playSong(song, { playlist: trendingSongs, startIndex: index }); }}
            />
          ))}
        </SongRow>

        <SongRow title="Latest Songs">
          {/* This is the change you requested:
            We are now using <SongCard /> instead of <AlbumCard />
          */}
          {recentlyPlayed.map((song, index) => ( // Changed 'album' to 'song' for clarity
            <SongCard 
              key={song.id} 
              image={song.image} 
              title={song.title} 
              artist={song.artist} 
              audioSrc={song.audioSrc}
              onClick={() => { setQueue(recentlyPlayed); playSong(song, { playlist: recentlyPlayed, startIndex: index }); }}
            />
          ))}
        </SongRow>
      </main>
      <br/>
      <br/>
      <br />
      <br />
      
    </div>
  );
}

export default Home;