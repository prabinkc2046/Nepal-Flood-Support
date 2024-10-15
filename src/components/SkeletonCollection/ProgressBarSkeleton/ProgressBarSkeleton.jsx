import React from 'react';
import './ProgressBarSkeleton.css';

const ProgressBarSkeleton = ({
  width,
  height,
  borderRadius = '5px',
  marginBottom = '10px',
}) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        marginBottom,
      }}
    />
  );
};

export default ProgressBarSkeleton;
