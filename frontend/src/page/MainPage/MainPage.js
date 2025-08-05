import React from 'react';
import './MainPage.css';
import ProfileCard from '../../components/ProfileCard';
import MissionSection from '../../components/MissionSection';
import Sidebar from '../../components/Sidebar'

export default function MainPage() {
  const onlineMissions = [
    { title: 'Daily Quiz', description: '오늘의 퀴즈 ! ', buttonText: '획득하기' },
    { title: '미니 게임', description: '다양한 미니 게임을 진행하고\n포인트를 얻어보세요 !', buttonText: '획득하기' },
    { title: 'SNS 홍보', description: '인스타그램 홍보하고 2000포인트 받기', buttonText: '인증하기' },
    { title: '의성 장날', description: '의성 장날 웹에서 다양한 의성 농수산물을 구매 후 포인트 받기', buttonText: '의성 농수산 쇼핑가기' },
    { title: '설문조사', description: '설문조사 참여하고 1000포인트 받아가세요 !', buttonText: '설문 참여하기' }
  ];

  const offlineMissions = [
    { title: '지역 축제', description: 'QR 인증하고 가기', buttonText: '위치 정보 보기' },
    { title: '체험 프로그램', description: '체험 다녀오고 포인트 받기', buttonText: '체험 프로그램 안내' },
    { title: '관광지 방문', description: '관광지 인증하기', buttonText: '다양한 관광지 보기' }
  ];

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <ProfileCard />
        <MissionSection sectionTitle="온라인 미션" missions={onlineMissions} />
        <MissionSection sectionTitle="오프라인 미션" missions={offlineMissions} />
      </div>
    </div>
  );
}