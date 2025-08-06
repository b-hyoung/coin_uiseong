import {React,useState} from 'react';
import './MainPage.css';
import ProfileCard from './components/ProfileCard';
import MissionSection from './components/MissionSection';
import Sidebar from './components/Sidebar'


export default function MainPage() {


    const [userInfo, setUserInfo] = useState(
    {
      username: "박형석", // 유저 이름
      lastLogin: "2025-08-05", // 이전 마지막 로그인 시간
      rank: "마늘", // 랭크 아직 고민중인 영역
      point: 3000, // 미션을 통해 얻는 포인트
      SVTPoint: 150, // 실제 의성시에서 사용할 가상화폐 포인트
      monthlyEarned: 1000, // 이번달 포인트 적립 내역
      monthlyUsed: 500, // 이번달 가상화폐포인트 사용 내역
      totalExchanged: 5600, // 현재까지 누적된 가상화폐포인트 사용 내역
    }
  )
  // 한번 인증하고 그 이후 인증안해두 되는 것들
  const [oneTimeMissionStatus, setOneTimeMissionStatus] = useState({
    sns_share: false, // 인스타 인증 여부
    survey: true // 설문조사 참여 여부
  });

  // 하루 한번씩 인증해줘야 하는 목록
  // 시간 00:00기준 초기화
  const [dailyMissionStatus, setDailyMissionStatus] = useState({
    daily_quiz: false, // 데일리 퀴즈 미션 여부
    mini_game: true // 데일리 미니게임 미션 여부
  });


    const onlineMissions = [
    { title: '의성 장날', description: '의성 장날 웹에서 다양한 의성 농수산물을 구매 후 포인트 받기', buttonText: '의성 농수산 쇼핑가기' },
  ];

  const offlineMissions = [
    { title: '지역 축제', description: 'QR 인증하고 가기', buttonText: '위치 정보 보기' },
    { title: '체험 프로그램', description: '체험 다녀오고 포인트 받기', buttonText: '체험 프로그램 안내' },
    { title: '관광지 방문', description: '관광지 인증하기', buttonText: '다양한 관광지 보기' }
  ];

  // 변하지 않는 미션 구성
  const ONE_TIME_MISSION_CONFIG = [
    { id: 'sns_share', title: 'SNS 홍보', description: '인스타그램 홍보하고 2000포인트 받기', buttonText: '인증하기' },
    { id: 'survey', title: '설문조사', description: '설문조사 참여하고 1000포인트 받아가세요 !', buttonText: '설문 참여하기' }
  ];

  const DAILY_MISSION_CONFIG = [
    { id: 'daily_quiz', title: 'Daily Quiz', description: '오늘의 퀴즈 ! ', buttonText: '획득하기' },
    { id: 'mini_game', title: '미니 게임', description: '다양한 미니 게임을 진행하고\n포인트를 얻어보세요 !', buttonText: '획득하기' }
  ];

 

  // 상태와 구성 병합
  const oneTimeMissions = ONE_TIME_MISSION_CONFIG.map(m => ({
    ...m,
    completed: oneTimeMissionStatus[m.id]
  }));

  const dailyMissions = DAILY_MISSION_CONFIG.map(m => ({
    ...m,
    completed: dailyMissionStatus[m.id]
  }));

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <ProfileCard  userInfo={userInfo} />
        <MissionSection sectionTitle="온라인 미션" missions={onlineMissions} oneTimeMissions = {oneTimeMissions} dailyMissions= {dailyMissions} />
        <MissionSection sectionTitle="오프라인 미션" missions={offlineMissions} />
      </div>
    </div>
  );
}