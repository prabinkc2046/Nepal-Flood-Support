import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import './Allocation.css'; // Custom CSS
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Allocation = () => {
  const [isChartVisible, setIsChartVisible] = useState(false);
  const pieChartRef = useRef(null);

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

  const pieOptions = {
    animation: { duration: isChartVisible ? 1000 : 0 }, // Animate only when visible
  };

  return (
    <div id="allocation" className="donation-container">
      <div className="breakdown card">
        <h2>
          <span className="icon">🛠️</span> Breakdown of Funds
        </h2>
        <p>
          We provide essential food supplies to families affected by the
          disaster. Here’s how donations are allocated:
        </p>

        <div ref={pieChartRef} className="pie-chart card">
          <h2>Fund Allocation</h2>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div className="card-container">
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
              icon: '🧂🧅🧄',
              label: 'Salt & Spices',
              percentage: '3.67%',
              desc: 'To enhance flavor.',
            },
          ].map((item, idx) => (
            <div key={idx} className="fund-card">
              <span className="allocation-item-icon"> {item.icon}</span>
              <h3>{item.label}</h3>
              <p>
                {item.percentage} {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="transparency card">
        <h2>
          <span className="icon">✅</span> Transparency
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
            <div key={idx} className="transparency-card">
              <span className="transparency-item-icon">{item.icon}</span>
              <h3>{item.label}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <p>
          Our goal is full transparency, ensuring every dollar is effectively
          used to help those in need.
        </p>
      </div>
    </div>
  );
};

export default Allocation;
