import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import './Acknowledge.css'; // Custom CSS for styling

const Acknowledge = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [publishName, setPublishName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const handleToggle = () => {
    setPublishName(prevState => !prevState);
  };

  const getCurrentDateTime = () => {
    return new Date().toISOString();
  };

  // Fetch CSRF token from the API on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/csrf_token`,
          { withCredentials: true } // Ensure cookies are included
        );
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token.');
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

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
        const apiUrl = process.env.REACT_APP_API_URL;
        const emailApiUrl = process.env.REACT_APP_EMAIL_API_URL;

        // Add donor to the database first
        const addDonorResponse = await axios.post(
          `${apiUrl}/add_donor`,
          donorData,
          {
            headers: {
              'X-CSRF-Token': csrfToken, // Sending the CSRF token with the request
            },
            withCredentials: true, // Ensure cookies are included in the request
          }
        );

        if (addDonorResponse.status === 200) {
          setSubmitted(true); // Show thank-you message immediately after adding donor
          form.current.reset(); // Reset the form

          // Now send the email asynchronously in the background
          axios.post(`${emailApiUrl}/send-email`, donorData).catch(error => {
            console.error('Failed to send email:', error);
            toast.error(
              'Failed to send thank-you email, but your donation was recorded.'
            );
          });
        } else {
          toast.error('Something went wrong! Please try again.');
        }
      } catch (error) {
        if (error.response && error.response.data.detail) {
          toast.error(error.response.data.detail);
        } else {
          toast.error(
            'Failed to submit your donation details. Please try again later.'
          );
        }
      } finally {
        setIsSubmitting(false); // After the donor is added, stop the spinner
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
              placeholder="Enter your last name"
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner text="Submitting... this might take a moment" />
              </>
            ) : (
              'Submit Your Details'
            )}
          </button>
        </form>

        {submitted && (
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
