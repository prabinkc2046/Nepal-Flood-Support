import React from 'react';
import './Transparency.css'; // Custom CSS for Transparency component

const Transparency = () => {
  return (
    <div className="card section">
      <h2>
        <span className="card-logo">✅</span> Transparency
      </h2>
      <p>We commit to regular updates on fund usage, including:</p>

      <div className="card-container">
        {[
          {
            icon: '🧾',
            label: 'Receipts',
            desc: 'Publishing receipts for all purchases made with donations.',
          },
          {
            icon: '📽️',
            label: 'Stories',
            desc: 'Sharing the names and stories of families receiving aid.',
          },
          {
            icon: '📈',
            label: 'Live Tracker',
            desc: 'Tracking fund allocation and expenses in real-time.',
          },
        ].map((item, idx) => (
          <div key={idx} className="fund-card">
            <span className="card-logo">{item.icon}</span>
            <h3>{item.label}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <p>
        Our goal is full transparency, ensuring every dollar is effectively used
        to help those in need.
      </p>

      <button className="donate-button">Donate Now</button>
    </div>
  );
};

export default Transparency;
