import React, { useState } from 'react';
import './Contributor.css';
import ContributorModal from '../Modal/ContributorModal/ContributorModal';
import VisibilitySensor from 'react-visibility-sensor';
import ContributorSkeleton from '../SkeletonCollection/ContributorSkeleton/ContributorSkeleton';
import useContributors from '../utils/useContributors';
import { capitalizeFirstLetter } from '../utils/capitaliseFirstLetter';

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

  // Use the custom hook
  const { contributors, loading, refetch } = useContributors();

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
    if (isVisible) {
      refetch();
    }
  };

  return (
    <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
      <div id="contributor" className="section">
        <h2>Our Generous Contributors</h2>
        <p className="contributor-intro">
          We are incredibly grateful to everyone who has supported us. Below is
          a list of our amazing contributors who have helped us make an impact.
        </p>

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
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <ContributorSkeleton key={index} />
            ))
          ) : sortedContributors.length > 0 ? (
            sortedContributors.map((contributor, index) => (
              <div key={index} className="contributor-item">
                <div className="contributor-heading">
                  <h3>
                    {contributor.publish_name
                      ? `${capitalizeFirstLetter(contributor.first_name)}`
                      : 'Anonymous'}
                  </h3>
                  <p className="date-contributed">
                    Contributed {timeSince(contributor.date)}
                  </p>
                </div>

                <div>
                  <p className="thoughts">
                    {capitalizeFirstLetter(
                      contributor.thoughts
                        .trim()
                        .split(/\s+/)
                        .slice(0, 4)
                        .join(' ') + '...'
                    )}
                  </p>
                  <p className="amount"> ${contributor.amount}</p>
                </div>
                <button
                  onClick={() => openModal(contributor)}
                  className="details-btn"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No contributions found at this time. Check back soon!</p>
          )}
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
