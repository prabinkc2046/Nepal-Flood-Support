import React, { useState, useEffect, useMemo } from 'react';
import { latestNews } from '../../Constants/latestNews';
import { goal } from '../../Constants/goal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCircleMinus,
  faHandsHelping,
} from '@fortawesome/free-solid-svg-icons';
import useDonors from '../utils/useDonor';
import './Update.css';
import ProgressBarSkeleton from '../SkeletonCollection/ProgressBarSkeleton/ProgressBarSkeleton';
import ProgressBarTextSkeleton from '../SkeletonCollection/ProgressBarTextSkeleton/ProgressBarTextSkeleton';

const Update = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false); // New state to trigger animation
  const [openNews, setOpenNews] = useState(
    Array(latestNews.length).fill(false)
  );

  // Use global `useDonors` hook
  const { isLoading, error, totalRaised, totalContributors, refetch } =
    useDonors();

  // Calculate the progress percentage
  const progressPercentage = useMemo(
    () => (totalRaised / goal) * 100,
    [totalRaised]
  );

  // Trigger animation when component is visible and data is loaded
  useEffect(() => {
    if (!isLoading) {
      setShouldAnimate(true); // Trigger the animation
    }
  }, [isLoading]);

  // Toggle news section
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

      {isLoading && (
        <>
          <ProgressBarSkeleton width="100%" height="30px" />
          <ProgressBarTextSkeleton
            width="100%"
            height="1.2em"
            marginBottom="25px"
          />
          <ProgressBarTextSkeleton
            width="40%"
            height="1.2em"
            marginBottom="10px"
          />
        </>
      )}

      {/* {error && (
        <div className="error">
          <p>Failed to load Update: {error.message}</p>
          <button onClick={() => refetch()}>Try Again</button>
        </div>
      )} */}

      {!isLoading && !error && (
        <>
          <p className="fund-description">
            We're raising funds to support flood-affected families in Nepal. So
            far, we've raised ${totalRaised} of our ${goal} goal!
          </p>

          {/* Progress bar */}
          <div className="progress-bar">
            <div
              className="progress-level"
              style={{
                width: shouldAnimate ? `${progressPercentage}%` : '0%', // Animate based on `shouldAnimate`
                backgroundColor: '#4CAF50',
                transition: 'width 2s ease-in-out', // Smooth transition
              }}
            >
              <div
                className="tooltip"
                style={{ right: shouldAnimate ? `0%` : '100%', zIndex: 10 }}
              >
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>

          <div className="progress-info">
            <span>
              ${totalRaised} raised of ${goal}
            </span>
          </div>

          <div className="contributors-info">
            <FontAwesomeIcon
              icon={faHandsHelping}
              size="2x"
              className="contributors-icon"
            />

            <span className="contributors-count">
              <strong>{totalContributors}</strong>
            </span>
          </div>
        </>
      )}

      <h3>Latest News</h3>
      <div className="latest-news">
        {latestNews.map((news, index) => (
          <div className="news-item card" key={index}>
            <div className="news-header" onClick={() => toggleNews(index)}>
              <h4>{news.title}</h4>
              <span className="toggle-icon">
                <FontAwesomeIcon
                  icon={openNews[index] ? faCircleMinus : faCirclePlus}
                  className={openNews[index] ? 'minus-button' : 'plus-button'}
                />
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
              <p className="secondary-paragraph">{news.content}</p>
              <span>{news.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Update;
