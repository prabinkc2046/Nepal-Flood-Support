// CopyButton.js
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import './CopyButton.css';

const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);
  const textAreaRef = useRef(null); // Optional ref for textarea if needed

  const handleCopy = () => {
    try {
      // Create a hidden <textarea> element
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);

      // Select the text inside the textarea
      textArea.select();
      textArea.setSelectionRange(0, 99999); // For mobile devices

      // Execute the copy command
      document.execCommand('copy');
      document.body.removeChild(textArea); // Clean up

      // Update state to show success feedback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000); // Reset after 3s
    } catch (error) {
      console.error('Copy failed:', error);
      toast.info('Copy failed! Please try manually.');
    }
  };

  return (
    <button className="copy-button" onClick={handleCopy}>
      {isCopied ? (
        <FontAwesomeIcon icon={faCheck} style={{ color: '#fff' }} />
      ) : (
        <FontAwesomeIcon icon={faCopy} />
      )}
    </button>
  );
};

export default CopyButton;
