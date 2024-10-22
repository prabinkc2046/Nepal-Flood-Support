import React, { useState } from 'react';
import Loadable from 'react-loadable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import ContactDetailSkeleton from '../../SkeletonCollection/ContactDetailSkeleton/ContactDetailSkeleton';
import ErrorFallback from '../../utils/ErrorFallback/ErrorFallback';
import './Contact.css';

// Loadable component with loading and error handling
const LoadableContactDetail = Loadable({
  loader: () => import('../ContactDetail/ContactDetail'),
  loading: () => <ContactDetailSkeleton />, // Loading indicator
  render(loaded, props) {
    if (loaded.error) {
      throw new Error('Failed to load component');
    }
    const Component = loaded.default;
    return <Component {...props} />;
  },
});

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle state for opening/closing body
  const [loadError, setLoadError] = useState(false); // State for load error
  const timeoutDuration = 10000; // Set timeout duration (10 seconds)

  // Toggle Contact Section
  const toggleContactSection = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setLoadError(false); // Reset error state when opening
      const timeoutId = setTimeout(() => {
        setLoadError(true);
      }, timeoutDuration);
      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    }
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

      {isOpen &&
        (loadError ? (
          <ErrorFallback message="There was an error loading the contact details. Please try again later." />
        ) : (
          <LoadableContactDetail
            isOpen={isOpen}
            onError={() => setLoadError(true)}
          />
        ))}
    </div>
  );
};

export default Contact;
