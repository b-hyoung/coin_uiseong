import React from 'react';
import MissionCard from './MissionCard';
import './MissionSection.css';

export default function MissionSection({ sectionTitle, missions }) {
  return (
    <div className="mission-wrapper">
      <div className="mission-title-tab">
        {sectionTitle}
      </div>
      <div className="mission-inner">
        <div className="mission-list">
          {missions.map((m, i) => (
            <MissionCard
              key={i}
              title={m.title}
              description={m.description}
              buttonText={m.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}