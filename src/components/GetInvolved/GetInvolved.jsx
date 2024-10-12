import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
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
    navigator.clipboard.writeText(shareLink).then(() => {
      setLinkCopied(true);
      toast.success('Link copied to clipboard!'); // Toast for link copied
      setTimeout(() => setLinkCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div id="get-involved" className="card section">
      <span className="card-logo">🙋‍♂️ 🙋🏻‍♀️</span>
      <h2>Get Involved</h2>
      <p>
        Help us raise funds by sharing this link with your friends and family:
      </p>
      <p className="share-link">{shareLink}</p>
      <button onClick={handleCopyLink} className="copy-link-btn">
        {linkCopied ? (
          <div className="check-mark">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        ) : (
          'Copy Link'
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
