import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './Allocation.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { allocationData } from '../../Constants/allocationData';
import { scrollToSection } from '../utils/scrollToSection';

ChartJS.register(ArcElement, Tooltip, Legend);

const Allocation = () => {
  const [isChartVisible, setIsChartVisible] = useState(false);

  return (
    <div id="allocation" className="card section">
      <div className="allocation-header">
        <h2>How We Allocate Donations</h2>
        <p>
          Your generosity helps us provide essential food and supplies to
          families in need. Here’s a breakdown of how we use your contributions:
        </p>
      </div>

      <div className="allocation-content">
        {/* Pie Chart Section */}
        <div className={`pie-chart-section ${isChartVisible ? 'visible' : ''}`}>
          <button
            className="toggle-chart-btn"
            onClick={() => setIsChartVisible(!isChartVisible)}
          >
            {isChartVisible
              ? 'Hide Allocation Breakdown'
              : 'Show Allocation Breakdown'}
          </button>
          <div className={`pie-chart ${isChartVisible ? 'show' : ''}`}>
            <h3>How the Funds Are Distributed</h3>
            <Pie data={allocationData.pieData} />
          </div>
        </div>

        {/* Fund Details Section */}
        <div className="fund-details">
          {allocationData.fundItems.map((item, idx) => (
            <div
              key={idx}
              className="sustenance-item"
              style={{
                backgroundImage: `url(${item.imgSrc})`,
              }}
            >
              <div className="sustenance-item-overlay">
                <h3>{item.label}</h3>
                <p>{item.percentage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="donate-button" onClick={() => scrollToSection('give')}>
        Donate Now
      </button>
    </div>
  );
};

export default Allocation;
