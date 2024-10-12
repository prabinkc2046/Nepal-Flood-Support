import React from 'react';
import './About.css'; // Custom CSS for styling

const About = () => {
  return (
    <div id="about" className="container">
      <div className="flex-column">
        {/* About the Cause Card */}
        <div className="card section">
          <div className="rainfall-container">
            <div className="card-logo">🌧️</div> {/* Icon */}
            <h2>Cause of The Flood</h2>
            <p>
              South Asia's monsoon has worsened, with heavier, longer rains.
              Kathmandu received 322 mm of rain in three days, setting a record.
              The flooding has caused massive destruction.
            </p>
            <p>
              Read more:
              <a
                href="https://peoplesdispatch.org/2024/09/30/unprecedented-rains-cause-floods-and-landslides-in-nepal-killing-nearly-200-people/"
                target="_blank"
                rel="noopener noreferrer"
                className="source-link"
              >
                Peoples Dispatch
              </a>
            </p>
          </div>
        </div>

        {/* Purpose of Fundraising Card */}
        <div className="card section">
          <div className="card-logo">💰</div> {/* Icon */}
          <h2>Fundraising Goal</h2>
          <p>
            We aim to provide food, water, shelter, and medical aid. Donations
            will help rebuild homes and support long-term recovery.
          </p>
          <button className="donate-button">Donate Now</button>
        </div>

        {/* Organizing Body Card */}
        <div className="card section">
          <div className="card-logo">🏫</div> {/* Icon */}
          <h2>About the Campaign</h2>
          <p>
            Led by{' '}
            <a
              href="https://beershebaschool.edu.np/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beersheba National School
            </a>
            , a trusted institution in Kathmandu, dedicated to helping the
            community recover.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
