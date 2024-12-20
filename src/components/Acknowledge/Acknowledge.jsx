import React, { useRef, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import useCsrfToken from '../utils/useCsrfToken';
import useAddDonorMutation from '../utils/useAddDonorMutation';
import './Acknowledge.css'; // Custom CSS for styling
import sendThankYouEmail from '../utils/sendThankYouEmail.js';

const Acknowledge = () => {
  const emailApiUrl = process.env.REACT_APP_EMAIL_API_URL;
  const form = useRef();
  const [publishName, setPublishName] = useState(false);

  const {
    csrfToken,
    isError: isCsrfError,
    error,
    refetch: refetchToken,
    isLoading: isTokenLoading,
  } = useCsrfToken();

  const addDonorMutation = useAddDonorMutation(csrfToken, form);
  const handleToggle = () => {
    setPublishName(prevState => !prevState);
  };

  const getCurrentDateTime = () => {
    return new Date().toISOString();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.current) {
      const formData = new FormData(form.current);
      const amountDonated = parseFloat(formData.get('amount_donated'));

      const donorData = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        amount: amountDonated,
        thoughts: formData.get('message'),
        date: getCurrentDateTime(),
        contributionsCount: 1,
        publish_name: publishName,
      };

      try {
        // Call mutation to add donor
        addDonorMutation.mutate(donorData);
        sendThankYouEmail(donorData, emailApiUrl);
      } catch (error) {
        console.error('Error during form submission:');
      }
    }
  };

  return (
    <div id="let us thank you" className="container">
      <div className="card section">
        <h2>Donation Acknowledgment Form</h2>
        <p>
          Please provide your details so we can send you a thank you note for
          your generous support.
        </p>

        {isTokenLoading && (
          <div className="error">
            <Spinner text="Please wait until token is loaded" />
          </div>
        )}
        {isCsrfError && (
          <div className="error">
            <p>{error.message}</p>
            <button onClick={() => refetchToken()}>Please try again</button>
          </div>
        )}

        <form onSubmit={handleSubmit} ref={form} className="donation-form">
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first_name"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last_name"
              placeholder="Optional"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount-donated">Amount Donated</label>
            <input
              type="number"
              id="amount-donated"
              name="amount_donated"
              placeholder="Enter the amount you donated"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message or Testimonial (Optional)</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Feel free to share any thoughts or a message of support"
            />
          </div>
          <div className="form-group toggle-group">
            <label htmlFor="publish_name">
              Would you like your name to be published on our contributor page?
            </label>
            <div className="toggle-container">
              <span>{publishName ? 'Yes' : 'No'}</span>
              <label className="switch">
                <input
                  type="checkbox"
                  id="publish_name"
                  name="publish_name"
                  value={publishName ? 'Yes' : 'No'}
                  checked={publishName}
                  onChange={handleToggle}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <button type="submit" disabled={addDonorMutation.isPending}>
            {addDonorMutation.isPending ? (
              <>
                <Spinner text="Submitting... this might take a moment" />
              </>
            ) : (
              'Submit Your Details'
            )}
          </button>
        </form>

        {addDonorMutation.isError && (
          <div className="error">
            <p>{addDonorMutation.error.message}</p>
          </div>
        )}

        {addDonorMutation.isSuccess && (
          <div className="thank-you-message card">
            <div className="overlay-top">
              <h2>Thank You for Your Donation!</h2>
            </div>
            <div className="thank-you-image">
              <img
                src="/assets/people/cuteLittleGirl/cuteLittleGirlx150.webp"
                alt="Thank you background"
                className="thank-you-img"
              />
            </div>
            <div className="overlay-bottom">
              <p>
                We have received your details successfully. We appreciate your
                contribution.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Acknowledge;
