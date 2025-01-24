import { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const images = [
    '/assets/workDone/IMG-20250123-WA0000.jpg',
    '/assets/workDone/IMG-20250122-WA0006.jpg',
    '/assets/workDone/IMG-20250122-WA0014.jpg',
    '/assets/workDone/IMG-20250122-WA0023.jpg',
    '/assets/workDone/IMG-20250122-WA0009.jpg',
    '/assets/workDone/IMG-20250122-WA0015.jpg',
    '/assets/workDone/IMG-20250122-WA0024.jpg',
    '/assets/workDone/IMG-20250122-WA0010.jpg',
    '/assets/workDone/IMG-20250122-WA0016.jpg',
    '/assets/workDone/IMG-20250122-WA0025.jpg',
    '/assets/workDone/IMG-20250122-WA0011.jpg',
    '/assets/workDone/IMG-20250122-WA0017.jpg',
    '/assets/workDone/IMG-20250122-WA0027.jpg',
    '/assets/workDone/IMG-20250122-WA0012.jpg',
    '/assets/workDone/IMG-20250122-WA0018.jpg',
    '/assets/workDone/IMG-20250122-WA0028.jpg',
    '/assets/workDone/IMG-20250122-WA0013.jpg',
    '/assets/workDone/IMG-20250122-WA0020.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );
  };

  const getNextImageIndex = index => {
    return (index + 1) % images.length;
  };

  return (
    <section className="gallery-gallery20">
      <div className="gallery-sectionTitle">
        <b className="gallery-imageGallery">Updates on Your Contributions</b>
        <p className="gallery-loremIpsumDolor">
          Thanks to your generous support, we provided blankets to 150
          flood-affected families in Kathmandu. This essential aid was
          distributed to meet the immediate need for warmth during the cold
          winter season.
        </p>
      </div>
      <div className="gallery-container">
        <div className="gallery-content">
          <img
            className="gallery-placeholderImage1"
            alt="Gallery item"
            src={images[currentImageIndex]}
          />
          <img
            className="gallery-placeholderImage1"
            alt="Gallery item"
            src={images[getNextImageIndex(currentImageIndex)]}
          />
        </div>
        <div className="gallery-content1">
          <div className="gallery-sliderDots">
            {images.map((_, index) => (
              <div
                key={index}
                className={`gallery-dot1 ${
                  currentImageIndex === index ? 'gallery-activeDot' : ''
                }`}
              />
            ))}
          </div>
          <div className="gallery-sliderButtons">
            <div className="gallery-button" onClick={handlePrev}>
              <img
                className="gallery-iconLeftArrowAlt"
                alt="Previous itemitem"
                src="/assets/icon/left-arrow-alt.svg"
              />
            </div>
            <div className="gallery-button" onClick={handleNext}>
              <img
                className="gallery-iconLeftArrowAlt"
                alt="Next"
                src="/assets/icon/right-arrow-alt.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
