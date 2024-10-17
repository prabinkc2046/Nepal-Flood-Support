import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src="/assets/logo-small.png"
              alt="FloodAid Nepal Logo"
              className="logo"
            />
            <p>FloodAid Nepal - Helping flood victims rebuild their lives.</p>
          </div>
          <div className="footer-links">
            <a href="#home" className="footer-link">
              Home
            </a>
            <a href="#aim" className="footer-link">
              Aim
            </a>
            <a href="#allocation" className="footer-link">
              Allocation
            </a>
            <a href="#transparency" className="footer-link">
              Transparency
            </a>

            <a href="#give" className="footer-link">
              Give
            </a>
            <a href="#let us thank you" className="footer-link">
              Let us thank you
            </a>
            <a href="#involved" className="footer-link">
              Get Involved
            </a>
            <a href="#updates" className="footer-link">
              Update
            </a>
            <a href="#faqs" className="footer-link">
              FAQs
            </a>
            <a href="#contact" className="footer-link">
              Contact
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 FloodAid Nepal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
