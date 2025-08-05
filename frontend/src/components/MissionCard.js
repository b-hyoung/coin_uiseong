import React from 'react';
import './MissionCard.css';

export default function MissionCard({ title, description, buttonText }) {
  return (
    <div className="mission-card">
      <div className="mission-img"></div>
      <p className="mission-title">{title}</p>
      <p className="mission-desc">{description}</p>
      <button className="mission-btn mission-card-button-fixed">{buttonText}</button>
    </div>
  );
}