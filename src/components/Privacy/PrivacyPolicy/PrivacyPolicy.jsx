import React, { useState } from 'react';
import Loadable from 'react-loadable';
import PrivacyContentSkeleton from '../../SkeletonCollection/PrivacyContentSkeleton/PrivacyContentSkeleton';
import './PrivacyPolicy.css'; // Import the CSS file for styling
import ErrorFallback from '../../utils/ErrorFallback/ErrorFallback';

// Loadable component with loading and error handling
const LoadablePolicyContent = Loadable({
  loader: () => import('../PolicyContent/PolicyContent'),
  loading: () => <PrivacyContentSkeleton />, // Loading indicator
  render(loaded, props) {
    if (loaded.error) {
      // Handle error in the component
      return <ErrorFallback />; // Display ErrorFallback when there is an error
    }
    const Component = loaded.default;
    return <Component {...props} />;
  },
});

const PrivacyPolicy = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control the visibility of the policy
  const [loadError, setLoadError] = useState(false); // State for load error
  const timeoutDuration = 10000; // Set timeout duration (10 seconds)

  const togglePolicy = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setLoadError(false); // Reset error state when opening
      // Start a timeout to handle loading errors
      const timeoutId = setTimeout(() => {
        setLoadError(true);
      }, timeoutDuration);

      // Cleanup timeout on unmount or when the policy is closed
      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <div id="privacy" className="privacy-policy-container">
      <button className="toggle-button" onClick={togglePolicy}>
        {isOpen ? 'Close Policy' : 'Read Policy'}
      </button>

      {isOpen && (
        <>
          {loadError ? (
            <ErrorFallback message="There was an error loading the privacy policy. Please try again later." />
          ) : (
            <LoadablePolicyContent />
          )}
        </>
      )}
    </div>
  );
};

export default PrivacyPolicy;
