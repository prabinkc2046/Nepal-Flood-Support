import { useEffect, useState, useCallback } from 'react';

const useContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [totalContributors, setTotalContributors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define fetch function using useCallback to memoize it
  const fetchContributors = useCallback(async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/list_donors`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setContributors(data);

      // Calculate totals
      const total = data.reduce(
        (acc, contributor) => acc + contributor.amount,
        0
      );
      setTotalRaised(total);
      setTotalContributors(data.length);
    } catch (err) {
      setError(err.message); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  }, []); // No dependencies, stays the same across renders

  // Fetch contributors on mount
  useEffect(() => {
    fetchContributors();
  }, [fetchContributors]);

  return {
    contributors,
    totalRaised,
    totalContributors,
    loading,
    error,
    refetch: fetchContributors, // Expose refetch for manual use
  };
};

export default useContributors;
