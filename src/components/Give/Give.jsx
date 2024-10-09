import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Give.css'; // Custom CSS for styling

const Give = () => {
  const form = useRef(); // Create a ref for the form
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const [publishName, setPublishName] = useState(false); // State for toggle button

  const handleToggle = () => {
    setPublishName(!publishName); // Toggle between true and false
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          form.current,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          response => {
            console.log(
              'Email sent successfully!',
              response.status,
              response.text
            );
            setSubmitted(true);
            form.current.reset(); // Reset form fields after submission
          },
          error => {
            console.error('Failed to send email. Error: ', error);
          }
        );
    }
  };

  return (
    <div id="give" className="give-container card">
      <div className="donation-info fund-card">
        <h2>Bank Details for Donations</h2>
        <p>Please use the following bank details to send your donations:</p>
        <p>
          <strong>BSB:</strong> 123-456
        </p>
        <p>
          <strong>Account Number:</strong> 123456789
        </p>
      </div>
      <div className="fund-card form-container">
        <h2>Donation Acknowledgment Form</h2>
        <p>Please send us your details so we can thank you for your support.</p>
        {submitted ? (
          <div className="thank-you-message">
            <h3>Thank You for Your Donation!</h3>
            <p>Your details have been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} ref={form} className="donation-form">
            <div className="form-group">
              <label htmlFor="first-name">First Name:</label>
              <input
                type="text"
                id="first-name"
                name="first_name"
                placeholder="first name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name:</label>
              <input
                type="text"
                id="last-name"
                name="last_name"
                placeholder="last name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">
                Support us with your thoughts or testimony:
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Your message or testimony"
              />
            </div>
            <div className="form-group toggle-group">
              <label htmlFor="publish_name">
                Would You Like To Publish Your Name:
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
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Give;
