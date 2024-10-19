import React from 'react';
import './About.css'; // Custom CSS for styling
import { scrollToSection } from '../utils/scrollToSection';

const About = () => {
  return (
    <div id="aim" className="container">
      <div className="flex-column">
        {/* About the Cause Card */}
        <div className="card section">
          <div className="rainfall-container">
            <h2>Why the Flood Happened</h2>
            <p>
              South Asia's monsoon has worsened, with heavier, longer rains.
              Kathmandu received 322 mm of rain in three days, setting a record.
              The flooding has caused massive destruction.
            </p>
            <div className="credit">
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
        </div>

        {/* Purpose of Fundraising Card */}
        <div className="section fundraising-goal">
          <h2>Join Us in Providing Hope and Relief</h2> {/* Updated Title */}
          {/* Essential Needs Goal */}
          <div className="goal-item card">
            <div className="goal-description">
              <h3>Essential Needs</h3>
              <p>
                Our immediate aim is to provide food and water to those affected
                by the floods.
              </p>
            </div>

            <img
              src={`${process.env.PUBLIC_URL}/assets/mission/foodWater/foodWater.webp`}
              alt="Food and Water Distribution"
              className="goal-image"
            />
          </div>
          {/* Winter Support Goal */}
          <div className="goal-item">
            <div className="goal-description">
              <h3>Winter Support</h3>
              <p>
                If funds allow, we will provide warm clothing and essentials as
                winter approaches.
              </p>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/mission/winterClothes/winterClothes.webp`}
              alt="Warm Clothing Distribution"
              className="goal-image"
            />
          </div>
          {/* Rebuilding Homes Goal */}
          <div className="goal-item card">
            <div className="goal-description">
              <h3>Rebuilding Homes</h3>
              <p>
                Ultimately, we aim to help rebuild homes and support long-term
                recovery for affected families.
              </p>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/mission/homeRebuilding/homeRebuilding.webp`}
              alt="Rebuilding Homes"
              className="goal-image"
            />
          </div>
          <button
            className="donate-button"
            onClick={() => scrollToSection('give')}
          >
            Donate Now
          </button>
        </div>

        {/* Organizing Body Card */}
        <div className="card section">
          <h2>About the Campaign</h2>
          <p>
            Led by{' '}
            <a
              href="https://beershebaschool.edu.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              Beersheba National Secondary School situated at Nagarjun
              Municipality, Ward no - 6, Ichadole, Kathmandu, Nepal{' '}
            </a>{' '}
            , a trusted institution in Kathmandu, dedicated to helping the
            community recover.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
