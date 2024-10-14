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
          FloodAid Nepal
        </a>

        {/* Hamburger icon for mobile/tablet */}
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>

        {/* Menu links */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {[
            'home',
            'aim',
            'allocation',
            'transparency',
            'give',
            'let us thank you',
            'involved',
            'contributor',
            'updates',
            'faqs',
            'contact',
          ].map((item, index) => (
            <li className="nav-item" key={index}>
              <a href={`#${item}`} className="nav-links" onClick={toggleMenu}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
