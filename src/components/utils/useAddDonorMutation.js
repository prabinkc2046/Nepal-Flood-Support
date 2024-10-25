// src/mutations/useAddDonorMutation.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import sendThankYouEmail from './sendThankYouEmail';
import { toast } from 'react-toastify';

const useAddDonorMutation = (csrfToken, formRef) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const emailApiUrl = process.env.REACT_APP_EMAIL_API_URL;

  const queryClient = useQueryClient();

  const addNewDonor = async newDonorData => {
    try {
      const response = await axios.post(`${apiUrl}/add_donor`, newDonorData, {
        headers: {
          'X-CSRF-Token': csrfToken, // Sending the CSRF token with the request
        },
        withCredentials: true, // Ensure cookies are included in the request
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status code out of the 2xx range
        const errorMessage = `Error ${error.response.status}: ${
          error.response.data.message || 'Failed to submit donor detail'
        }`;
        throw new Error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(
          'No response from server. Please check your network connection.'
        );
      } else {
        // Something else caused the error
        throw new Error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const addDonorMutation = useMutation({
    mutationFn: newDonorData => addNewDonor(newDonorData),
    // On success, manually update the cache and invalidate it
    onSuccess: newDonorData => {
      // Manually updating cache with new donor
      queryClient.setQueryData(['donors'], oldDonors =>
        oldDonors ? [...oldDonors, newDonorData] : [newDonorData]
      );

      // Invalidate donors query to refetch the updated data from the server
      queryClient.invalidateQueries(['donors'], { exact: true });

      if (formRef.current) formRef.current.reset();

      // Send the thank you email after successful donor addition
      sendThankYouEmail(newDonorData, emailApiUrl);
      // try {
      //   sendThankYouEmail(newDonorData, emailApiUrl);
      // } catch (error) {
      //   toast.error('Failed to send thank you email.');
      // }
    },

    onError: error => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error(
          'Failed to submit your donation details. Please try again later.'
        );
      }
    },
  });

  return addDonorMutation;
};

export default useAddDonorMutation;
