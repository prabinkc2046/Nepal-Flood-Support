import React from 'react';
import './ContributorSkeleton.css'; // Import the corresponding CSS

const ContributorSkeleton = () => {
  return (
    <div className="contributor-item-skltn">
      <div className="contributor-heading-skltn"></div>

      <div className="thoughts-skltn"></div>
      <div className="amount-skltn"></div>
      <button className="details-btn-skltn"></button>
    </div>
  );
};

export default ContributorSkeleton;
