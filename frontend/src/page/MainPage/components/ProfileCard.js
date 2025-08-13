import React, { useState } from 'react';
import './ProfileCard.css';

export default function ProfileCard({
  userInfo : { username, lastLogin, rank, point, SVTPoint, monthlyEarned, monthlyUsed, totalExchanged }
}) {

  return (
    <div className="profile-card">
      {/* 상단 프로필 섹션 */}
      <div className="profile-header">
        <div className="profile-header-left">
          <div className="profile-img">
            <img className="profile-photo" src="/assets/images/profile_default.png" alt="프로필" />
          </div>
          <div className="profile-user-info">
            <div className="profile-name">{username}</div>
           <div className="profile-rank">{rank}</div>
          </div>
        </div>
        <div className="profile-last-login">
          최근 접속 <span>{lastLogin}</span>
        </div>
      </div>

      {/* 포인트 섹션 */}
      <div className="profile-points">
        <div className="point-row">
          <div className="point-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="point-label">Point</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="point-value">{point}</span>
              <button className="exchange-btn">↕ 전환하기</button>
            </div>
          </div>
          <div className="point-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'inherit', gap: '8px', flexDirection: "column" }}>
              <span className="point-label">SVTPoint</span>
              <span className="point-value">{SVTPoint}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 추가 통계 */}
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-label">이번 달 적립</span>
          <span className="stat-value">{monthlyEarned}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">이번 달 사용</span>
          <span className="stat-value">{monthlyUsed}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">누적 전환</span>
          <span className="stat-value">{totalExchanged}</span>
        </div>
      </div>
    </div>
  );
}