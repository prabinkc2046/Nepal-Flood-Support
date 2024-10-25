import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${apiUrl}/csrf_token`, {
      withCredentials: true, // Ensure cookies are included
    });

    return response.data.csrfToken;
  } catch (error) {
    throw new Error('Unable to fetch CSRF token. Please try again later.');
  }
};

const useCsrfToken = () => {
  const {
    data: csrfToken,
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['csrfToken'],
    queryFn: fetchCsrfToken,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { csrfToken, error, isError, refetch, isLoading };
};

export default useCsrfToken;
