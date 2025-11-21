import React from 'react';

const SongRow = ({ title, children }) => {
  return (
    <section className="song-row">
      <h2 className="section-title">{title}</h2>
      <div className="horizontal-scroll-list">
        {children}
      </div>
    </section>
  );
};

export default SongRow;