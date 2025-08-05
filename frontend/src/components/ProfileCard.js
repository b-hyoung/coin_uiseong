import React from 'react';
import './ProfileCard.css';

export default function ProfileCard() {
  return (
    <div className="profile-card">
      {/* 상단 프로필 섹션 */}
      <div className="profile-header">
        <div className="profile-header-left">
          <div className="profile-img">
            <img className="profile-photo" src="/assets/images/profile_default.png" alt="프로필" />
          </div>
          <div className="profile-user-info">
            <div className="profile-name">홍길동</div>
            <div className="profile-rank">Gold Member</div>
          </div>
        </div>
        <div className="profile-last-login">
          최근 접속 <span>2025-08-05</span>
        </div>
      </div>

      {/* 포인트 섹션 */}
      <div className="profile-points">
        <div className="point-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div className="point-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="point-label">Point</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="point-value">3,000</span>
              <button className="exchange-btn">↕ 전환하기</button>
            </div>
          </div>
          <div className="point-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
            <div style={{ display: 'flex', alignItems: 'inherit', gap: '8px' ,flexDirection:"column"}}>
            <span className="point-label">SVTPoint</span>
            <span className="point-value">150</span>
            </div>
          </div>
        </div>
      </div>

      {/* 추가 통계 */}
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-label">이번 달 적립</span>
          <span className="stat-value">0</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">이번 달 사용</span>
          <span className="stat-value">0</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">누적 전환</span>
          <span className="stat-value">0</span>
        </div>
      </div>
    </div>
  );
}