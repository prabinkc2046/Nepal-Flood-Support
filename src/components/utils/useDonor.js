import { useQuery } from '@tanstack/react-query';
import { fetchDonors } from './fetchDonors';
import { useMemo } from 'react';

const useDonors = () => {
  const {
    data: contributors = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['donors'],
    queryFn: fetchDonors,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 60000,
    refetchInterval: 30000,
  });

  // Calculate total amount raised
  const totalRaised = useMemo(
    () =>
      contributors.reduce((acc, contributor) => acc + contributor.amount, 0),
    [contributors]
  );

  // Calculate total number of contributors
  const totalContributors = useMemo(() => contributors.length, [contributors]);

  return {
    contributors, // All donor data
    totalRaised, // Total amount raised
    totalContributors, // Total number of contributors
    isLoading, // Loading state
    isError, // Error state
    error, // Error details
    refetch, // Function to refetch the data
  };
};

export default useDonors;
