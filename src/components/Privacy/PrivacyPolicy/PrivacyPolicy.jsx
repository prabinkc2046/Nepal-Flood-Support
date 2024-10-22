import React, { useState } from 'react';
import './PrivacyPolicy.css'; // Import the CSS file for styling
import PolicyContent from '../PolicyContent/PolicyContent';

const PrivacyPolicy = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control the visibility of the policy

  const togglePolicy = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="privacy" className="privacy-policy-container">
      <button className="toggle-button" onClick={togglePolicy}>
        {isOpen ? 'Close Policy' : 'Read Policy'}
      </button>

      {isOpen && <PolicyContent />}
    </div>
  );
};

export default PrivacyPolicy;
