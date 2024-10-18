import { scrollToSection } from '../utils/scrollToSection';
import './Give.css'; // Custom CSS for styling
import CopyButton from '../CopyButton/CopyButton';

const Give = () => {
  // Accessing environment variables
  const bankBSB = process.env.REACT_APP_BANK_BSB;
  const accountNumber = process.env.REACT_APP_BANK_ACCOUNT_NUMBER;
  const accountName = process.env.REACT_APP_ACCOUNT_NAME;

  return (
    <div id="give" className="container">
      <div className="donation-info card section">
        <h2>Make a Difference Today</h2>
        <p>
          Your contribution helps provide essential resources and support to
          those in need. Please use the bank details below to make your donation
        </p>
        <div className="bank-details">
          <p className="selectable account-field">
            <strong>Account Name:</strong>
            <p className="account-field-name">
              {accountName}
              <CopyButton text={accountName} />
            </p>
          </p>
          <p className="selectable account-field">
            <strong>BSB:</strong>{' '}
            <p className="account-field-name">
              {bankBSB} <CopyButton text={bankBSB} />
            </p>
          </p>
          <p className="selectable account-field">
            <strong>Account Number:</strong>
            <p className="account-field-name">
              {accountNumber} <CopyButton text={accountNumber} />
            </p>
          </p>
        </div>
        <p className="post-info">
          After completing your bank transfer, kindly click the button below to
          provide your details. This helps us acknowledge your generous donation
          and keep you updated on how your contribution is making an impact.
        </p>
        <button
          className="donate-button"
          onClick={() => scrollToSection('let us thank you')}
        >
          Proceed to Acknowledge Your Donation
        </button>
      </div>
    </div>
  );
};

export default Give;
