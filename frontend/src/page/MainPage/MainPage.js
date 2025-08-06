import {React,useState} from 'react';
import './MainPage.css';
import ProfileCard from '../../components/ProfileCard';
import MissionSection from '../../components/MissionSection';
import Sidebar from '../../components/Sidebar'


export default function MainPage() {
  const onlineMissions = [
    { title: '의성 장날', description: '의성 장날 웹에서 다양한 의성 농수산물을 구매 후 포인트 받기', buttonText: '의성 농수산 쇼핑가기' },
  ];

  const offlineMissions = [
    { title: '지역 축제', description: 'QR 인증하고 가기', buttonText: '위치 정보 보기' },
    { title: '체험 프로그램', description: '체험 다녀오고 포인트 받기', buttonText: '체험 프로그램 안내' },
    { title: '관광지 방문', description: '관광지 인증하기', buttonText: '다양한 관광지 보기' }
  ];

    const [userInfo, setUserInfo] = useState(
    {
      username: "박형석", // 유저 이름
      lastLogin: "2025-08-05", // 이전 마지막 로그인 시간
      rank: "새싹", // 랭크 아직 고민중인 영역
      point: 3000, // 미션을 통해 얻는 포인트
      SVTPoint: 150, // 실제 의성시에서 사용할 가상화폐 포인트
      monthlyEarned: 1000, // 이번달 포인트 적립 내역
      monthlyUsed: 500, // 이번달 가상화폐포인트 사용 내역
      totalExchanged: 5600, // 현재까지 누적된 가상화폐포인트 사용 내역
      eventStatus: {
        "DailyQuiz": true,
        "DailyMiniGame": false
      }
    }
  )
  const [oneTimeMissions, setOneTimeMissions] = useState(
    [
      { title: 'SNS 홍보', description: '인스타그램 홍보하고 2000포인트 받기', buttonText: '인증하기' , completed:false },
      { title: '설문조사', description: '설문조사 참여하고 1000포인트 받아가세요 !', buttonText: '설문 참여하기' ,completed:true }

    ]
  )

  const [dailyMissions,setDaillyMissions] = useState(
    [
      { title: 'Daily Quiz', description: '오늘의 퀴즈 ! ', buttonText: '획득하기' , completed : false},
      { title: '미니 게임', description: '다양한 미니 게임을 진행하고\n포인트를 얻어보세요 !', buttonText: '획득하기' , completed : true },
    ]
  )

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <ProfileCard  userInfo={userInfo} />
        <MissionSection sectionTitle="온라인 미션" missions={onlineMissions} oneTimeMission = {oneTimeMissions} />
        <MissionSection sectionTitle="오프라인 미션" missions={offlineMissions} />
      </div>
    </div>
  );
}