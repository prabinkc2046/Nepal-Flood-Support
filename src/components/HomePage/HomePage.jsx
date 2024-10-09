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
        <h1>Donate to Support Flood Relief Efforts</h1>
        <p>
          Nepal has been hit by devastating floods caused by record-breaking
          rainfall, with over 200 people killed and thousands displaced.
          Working-class riverside communities are the hardest hit, suffering
          severe damage to their homes and livelihoods. The disaster has been
          worsened by poor urban planning and the effects of climate change. You
          can help by donating to provide critical resources for rescue
          operations, infrastructure rebuilding, and support for affected
          families.
        </p>
        <div className="info-credit">
          <p>
            source:{' '}
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
            {/* Theme image before video plays */}
            <img
              src={`${process.env.PUBLIC_URL}/assets/flood-banner.png`}
              alt="Flood in Nepal"
              className="theme-image"
            />
            {/* Play button overlay */}
            <button onClick={handlePlayVideo} className="play-button">
              ▶
            </button>
          </div>
        ) : (
          <iframe
            className="video-player"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/8oQSECt3LZc?autoplay=1"
            title="Nepal Flood Crisis"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {/* Credit the source of the video */}
        <div className="video-credit">
          <p>
            source:{' '}
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
