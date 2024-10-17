import React, { useState } from 'react';
import './HomePage.css'; // Custom CSS for styling
import { scrollToSection } from '../utils/scrollToSection';
const HomePage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div id="home" className="homepage-container container">
      {/* Headline Section */}
      <header className="headline-section section">
        <h1>Support Flood Relief Efforts</h1>
        <p className="text-center">
          Nepal has been severely impacted by devastating floods, leading to
          immense damage and displacement. Your donation can make a real
          difference in providing vital resources for relief and recovery.
        </p>
        <div className="info-credit credit source-link">
          <p>
            Source:{' '}
            <a
              href="https://www.aljazeera.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              Al Jazeera
            </a>
          </p>
        </div>
      </header>

      {/* Video Section */}
      <div className="section video-section">
        {!isVideoPlaying ? (
          <div className="video-thumbnail rounded-corner">
            <img
              src={`${process.env.PUBLIC_URL}/assets/theme/villageUnderWater-small.webp`}
              srcSet={`
              ${process.env.PUBLIC_URL}/assets/theme/villageUnderWater-small.webp 600w,
              ${process.env.PUBLIC_URL}/assets/theme/villageUnderWater-medium-large.webp 1024w
              `}
              sizes="(max-width: 600px) 600px, 1024px"
              alt="Flood in Nepal"
              className="theme-image"
            />
            <button
              onClick={handlePlayVideo}
              className="play-button flex-center"
            >
              ▶
            </button>
          </div>
        ) : (
          <iframe
            className="video-player"
            src="https://www.youtube.com/embed/8oQSECt3LZc?autoplay=1"
            title="Nepal Flood Crisis"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        <div className="video-credit credit">
          <p>
            Source:{' '}
            <a
              href="https://www.aljazeera.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              Al Jazeera
            </a>
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="donate-button-container flex-center">
        <button
          className="donate-button"
          onClick={() => scrollToSection('give')}
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
