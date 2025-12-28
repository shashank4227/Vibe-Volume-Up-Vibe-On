import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { albums } from '../data/albums';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Use data from albums.js for slides
  // We filter to show only the featured albums (first 4) in the slideshow
  const slides = albums.slice(0, 4);

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

  const handlePlayNow = () => {
    navigate(`/album/${current.id}`);
  };

  return (
    <section className="hero-slideshow">
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
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
            {current.year} • {current.songsCount} Songs • {current.artist}
          </p>
          <button 
            onClick={handlePlayNow}
            className="px-6 py-2 md:px-8 md:py-3 bg-[#FF2DD1] hover:bg-[#FF2DD1]/10 border-2 border-transparent hover:border-[#FF2DD1] rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-[#FF2DD1]/30 text-sm md:text-base w-fit"
          >
            <Play size={18} fill="currentColor" />
            Play Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
