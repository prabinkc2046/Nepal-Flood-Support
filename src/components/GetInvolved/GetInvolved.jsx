import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './GetInvolved.css';

import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faWhatsapp,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const GetInvolved = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const shareLink = 'https://your-link-to-raise-funds.com'; // Replace with your actual link
  const shareMessage =
    'Join us in our mission! Help raise funds by sharing this link!';

  const handleShare = platform => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareLink
        )}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareMessage
        )}&url=${encodeURIComponent(shareLink)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareLink
        )}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareMessage + ' ' + shareLink
        )}`;
        break;
      case 'instagram':
        alert(
          'Instagram does not support direct sharing via URL. Please copy the link manually.'
        );
        return;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div id="get-involved" className="get-involved-container card">
      <h2>Get Involved</h2>
      <p>
        Help us raise funds by sharing this link with your friends and family:
      </p>
      <p className="share-link">{shareLink}</p>
      <button onClick={handleCopyLink} className="copy-link-btn">
        {linkCopied ? (
          <div className="check-mark">
            <FontAwesomeIcon icon={faCheck} style={{ color: 'white' }} />
          </div>
        ) : (
          'Copy Link'
        )}
      </button>

      <div className="share-buttons">
        <button
          onClick={() => handleShare('facebook')}
          className="share-btn facebook"
        >
          <FontAwesomeIcon icon={faFacebook} /> Facebook
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="share-btn twitter"
        >
          <FontAwesomeIcon icon={faTwitter} /> Twitter
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="share-btn linkedin"
        >
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </button>
        <button
          onClick={() => handleShare('whatsapp')}
          className="share-btn whatsapp"
        >
          <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
        </button>
        <button
          onClick={() => handleShare('instagram')}
          className="share-btn instagram"
        >
          <FontAwesomeIcon icon={faInstagram} /> Instagram
        </button>
      </div>
    </div>
  );
};

export default GetInvolved;
