import React from 'react';
import './ProgressBarTextSkeleton.css';

const ProgressBarTextSkeleton = ({ width, height, marginBottom = '10px' }) => {
  return (
    <div
      className="text-skeleton"
      style={{
        width,
        height,
        marginBottom,
      }}
    />
  );
};

export default ProgressBarTextSkeleton;
