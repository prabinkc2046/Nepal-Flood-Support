import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { contacts } from '../../../Constants/contact';
import './ContactDetail.css';
import { toast } from 'react-toastify';
import Spinner from '../../Spinner/Spinner';

const ContactDetail = ({ isOpen }) => {
  const [messageStatus, setMessageStatus] = useState(''); // For success/error message
  const [sending, setSending] = useState(false); // For spinner

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

    setSending(true); // Show spinner
    setMessageStatus(''); // Clear any previous status messages

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
        setMessageStatus('Message sent successfully!');
        toast.success('Message sent successfully!');
        contactFormRef.current.reset(); // Reset form fields
      } else {
        setMessageStatus('Failed to send message.');
        toast.error('Failed to send message.');
      }
    } catch (error) {
      setMessageStatus('Failed to send message. Please try again.');
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false); // Hide spinner
    }

    // Automatically clear the status message after 2 seconds
    setTimeout(() => setMessageStatus(''), 2000);
  };

  return (
    <div className={`contact ${isOpen ? 'open' : ''}`}>
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
          <input type="text" name="fullName" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required />
          <button type="submit">
            {sending ? <Spinner text="Sending ..." /> : 'Send Message'}
          </button>
        </form>
        {messageStatus && (
          <p
            className={`message-status ${
              messageStatus.includes('successfully') ? 'success' : 'error'
            }`}
          >
            {messageStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactDetail;
