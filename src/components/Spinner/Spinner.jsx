import React from 'react';
import './Spinner.css'; // Custom CSS for the spinner

const Spinner = ({
  text = 'Hang on while we update your details...',
  containerClassName = '',
  textClassName = '',
}) => {
  return (
    <div className={`spinner-container ${containerClassName}`}>
      <div className="spinner"></div>
      <span className={textClassName}>{text}</span>
    </div>
  );
};

export default Spinner;
