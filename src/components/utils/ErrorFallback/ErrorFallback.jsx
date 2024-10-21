// src/components/ErrorFallback.jsx
import React from 'react';
import './ErrorFallback.css'; // Import CSS for styling

const ErrorFallback = ({ onRetry, message }) => {
  return (
    <div className="error-fallback">
      <h3>Something went wrong.</h3>
      <p>{message}</p>

      <button className="retry-button" onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
};

export default ErrorFallback;
