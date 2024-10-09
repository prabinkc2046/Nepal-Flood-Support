import React, { useState } from 'react';
import './HomePage.css'; // Custom CSS for styling

const HomePage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div id="home" className="homepage-container card">
      {/* Headline Section */}
      <header className="headline-section">
        <h1>Support Flood Relief Efforts</h1>
        <p>
          Nepal has faced devastating floods, causing significant damage and
          displacement. Your donation can help provide critical resources for
          rescue operations and support affected families.
        </p>
        <div className="info-credit">
          <p>
            Source:{' '}
            <a
              href="https://www.aljazeera.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Al Jazeera
            </a>
          </p>
        </div>
      </header>

      {/* Video Section */}
      <div className="video-section">
        {!isVideoPlaying ? (
          <div className="video-thumbnail">
            <img
              src={`${process.env.PUBLIC_URL}/assets/flood-banner.png`}
              alt="Flood in Nepal"
              className="theme-image"
            />
            <button onClick={handlePlayVideo} className="play-button">
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
        <div className="video-credit">
          <p>
            Source:{' '}
            <a
              href="https://www.aljazeera.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Al Jazeera
            </a>
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="donate-button-container">
        <button className="donate-button">Donate Now</button>
      </div>
    </div>
  );
};

export default HomePage;
