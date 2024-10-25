import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchDonors = async () => {
  try {
    const response = await axios.get(`${apiUrl}/list_donors`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // server responded with a status code out of 2xx range
      const errorMessage = `Error ${error.response.status}: ${
        error.response.data.message || 'Failed to fetch donors'
      }`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error('Please check your network connection');
    } else {
      // something else caused error
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};
