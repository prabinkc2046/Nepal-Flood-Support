import React from 'react';
import './About.css'; // Custom CSS for styling

const About = () => {
  return (
    <div id="about" className="about-section card">
      <div className="about-container">
        {/* About the Cause Card */}
        <div className="card">
          <div className="rainfall-container">
            <div className="card-logo">🌧️</div> {/* Add relevant icons */}
            <h2>Cause of The Recent Flood</h2>
            <p>
              <strong>Effects of Climate Change:</strong> The monsoon season in
              South Asia has grown more severe and prolonged in recent years.
              Nepal has seen a significant increase in both the volume and
              intensity of rain. Between Thursday and Saturday, Kathmandu
              received 322 mm of rain, with 240 mm falling in just one day, a
              record over two decades. The extended monsoon and unprecedented
              rains have caused widespread flooding and destruction.
            </p>
            <p>
              For more details, visit the source:
              <a
                href="https://peoplesdispatch.org/2024/09/30/unprecedented-rains-cause-floods-and-landslides-in-nepal-killing-nearly-200-people/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Peoples Dispatch
              </a>
              .
            </p>
          </div>
        </div>

        {/* Purpose of Fundraising Card */}
        <div className="card">
          <div className="card-logo">💰</div> {/* Icon for fundraising */}
          <h2>Purpose of Fundraising</h2>
          <p>
            Our fundraising efforts focus on providing immediate relief for the
            most basic needs. Donations will primarily go towards food, clean
            water, emergency shelter, and medical supplies. As we assess the
            full scope of the damage, future efforts will expand to rebuilding
            homes and infrastructure, ensuring long-term recovery for affected
            communities.
          </p>
          <button className="donate-button">Donate Now</button>{' '}
          {/* Call-to-action */}
        </div>

        {/* Organizing Body Card */}
        <div className="card">
          <div className="card-logo">🏫</div> {/* Icon for organizing body */}
          <h2>Who is Behind the Campaign</h2>
          <p>
            This campaign is led by{' '}
            <a
              href="https://beershebaschool.edu.np/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beersheba National Secondary School
            </a>
            , a reputable institution in Kathmandu that is deeply committed to
            community welfare and development. With a focus on nurturing future
            leaders and creating resilient, critical thinkers, the school aims
            to extend its support beyond education and help the larger community
            recover from this disaster.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
