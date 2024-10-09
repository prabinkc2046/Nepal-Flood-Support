import React from 'react';
import './ContributorModal.css'; // Add styles for the modal

const ContributorModal = ({ selectedContributor, onClose, timeSince }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{selectedContributor.name}</h3>
        <div className="contribution-count">
          {selectedContributor.contributionsCount === 1 ? (
            <>🏆</>
          ) : (
            // Render multiple icons based on contributionsCount
            Array.from({ length: selectedContributor.contributionsCount }).map(
              (_, i) => <>🥇</>
            )
          )}
        </div>

        <p className="amount">Contribution: ${selectedContributor.amount}</p>
        <p className="thoughts">{selectedContributor.thoughts}</p>
        <p className="date-contributed">
          {timeSince(selectedContributor.date)}
        </p>
        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContributorModal;
