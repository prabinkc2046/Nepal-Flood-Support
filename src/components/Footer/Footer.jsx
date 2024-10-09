import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src="/assets/logo.png"
              alt="HopeForNepal Logo"
              className="logo"
            />
            <p>HopeForNepal - Helping flood victims rebuild their lives.</p>
          </div>
          <div className="footer-links">
            <a href="#home" className="footer-link">
              Home
            </a>
            <a href="#about" className="footer-link">
              Cause
            </a>
            <a href="#allocation" className="footer-link">
              Allocation
            </a>
            <a href="#give" className="footer-link">
              Give
            </a>
            <a href="#get-involved" className="footer-link">
              Get Involved
            </a>
            <a href="#contact" className="footer-link">
              Contact
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 HopeForNepal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
