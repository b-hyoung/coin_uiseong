import React, { useState } from 'react';
import './Sidebar.css';

export default function Sidebar() {
  const [openOffline, setOpenOffline] = useState(false);

  return (
    <div className="sidebar" style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', top: 0, left: 0, height: '100vh', overflowY: 'auto' }}>
      <h2 className="sidebar-logo">마이페이지</h2>
      <p className="sidebar-item">내 정보</p>
      <p className="sidebar-item">온라인</p>

      {/* 오프라인 메뉴 */}
      <div className="sidebar-section">
        <p
          className="sidebar-item"
          onClick={() => setOpenOffline(!openOffline)}
        >
          오프라인 <span style={{ fontSize: '0.6em' }}>{openOffline ? '▲' : '▼'}</span>
        </p>
        <div
          className={`sidebar-submenu ${openOffline ? 'open' : ''}`}
        >
          <p>지역축제</p>
          <p>체험프로그램</p>
          <p>관광지 방문</p>
        </div>
      </div>

      <p className="sidebar-item">설정</p>
      <p className="sidebar-item">로그아웃</p>
    </div>
  );
}