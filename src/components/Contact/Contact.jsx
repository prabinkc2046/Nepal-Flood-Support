import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { contacts } from '../../Constants/contact';
import './Contact.css';
import Spinner from '../Spinner/Spinner';

const Contact = () => {
  const [messageStatus, setMessageStatus] = useState('');
  const [sending, setSending] = useState(false);
  const contactFormRef = useRef();
  const { personalContact } = contacts;

  const handleEmailClick = () => {
    window.location.href = `mailto:${personalContact.email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${personalContact.phone}`;
  };

  const handleLinkedInClick = () => {
    window.open(personalContact.linkedin, '_blank');
  };

  // New send message function using API endpoint from environment variable
  const sendEmail = async e => {
    e.preventDefault();
    const formData = new FormData(contactFormRef.current);

    const data = {
      name: formData.get('fullName'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
    setSending(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_EMAIL_API_URL}/send-message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setSending(false);
        setMessageStatus('Message sent successfully!');
        contactFormRef.current.reset(); // Reset form fields
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessageStatus('Failed to send message. Please try again.');
    }

    setTimeout(() => setMessageStatus(''), 2000); // Clear message after 2 seconds
  };

  return (
    <div id="contact" className="card section">
      <h2>Contact Us</h2>
      <p>Your support can make a difference for flood victims in Nepal.</p>
      <div className="contact">
        <div className="contact-details card">
          <div className="contact-item" onClick={handleEmailClick}>
            <FontAwesomeIcon icon={faEnvelope} /> {personalContact.email}
          </div>
          <div className="contact-item" onClick={handlePhoneClick}>
            <FontAwesomeIcon icon={faPhone} /> {personalContact.phone}
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
              {sending ? <Spinner text="Sending ..." /> : 'Send Message'}
              {messageStatus ?? <span>{messageStatus}</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
