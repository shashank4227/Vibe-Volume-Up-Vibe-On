import React from 'react';
import { FaPlay } from 'react-icons/fa';

const AlbumCard = ({ image, title, artist }) => {
  return (
    <div className="album-card-vertical">
      <img src={image} alt={title} className="card-image" />
      <div className="play-icon-overlay">
        <FaPlay />
      </div>
      <div className="card-info">
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;