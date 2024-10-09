import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import './Allocation.css'; // Custom CSS for styling
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const Allocation = () => {
  const [isChartVisible, setIsChartVisible] = useState(false);
  const pieChartRef = useRef(null);

  const data = {
    labels: [
      'Rice (32.96%)',
      'Lentils (48.38%)',
      'Cooking Oil (9.16%)',
      'Water (5.86%)',
      'Salt, Spices, etc. (3.67%)',
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

  // Options for chart animation
  const options = {
    animation: {
      duration: isChartVisible ? 1000 : 0, // Only animate when the chart is visible
    },
  };

  // Intersection Observer to detect when the chart enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsChartVisible(true); // Trigger animation when visible
        }
      },
      {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the chart is visible
      }
    );

    if (pieChartRef.current) {
      observer.observe(pieChartRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (pieChartRef.current) {
        observer.unobserve(pieChartRef.current);
      }
    };
  }, []);

  return (
    <div id="allocation" className="donation-container">
      <div className="breakdown card">
        <h2>
          <FontAwesomeIcon icon={faShoppingCart} /> Breakdown of Funds
        </h2>
        <p>
          Our goal is to provide essential food supplies to families affected by
          the recent disaster. Here’s how your donations will be allocated:
        </p>
        <div className="card-container">
          <div className="fund-card">
            🌾
            <h3>Rice</h3>
            <p>32.96% for rice to provide nourishment.</p>
          </div>
          <div className="fund-card">
            🫘
            <h3>Lentils</h3>
            <p>48.38% for lentils to ensure protein intake.</p>
          </div>
          <div className="fund-card">
            🍶
            <h3>Cooking Oil</h3>
            <p>9.16% for cooking oil for healthy meals.</p>
          </div>
          <div className="fund-card">
            💧
            <h3>Water</h3>
            <p>5.86% for water, essential for survival.</p>
          </div>
          <div className="fund-card">
            🧂🧅🧄
            <h3>Salt, Spices, etc.</h3>
            <p>3.67% for salt and spices to enhance flavors.</p>
          </div>
        </div>

        <div ref={pieChartRef} className="pie-chart">
          <h2>Fund Allocation</h2>
          <Pie data={data} options={options} />
        </div>
      </div>

      <div className="transparency card">
        <h2>
          <FontAwesomeIcon icon={faClipboardCheck} /> Transparency
        </h2>
        <p>
          We promise to provide regular updates on how funds are being used.
          This includes:
        </p>
        <div className="card-container">
          <div className="transparency-card">
            🧾
            <h3>Receipts</h3>
            <p>
              Publishing receipts for all purchases made with donation funds.
            </p>
          </div>
          <div className="transparency-card">
            📽️
            <h3>Stories</h3>
            <p>Sharing the names and stories of families receiving aid.</p>
          </div>
          <div className="transparency-card">
            📈
            <h3>Live Tracker</h3>
            <p>Creating a live tracker to show fund allocation and expenses.</p>
          </div>
        </div>
        <p>
          Our aim is to maintain full transparency and ensure that every dollar
          is used effectively to help those in need.
        </p>
      </div>
    </div>
  );
};

export default Allocation;
