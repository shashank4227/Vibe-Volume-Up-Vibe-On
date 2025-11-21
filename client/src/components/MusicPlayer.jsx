import React, { useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext.jsx';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { HiOutlineVolumeUp, HiOutlineVolumeOff } from 'react-icons/hi';

const formatTime = (t) => {
  if (!t || Number.isNaN(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    next,
    prev,
    volume,
    setVolume,
    duration,
    currentTime,
    seek,
  } = usePlayer();

  const progress = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  if (!currentSong) return null;

  return (
    <div className="music-player">
      {/* Left Section: Album Art and Metadata */}
      <div className="mp-left">
        <img src={currentSong.image} alt={currentSong.title} className="mp-art" />
        <div className="mp-meta">
          <div className="mp-title">{currentSong.title}</div>
          <div className="mp-artist">{currentSong.artist}</div>
        </div>
      </div>

      {/* Center Section: Controls and Progress */}
      <div className="mp-center">
        <div className="mp-controls">
          <button className="mp-btn" onClick={prev} aria-label="Previous">
            <BiSkipPrevious size={28} />
          </button>
          <button className="mp-btn mp-play" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <AiFillPauseCircle size={36} /> : <AiFillPlayCircle size={36} />}
          </button>
          <button className="mp-btn" onClick={next} aria-label="Next">
            <BiSkipNext size={28} />
          </button>
        </div>
        <div className="mp-progress">
          <span className="mp-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="progress-slider"
            min={0}
            max={duration || 0}
            value={currentTime || 0}
            onChange={(e) => seek(Number(e.target.value))}
            style={{
              "--progress": `${progress}%`,
            }}
          />



          <span className="mp-time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Section: Volume Control */}
      <div className="mp-right" style={{display:"flex",alignItems:"center"}}>
        {volume > 0 ? (
          <HiOutlineVolumeUp size={20} color="#fff" />
        ) : (
          <HiOutlineVolumeOff size={20} color="#fff" />
        )}
        <input
          type="range"
          className="volume-slider"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
          style={{
            "--volume": `${volume * 100}%`,
            marginLeft: '12px', // spacing between icon and slider
            verticalAlign: 'middle', // align with icon center
          }}
        />
      </div>

    </div>
  );
}

export default MusicPlayer;
