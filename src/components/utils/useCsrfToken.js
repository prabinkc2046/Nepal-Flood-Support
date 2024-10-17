// useCsrfToken.js (React Query Hook)
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCsrfToken = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/csrf_token`,
    {
      withCredentials: true,
    }
  );
  return response.data.csrfToken;
};

export const useCsrfToken = () => {
  return useQuery('csrfToken', fetchCsrfToken, {
    staleTime: 5 * 60 * 1000, // Token is considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache the token for 10 minutes
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Don't refetch when window is focused
  });
};
