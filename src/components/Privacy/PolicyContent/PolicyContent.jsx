import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserShield,
  faDatabase,
  faLock,
  faFileInvoice,
  faCookieBite,
  faShieldAlt,
  faUserCheck,
  faEnvelope,
  faSyncAlt,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

import './PolicyContent.css';
const PolicyContent = () => {
  return (
    <div className="policy-content">
      <h1>Privacy Policy</h1>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faUserShield} /> Data Collection
        </h2>
        <p>
          We do not use any cookies on our website. The only personal
          information we collect is to acknowledge your donation. This includes:
        </p>
        <ul className="no-bullets">
          <li>First Name</li>
          <li>Last Name</li>
          <li>Email Address</li>
          <li>Your thoughts or testimony</li>
          <li>Consent to publish your name on our donor page</li>
        </ul>
      </div>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faDatabase} /> Data Usage
        </h2>
        <p>
          The personal information we collect is used for the following
          purposes:
        </p>
        <ul className="no-bullets">
          <li>To calculate the total funds raised on our website.</li>
          <li>To thank you via email for your generous donation.</li>
          <li>
            We do not use your data for marketing or any other purposes beyond
            acknowledgment.
          </li>
        </ul>
      </div>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faLock} /> Data Storage
        </h2>
        <p>
          All collected data is securely stored in a MongoDB server hosted on
          Atlas, which uses encryption for data protection. Once our fundraising
          goal is met, we may retain the data for legal compliance; otherwise,
          it will be securely deleted.
        </p>
      </div>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faFileInvoice} /> Third-Party Sharing
        </h2>
        <p>
          We do not share your personal information with third parties unless
          required by law. Your privacy is important to us, and we will only
          disclose your information in compliance with applicable legal
          requirements.
        </p>
      </div>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faCookieBite} /> Cookies
        </h2>
        <p>
          We do not use cookies on our website to collect personal information
          or track user behavior.
        </p>
      </div>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faShieldAlt} /> Cross-Site Request Forgery
          (CSRF) Prevention
        </h2>
        <p>
          We implement measures to protect against Cross-Site Request Forgery
          (CSRF) attacks. This includes using anti-CSRF tokens to ensure that
          all requests made to our server are genuine and intended by the user.
        </p>
      </div>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faUserCheck} /> User Rights
        </h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. If you would like us to delete your data from our
          servers, please contact us as indicated below.
        </p>
      </div>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faEnvelope} /> Contact Information
        </h2>
        <p>
          If you have any questions about this Privacy Policy or concerns
          regarding your data, please reach out to us through our{' '}
          <a href="#contact">Contact</a> section. We are committed to addressing
          any issues related to your privacy and data protection.
        </p>
      </div>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faSyncAlt} /> Changes to This Privacy Policy
        </h2>
        <p>
          We may update our Privacy Policy from time to time. Any changes will
          be posted on this page with an updated effective date. We encourage
          you to review this Privacy Policy periodically for any changes.
        </p>
      </div>

      <div className="card">
        <h2>
          <FontAwesomeIcon icon={faCalendarAlt} /> Effective Date
        </h2>
        <p>This Privacy Policy is effective as of Oct 19, 2024.</p>
      </div>
    </div>
  );
};

export default PolicyContent;
