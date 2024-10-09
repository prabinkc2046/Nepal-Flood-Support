import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';

import { email, phone, linkedin } from '../../Constants/contact';
import './Contact.css';

const Contact = () => {
  const [messageStatus, setMessageStatus] = useState('');
  const contactFormRef = useRef();

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleLinkedInClick = () => {
    window.open(linkedin, '_blank');
  };

  const sendEmail = e => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        contactFormRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(result => {
        setMessageStatus('Message sent successfully!');
        contactFormRef.current.reset(); // Reset form fields
        setTimeout(() => setMessageStatus(''), 2000); // Clear message after 2 seconds
      })
      .catch(error => {
        console.error('Error sending email:', error);
        setMessageStatus('Failed to send message. Please try again.');
        setTimeout(() => setMessageStatus(''), 2000);
      });
  };

  return (
    <div id="contact" className="card contact-container">
      <h2>Contact Us</h2>
      <p>Your support can make a difference for flood victims in Nepal.</p>
      <div className="contact">
        <div className="contact-details card">
          <div className="contact-item" onClick={handleEmailClick}>
            <FontAwesomeIcon icon={faEnvelope} /> {email}
          </div>
          <div className="contact-item" onClick={handlePhoneClick}>
            <FontAwesomeIcon icon={faPhone} /> {phone}
          </div>
          <div className="contact-item" onClick={handleLinkedInClick}>
            <FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn
          </div>
        </div>
        <div className="contact-form-container card">
          <h3>Get in Touch</h3>
          <form
            className="contact-form"
            onSubmit={sendEmail}
            ref={contactFormRef}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea name="message" placeholder="Your Message" required />
            <button type="submit">
              {messageStatus ? <span>{messageStatus}</span> : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
