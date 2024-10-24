import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchDonors = async () => {
  try {
    const response = await axios.get(`${apiUrl}/list_donors`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch donors:', error);
    throw error;
  }
};
