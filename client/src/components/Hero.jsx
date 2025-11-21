import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // optional, nice icons

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: './s1.jpg',
      title: 'Coolie',
      year: 2025,
      songs: 8,
      artist: 'Anirudh Ravichander',
    },
    {
      image: './s2.jpg',
      title: 'F1',
      year: 2025,
      songs: 8,
      artist: 'Hans Zimmer',
    },
    {
      image: './s3.jpg',
      title: 'Pushpa 2: The Rule',
      year: 2024,
      songs: 5,
      artist: 'Devi Sri Prasad',
    },
    {
      image: './s4.jpg',
      title: 'Kalki 2898 AD',
      year: 2024,
      songs: 3,
      artist: 'Santhosh Narayanan',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section className="hero-slideshow">
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        {/* Arrows */}
        <div className="nav-arrow left" onClick={prevSlide}>
          <ChevronLeft size={32} color="white" />
        </div>
        <div className="nav-arrow right" onClick={nextSlide}>
          <ChevronRight size={32} color="white" />
        </div>

        {/* Overlay Info Section */}
        <div className="slide-info">
          <h1 className="slide-title">{current.title}</h1>
          <p className="slide-meta">
            {current.year} • {current.songs} Songs • {current.artist}
          </p>
          <button className="play-btn">▶ Play Now</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
