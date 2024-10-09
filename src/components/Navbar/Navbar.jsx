import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Import the CSS

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle the menu open/close for mobile view
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close the menu if clicked outside
      }
    };

    // Attach event listeners
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container" ref={menuRef}>
        {/* Logo */}
        <a href="#home" className="navbar-logo">
          <img src="/assets/logo.png" alt="Logo" className="logo" />
          HopeForNepal{' '}
        </a>

        {/* Hamburger icon for mobile/tablet */}
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>

        {/* Menu links */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#home" className="nav-links" onClick={toggleMenu}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-links" onClick={toggleMenu}>
              Cause
            </a>
          </li>
          <li className="nav-item">
            <a href="#allocation" className="nav-links" onClick={toggleMenu}>
              Allocation
            </a>
          </li>
          <li className="nav-item">
            <a href="#give" className="nav-links" onClick={toggleMenu}>
              Give
            </a>
          </li>
          <li className="nav-item">
            <a href="#get-involved" className="nav-links" onClick={toggleMenu}>
              Get Involved
            </a>
          </li>
          <li className="nav-item">
            <a href="#contributor" className="nav-links" onClick={toggleMenu}>
              Contributor
            </a>
          </li>
          <li className="nav-item">
            <a href="#update" className="nav-links" onClick={toggleMenu}>
              Update
            </a>
          </li>

          <li className="nav-item">
            <a href="#faqs" className="nav-links" onClick={toggleMenu}>
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-links" onClick={toggleMenu}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
