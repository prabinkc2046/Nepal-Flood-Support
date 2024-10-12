import React, { useState } from 'react';
import './Contributor.css';
import { useQuery } from '@tanstack/react-query'; // Import useQuery from React Query
import ContributorModal from '../Modal/ContributorModal/ContributorModal';

// Function to fetch contributors from the API
const fetchContributors = async () => {
  const apiUrl = process.env.REACT_APP_API_URL; // Fetch the API URL from environment variables
  const response = await fetch(`${apiUrl}/list_donors`); // Use the API URL
  console.log(response.status);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const timeSince = date => {
  const now = new Date();
  const pastDate = new Date(date);

  // Check if the pastDate is in the future
  if (pastDate > now) {
    return 'In the future'; // or any other appropriate message
  }

  const secondsAgo = Math.floor((now - pastDate) / 1000);

  let interval = Math.floor(secondsAgo / 31536000);
  if (interval > 1) return `${interval} years ago`;

  interval = Math.floor(secondsAgo / 2592000);
  if (interval > 1) return `${interval} months ago`;

  interval = Math.floor(secondsAgo / 86400);
  if (interval >= 1) return `${interval} days ago`;

  interval = Math.floor(secondsAgo / 3600);
  if (interval >= 1) return `${interval} hours ago`;

  interval = Math.floor(secondsAgo / 60);
  if (interval >= 1) return `${interval} minutes ago`;

  return `${secondsAgo} seconds ago`;
};

const Contributor = () => {
  const [sortCriteria, setSortCriteria] = useState('default');
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Use React Query to fetch contributors
  const { data: contributors = [], refetch } = useQuery({
    queryKey: ['contributors'], // Specify a unique key for the query
    queryFn: fetchContributors, // Function to fetch data
    refetchOnWindowFocus: true, // Refetch when the window is focused
  });

  const sortContributors = criteria => {
    switch (criteria) {
      case 'topContributor':
        return [...contributors].sort((a, b) => b.amount - a.amount);
      case 'mostFrequent':
        return [...contributors].sort(
          (a, b) => b.contributionsCount - a.contributionsCount
        );
      case 'earliest':
        return [...contributors].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case 'latest':
        return [...contributors].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      default:
        return contributors;
    }
  };

  const sortedContributors = sortContributors(sortCriteria);

  const openModal = contributor => {
    setSelectedContributor(contributor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContributor(null);
  };

  return (
    <div id="contributor" className="section">
      <span className="card-logo">🤝</span>
      <h2>Contributors</h2>

      {/* Custom Navbar for Sorting */}
      <div className="contributor-navbar">
        <button
          className={
            sortCriteria === 'default'
              ? 'contrib-nav-btn active'
              : 'contrib-nav-btn'
          }
          onClick={() => setSortCriteria('default')}
        >
          Default
        </button>

        <button
          className={
            sortCriteria === 'earliest'
              ? 'contrib-nav-btn active'
              : 'contrib-nav-btn'
          }
          onClick={() => setSortCriteria('earliest')}
        >
          Earliest
        </button>
        <button
          className={
            sortCriteria === 'latest'
              ? 'contrib-nav-btn active'
              : 'contrib-nav-btn'
          }
          onClick={() => setSortCriteria('latest')}
        >
          Latest
        </button>
      </div>

      {/* Contributor List */}
      <div className="contributor-grid-horizontal no-scroll">
        {sortedContributors.map((contributor, index) => (
          <div key={index} className="contributor-item">
            <h3>
              {/* Display 'Anonymous' if publish_name is false */}
              {contributor.publish_name
                ? `${contributor.first_name} ${contributor.last_name}`
                : 'Anonymous'}
            </h3>
            <p className="amount">💲{contributor.amount}</p>
            <p className="thoughts">
              {contributor.thoughts
                .trim()
                .split(/\s+/)
                .slice(0, 4) // Assuming you want to show first 4 words
                .join(' ') + '...'}
            </p>
            <p className="date-contributed">{timeSince(contributor.date)}</p>
            <button
              onClick={() => openModal(contributor)}
              className="details-btn"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {modalOpen && selectedContributor && (
        <ContributorModal
          selectedContributor={selectedContributor}
          onClose={closeModal}
          timeSince={timeSince}
        />
      )}
    </div>
  );
};

export default Contributor;
