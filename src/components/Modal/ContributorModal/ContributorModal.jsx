import React, { useEffect } from 'react';
import './ContributorModal.css'; // Add styles for the modal
import { capitalizeFirstLetter } from '../../utils/capitaliseFirstLetter';

const ContributorModal = ({ selectedContributor, onClose, timeSince }) => {
  // Function to handle click outside the modal content
  const handleClickOutside = event => {
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    // Attach the event listener when the modal is mounted
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener when the modal is unmounted
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>
          {selectedContributor.publish_name
            ? `${capitalizeFirstLetter(selectedContributor.first_name)}`
            : 'Anonymous'}
        </h3>

        <p className="thoughts">
          {capitalizeFirstLetter(selectedContributor.thoughts)}
        </p>
        <p className="date-contributed">
          {timeSince(selectedContributor.date)}
        </p>

        <p className="amount">${selectedContributor.amount}</p>

        <button onClick={onClose} className="details-btn">
          <span style={{ fontSize: '1rem' }}>ㄨ</span>
        </button>
      </div>
    </div>
  );
};

export default ContributorModal;
