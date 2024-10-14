import React, { useState } from 'react';
import './Contributor.css';
import { useQuery } from '@tanstack/react-query';
import ContributorModal from '../Modal/ContributorModal/ContributorModal';
import VisibilitySensor from 'react-visibility-sensor';

// Function to fetch contributors from the API
const fetchContributors = async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await fetch(`${apiUrl}/list_donors`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const timeSince = date => {
  const now = new Date();
  const pastDate = new Date(date);
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
  const [isInView, setIsInView] = useState(false);

  // Use React Query to fetch contributors
  const { data: contributors = [], refetch } = useQuery({
    queryKey: ['contributors'],
    queryFn: fetchContributors,
    enabled: isInView,
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

  const onVisibilityChange = isVisible => {
    setIsInView(isVisible);
    if (isVisible) {
      refetch();
    }
  };

  return (
    <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
      <div id="contributor" className="section">
        <h2>Contributors</h2>

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

        <div className="contributor-grid-horizontal no-scroll">
          {sortedContributors.map((contributor, index) => (
            <div key={index} className="contributor-item">
              <h3>
                {contributor.publish_name
                  ? `${contributor.first_name} ${contributor.last_name}`
                  : 'Anonymous'}
              </h3>
              <p className="amount">💲{contributor.amount}</p>
              <p className="thoughts">
                {contributor.thoughts
                  .trim()
                  .split(/\s+/)
                  .slice(0, 4)
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
    </VisibilitySensor>
  );
};

export default Contributor;
