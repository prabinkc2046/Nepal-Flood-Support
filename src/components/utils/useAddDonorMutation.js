// src/mutations/useAddDonorMutation.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const useAddDonorMutation = (csrfToken, formRef) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const queryClient = useQueryClient();

  const addNewDonor = async newDonorData => {
    const response = await axios.post(`${apiUrl}/add_donor`, newDonorData, {
      headers: {
        'X-CSRF-Token': csrfToken, // Sending the CSRF token with the request
      },
      withCredentials: true, // Ensure cookies are included in the request
    });

    return response.data;
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
    },

    onError: error => {
      if (error.response && error.response.data.detail) {
        toast.error(error.response.data.detail);
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
