import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import './GetInvolved.css';
import { toast } from 'react-toastify';
import { contacts } from '../../Constants/contact';

const GetInvolved = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const { shareLink, shareMessage, socialPlatforms } = contacts;

  const handleShare = platform => {
    const { url, alertMessage } = socialPlatforms[platform];

    if (platform === 'instagram') {
      toast.info(alertMessage, { position: 'bottom-right' }); // Use toast for Instagram alert
      return;
    }

    const shareUrl = url(shareLink, shareMessage);
    window.open(shareUrl, '_blank');
  };

  const handleCopyLink = () => {
    const textArea = document.createElement('textarea');
    textArea.value = shareLink;

    // Ensure the textarea is off-screen to avoid layout shifting
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Unable to copy the link', err);
    }

    document.body.removeChild(textArea); // Clean up the DOM
  };

  return (
    <div id="involved" className="card section">
      <h2>Get Involved</h2>
      <p>
        Help us raise funds by sharing this link with your friends and family:
      </p>
      <p className="share-link">{shareLink}</p>
      <button onClick={handleCopyLink} className="copy-link-btn">
        {linkCopied ? (
          <div>
            Copied <FontAwesomeIcon icon={faCheck} />
          </div>
        ) : (
          <div>
            Copy Link <FontAwesomeIcon icon={faCopy} />
          </div>
        )}
      </button>

      <div className="share-buttons">
        {Object.entries(socialPlatforms).map(([key, platform]) => (
          <button
            key={key}
            onClick={() => handleShare(key)}
            className={`share-btn ${key}`}
          >
            <FontAwesomeIcon icon={platform.icon} /> {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GetInvolved;
