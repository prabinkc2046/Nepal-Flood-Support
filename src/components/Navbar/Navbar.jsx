import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  let scrollTimeout = null;
  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu on item click
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle scrolling detection
  const handleScroll = () => {
    // Do nothing if the nav menu is open
    if (isOpen) {
      return;
    }
    // Clear previous timeout if still scrolling
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Show navbar when scrolling starts
    setIsScrolling(true);
    setIsVisible(true);

    // Hide navbar after 3 seconds of no scrolling
    scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
      setIsVisible(false);
    }, 3000); // Adjust the time (3 seconds) to suit your preference
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  const navItems = [
    {
      id: 'home',
      name: 'Home',
      description: 'Welcome to our platform',
      image: 'home.webp',
    },
    {
      id: 'aim',
      name: 'Our Mission',
      description: 'Our vision and goals',
      image: 'aim.webp',
    },
    {
      id: 'allocation',
      name: 'Fund Allocation',
      description: 'How we allocate funds',
      image: 'allocation.webp',
    },
    {
      id: 'transparency',
      name: 'Transparency',
      description: 'Our transparent operations',
      image: 'transparency.webp',
    },
    {
      id: 'give',
      name: 'Donate',
      description: 'Support our cause',
      image: 'donate.webp',
    },
    {
      id: 'let us thank you',
      name: 'Thank You',
      description: 'Let us appreciate you',
      image: 'thankyou.webp',
    },
    {
      id: 'involved',
      name: 'Get Involved',
      description: 'Join our efforts',
      image: 'involved.webp',
    },
    {
      id: 'contributor',
      name: 'Contributors',
      description: 'Meet our supporters',
      image: 'contributors.webp',
    },
    {
      id: 'updates',
      name: 'Latest Updates',
      description: 'Stay informed',
      image: 'updates.webp',
    },
    {
      id: 'faqs',
      name: 'FAQs',
      description: 'Your questions answered',
      image: 'faqs.webp',
    },
    {
      id: 'contact',
      name: 'Contact',
      description: 'Get in touch',
      image: 'contact.webp',
    },
  ];

  return (
    <nav className="navbar">
      <div
        className={`navbar-header ${
          isVisible || isOpen ? 'visible' : 'hidden'
        }`}
      >
        {/* Logo with name */}
        <div className="navbar-logo">
          <img src="/assets/logo.png" alt="FloodAid Nepal" className="logo" />
          <h3 className={`logo-name ${isOpen ? 'active' : ''}`}>
            FloodAid Nepal
          </h3>
        </div>

        {/* Hamburger icon */}
        <div
          className={`menu-icon ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>
      </div>

      {/* Fullscreen menu */}
      <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <h1 className="menu-title">Support Flood Relief Efforts</h1>
        <ul className="nav-items">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item" onClick={closeMenu}>
              <a href={`#${item.id}`} className="nav-card">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/navImages/${item.image}`}
                  alt={item.name}
                  className="nav-card-image"
                />
                <div className="nav-card-content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
