import React, { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null); // { title, artist, image, audioSrc }
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]); // array of songs
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const playSong = useCallback((song, options = {}) => {
    const { playlist = null, startIndex = null } = options;
    if (playlist && Array.isArray(playlist)) {
      setQueue(playlist);
      if (typeof startIndex === 'number') setCurrentIndex(startIndex);
    } else {
      setQueue([]);
      setCurrentIndex(-1);
    }
    setCurrentSong(song);
    setIsPlaying(true);
  }, []);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause(); else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    if (queue.length === 0) return;
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(queue[nextIndex]);
    setIsPlaying(true);
  }, [queue, currentIndex]);

  const prev = useCallback(() => {
    if (queue.length === 0) return;
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentIndex(prevIndex);
    setCurrentSong(queue[prevIndex]);
    setIsPlaying(true);
  }, [queue, currentIndex]);

  // Sync audio element when song/volume/playing changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    // Smooth transition: pause current before setting new src
    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    audio.src = currentSong.audioSrc || '';
    if (currentSong.audioSrc) {
      audio.load();
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [currentSong]);

  // Attach audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onEnd = () => {
      if (queue.length > 0) next();
      else setIsPlaying(false);
    };
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, [next, queue.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        next();
      } else if (e.code === 'ArrowLeft') {
        prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, next, prev]);

  const seek = useCallback((time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(Math.max(time, 0), duration || 0);
  }, [duration]);

  const value = useMemo(() => ({
    audioRef,
    currentSong,
    isPlaying,
    queue,
    currentIndex,
    volume,
    duration,
    currentTime,
    setVolume,
    playSong,
    play,
    pause,
    togglePlay,
    next,
    prev,
    seek,
    setQueue,
  }), [currentSong, isPlaying, queue, currentIndex, volume, duration, currentTime, togglePlay, next, prev, seek, play, pause, playSong]);

  return (
    <PlayerContext.Provider value={value}>
      {/* Hidden audio element at root */}
      <audio ref={audioRef} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}


