import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import './Give.css'; // Custom CSS for styling

const Give = () => {
  const form = useRef(); // Create a ref for the form
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const [publishName, setPublishName] = useState(false); // State for toggle button

  // Function to handle toggling of the publish name option
  const handleToggle = () => {
    setPublishName(!publishName); // Toggle between true and false
  };

  // Function to get the current date and time in ISO 8601 format (UTC)
  const getCurrentDateTime = () => {
    return new Date().toISOString(); // Returns current date and time in ISO format
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.current) {
      const formData = new FormData(form.current);

      // Create the data object to send to the backend
      const donorData = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        amount: parseFloat(formData.get('amount_donated')), // Use parseFloat for decimal values
        thoughts: formData.get('message'),
        date: getCurrentDateTime(), // Use the updated date function
        contributionsCount: 1,
        publish_name: publishName,
      };

      try {
        // Use the API URL from the environment variable
        const apiUrl = process.env.REACT_APP_API_URL;

        // Send the donor data to the FastAPI backend using axios
        const response = await axios.post(`${apiUrl}/add_donor`, donorData);

        if (response.status === 200) {
          toast.success(
            'Thank you! Your donation details have been submitted successfully.'
          );

          // Send the form data via email using emailjs
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
                setSubmitted(true); // Set form as submitted
                form.current.reset(); // Reset form fields after successful email submission
              },
              error => {
                console.error('Failed to send email. Error: ', error);
                toast.error('Failed to send email. Please try again later.');
              }
            );
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
      }
    }
  };

  return (
    <div id="give" className="container">
      <ToastContainer /> {/* Toast notification container */}
      <div className="donation-info card section">
        <span className="card-logo">🎁</span>
        <h2>Bank Details for Donations</h2>
        <p>To make a donation, please use the bank details below:</p>
        <p className="selectable">
          <strong>BSB:</strong> 123-456
        </p>
        <p className="selectable">
          <strong>Account Number:</strong> 123456789
        </p>
        <p>
          Once you've completed the transfer, kindly fill out the form below so
          we can properly acknowledge your contribution.
        </p>
      </div>
      <div className="card section form-container">
        <span className="card-logo">🙌</span>
        <h2>Donation Acknowledgment Form</h2>
        <p>
          Please provide your details so we can send you a thank you note for
          your generous support.
        </p>
        {submitted ? (
          <div className="thank-you-message">
            <h3>Thank You for Your Donation!</h3>
            <p>
              We have received your details successfully. We appreciate your
              contribution.
            </p>
          </div>
        ) : (
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
                required
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
                Would you like your name to be published on our acknowledgment
                page?
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
            <button type="submit">Submit Your Details</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Give;
