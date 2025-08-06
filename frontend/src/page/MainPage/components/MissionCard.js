import React, { useState, useEffect } from 'react';
import './MissionCard.css';

const getTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diffMs = midnight - now;
  const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export default function MissionCard({ title, description, buttonText, completed, type }) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

  useEffect(() => {
    if (completed && type === 'daily') {
      const timer = setInterval(() => {
        setTimeLeft(getTimeUntilMidnight());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [completed, type]);

  return (
    <div className="mission-card">
      <div className="mission-img"></div>
      <p className="mission-title">{title}</p>
      <p className="mission-desc">{description}</p>
      <button
        className="mission-btn mission-card-button-fixed"
        style={{
          backgroundColor: completed ? 'gray' : '',
          cursor: completed ? 'not-allowed' : 'pointer'
        }}
        disabled={completed}
      >
        {completed
          ? type === 'daily'
            ? timeLeft
            : '이미 완료한 미션입니다'
          : buttonText}
      </button>
    </div>
  );
}