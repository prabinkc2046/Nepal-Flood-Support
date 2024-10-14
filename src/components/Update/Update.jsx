import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { contributorsList } from '../../Constants/contributorsList';
import { latestNews } from '../../Constants/latestNews';
import { goal } from '../../Constants/goal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import './Update.css';

const Update = () => {
  const [visible, setVisible] = useState(false);
  const [openNews, setOpenNews] = useState(
    Array(latestNews.length).fill(false)
  );

  const totalRaised = contributorsList.reduce(
    (acc, contributor) => acc + contributor.amount,
    0
  );
  const progressPercentage = (totalRaised / goal) * 100;

  // Handle visibility change
  const onVisibilityChange = isVisible => {
    if (isVisible) {
      setVisible(true);
    }
  };

  // Toggle news item visibility
  const toggleNews = index => {
    setOpenNews(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div id="updates" className="card section">
      <h2>Progress Tracker</h2>
      <p className="fund-description">
        We are raising funds to support people affected by the recent floods in
        Nepal. Your contributions will help provide food and essential supplies
        to those in need. So far, we've raised ${totalRaised}, and we're getting
        closer to our goal of $5000!
      </p>

      <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: visible ? `${progressPercentage}%` : '0%',
              backgroundColor: '#4CAF50',
              transition: 'width 2s ease-in-out',
              position: 'relative',
            }}
          >
            {/* Tooltip positioned at the end of the progress */}
            <div
              className="tooltip"
              style={{
                right: visible ? `0%` : '100%',
                zIndex: 10,
              }}
            >
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </div>
      </VisibilitySensor>

      <div className="progress-info">
        <span>
          ${totalRaised} raised of ${goal}
        </span>
      </div>

      <h3>Latest News</h3>
      <div className="latest-news">
        {latestNews.map((news, index) => (
          <div className="news-item card" key={index}>
            <div className="news-header" onClick={() => toggleNews(index)}>
              <h4>{news.title}</h4>
              <span className="toggle-icon">
                {openNews[index] ? (
                  <>
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                      className="plus-button"
                    />
                  </>
                ) : (
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className="minus-button"
                  />
                )}
              </span>
            </div>
            <div
              className="news-content"
              style={{
                maxHeight: openNews[index] ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.5s ease',
              }}
            >
              <p>{news.content}</p>
              <span>{news.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Update;
