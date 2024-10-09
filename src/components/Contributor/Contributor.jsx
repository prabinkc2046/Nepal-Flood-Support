import React, { useState } from 'react';
import './Contributor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons'; // Removed faMedal import
import {
  contributorsList,
  wordsToShow,
} from '../../Constants/contributorsList';
import ContributorModal from '../Modal/ContributorModal/ContributorModal';

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
  const contributors = contributorsList;
  const [sortCriteria, setSortCriteria] = useState('default');
  const [itemsToShow, setItemsToShow] = useState(5);
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const visibleContributors = sortContributors(sortCriteria).slice(
    0,
    itemsToShow
  );

  const handleShowMore = () => {
    const nextItemsToShow = itemsToShow + itemsToShow;
    if (nextItemsToShow >= contributors.length) {
      setItemsToShow(contributors.length);
    } else {
      setItemsToShow(nextItemsToShow);
    }
  };

  const openModal = contributor => {
    setSelectedContributor(contributor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContributor(null);
  };

  return (
    <div id="contributor" className="contributor-container card">
      <h2>Contributors</h2>

      <div className="dropdown-container">
        <div className="dropdown">
          <label htmlFor="sortContributors">Sort by: </label>
          <select
            id="sortContributors"
            value={sortCriteria}
            onChange={e => setSortCriteria(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="topContributor">Top Contributor</option>
            <option value="mostFrequent">Most Frequent Contributor</option>
            <option value="earliest">Earliest Contributor</option>
            <option value="latest">Latest Contributor</option>
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="showContributors">Show: </label>
          <select
            id="showContributors"
            value={itemsToShow}
            onChange={e => setItemsToShow(parseInt(e.target.value, 10))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="contributor-grid">
        {visibleContributors.map((contributor, index) => (
          <div key={index} className="contributor-item fund-card">
            <h3>{contributor.name}</h3>
            <p className="amount">Contribution: ${contributor.amount}</p>
            <p className="thoughts">
              {contributor.thoughts
                .trim()
                .split(/\s+/)
                .slice(0, wordsToShow)
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

      {itemsToShow < contributors.length && (
        <button onClick={handleShowMore} className="show-more-btn">
          Show More Contributors
        </button>
      )}

      {modalOpen && selectedContributor && (
        <ContributorModal
          selectedContributor={selectedContributor}
          onClose={closeModal}
          timeSince={timeSince}
        ></ContributorModal>
      )}
    </div>
  );
};

export default Contributor;
