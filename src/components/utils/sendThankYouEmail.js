import axios from 'axios';
import { toast } from 'react-toastify';

// Send thank you email
const sendThankYouEmail = async (donorData, emailApiUrl) => {
  try {
    await axios.post(`${emailApiUrl}/send-email`, donorData);
  } catch (error) {
    console.error('Failed to send email:', error);
    toast.error('Failed to send email');
  }
};

export default sendThankYouEmail;
