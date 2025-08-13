import React from 'react';
import MissionCard from './MissionCard';
import './MissionSection.css';

export default function MissionSection({
  sectionTitle,
  missions = [],
  oneTimeMissions = [],
  dailyMissions = []
}) {
  const allMissions = [
    ...dailyMissions.map(m => ({ ...m, type: 'daily' })),
    ...missions.map(m => ({ ...m, type: 'mission' })),
    ...oneTimeMissions.map(m => ({ ...m, type: 'oneTime' }))
  ];

  return (
    <div className="mission-wrapper">
      <div className="mission-title-tab">{sectionTitle}</div>
      <div className="mission-inner">
        <div className="mission-list">
          {allMissions.map((m, i) => (
            <MissionCard
              key={i}
              title={m.title}
              description={m.description}
              buttonText={m.buttonText}
              completed={m.completed}
              type={m.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}