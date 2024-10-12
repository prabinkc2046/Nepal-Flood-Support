import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './Allocation.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Allocation = () => {
  const [isChartVisible, setIsChartVisible] = useState(false);

  const pieData = {
    labels: [
      'Rice (32.96%)',
      'Lentils (48.38%)',
      'Cooking Oil (9.16%)',
      'Water (5.86%)',
      'Salt & Spices (3.67%)',
    ],
    datasets: [
      {
        data: [32.96, 48.38, 9.16, 5.86, 3.67],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div className="card section">
      <div className="allocation-header">
        <h2>
          {' '}
          <span className="card-logo">🛠️</span> Breakdown of Funds
        </h2>
        <p>
          We provide essential food supplies to families affected by the
          disaster. Here’s how donations are allocated:
        </p>
      </div>

      <div className="allocation-content">
        {/* Pie Chart Section */}
        <div className={`pie-chart-section ${isChartVisible ? 'visible' : ''}`}>
          <button
            className="toggle-chart-btn"
            onClick={() => setIsChartVisible(!isChartVisible)}
          >
            {isChartVisible ? 'Hide Allocation Chart' : 'See Allocation Chart'}
          </button>
          <div className={`pie-chart ${isChartVisible ? 'show' : ''}`}>
            <h3>Fund Allocation</h3>
            <Pie data={pieData} />
          </div>
        </div>

        {/* Fund Details Section */}
        <div className="fund-details">
          {[
            {
              icon: '🌾',
              label: 'Rice',
              percentage: '32.96%',
              desc: 'For providing nourishment.',
            },
            {
              icon: '🫘',
              label: 'Lentils',
              percentage: '48.38%',
              desc: 'To ensure protein intake.',
            },
            {
              icon: '🍶',
              label: 'Cooking Oil',
              percentage: '9.16%',
              desc: 'For healthy meals.',
            },
            {
              icon: '💧',
              label: 'Water',
              percentage: '5.86%',
              desc: 'Essential for survival.',
            },
            {
              icon: '🧂🧄',
              label: 'Salt & Spices',
              percentage: '3.67%',
              desc: 'To enhance flavor.',
            },
          ].map((item, idx) => (
            <div key={idx} className="fund-card">
              <span className="card-logo">{item.icon}</span>
              <h3>{item.label}</h3>
              <p>{item.percentage}</p>
              <p className="fund-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allocation;
