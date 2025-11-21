import React from "react";
import { FaPlay } from "react-icons/fa";
import "./SongCard.css";
import { usePlayer } from "../context/PlayerContext.jsx";

const SongCard = ({ image, title, artist, audioSrc, onClick }) => {
  const { playSong } = usePlayer();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      playSong({ image, title, artist, audioSrc });
    }
  };
  return (
    <div className="song-card-horizontal" onClick={handleClick} role="button" tabIndex={0}>
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
        <div className="play-icon-overlay">
          {/* Removed linear gradient SVG */}
          <FaPlay className="play-icon" />
        </div>
      </div>
      <div className="card-info">
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
