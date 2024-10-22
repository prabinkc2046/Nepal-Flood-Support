import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';
import ContactDetail from '../ContactDetail/ContactDetail';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle state for opening/closing body

  // Toggle Contact Section
  const toggleContactSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="contact" className="card section">
      <div onClick={toggleContactSection} className="toggle-header">
        <h2>Contact Us</h2>
        <p>Your support can make a difference for flood victims in Nepal.</p>
        <FontAwesomeIcon
          className="toggle-icon"
          icon={isOpen ? faCircleMinus : faCirclePlus}
        />
      </div>

      {isOpen && <ContactDetail isOpen={isOpen} />}
    </div>
  );
};

export default Contact;
