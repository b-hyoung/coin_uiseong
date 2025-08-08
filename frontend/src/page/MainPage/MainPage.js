import {React,useState , useEffect} from 'react';
import './MainPage.css';
import ProfileCard from './components/ProfileCard';
import MissionSection from './components/MissionSection';
import Sidebar from './components/Sidebar'
import { googleLogin } from '../../api/auth';
import { getUserInfo } from '../../api/user';


export default function MainPage() {

    // 유저 정보
    const [userInfo, setUserInfo] = useState(
    {
      username : '', // 유저 이름
      lastLogin : ' ', // 이전 마지막 로그인 시간
      rank : ' ', // 랭크 아직 고민중인 영역
      point: 0, // 미션을 통해 얻는 포인트
      SVTPoint: 0, // 실제 의성시에서 사용할 가상화폐 포인트
      monthlyEarned: 0, // 이번달 포인트 적립 내역
      monthlyUsed: 0, // 이번달 가상화폐포인트 사용 내역
      totalExchanged: 0 , // 현재까지 누적된 가상화폐포인트 사용 내역
    }
  )
  // 한번 인증하고 그 이후 인증안해두 되는 것들
  const [oneTimeMissionStatus, setOneTimeMissionStatus] = useState({
    sns_share : true, // 인스타 인증 여부
    survey : true // 설문조사 참여 여부
  });

  // 하루 한번씩 인증해줘야 하는 목록
  // 시간 00:00기준 초기화
  const [dailyMissionStatus, setDailyMissionStatus] = useState({
    daily_quiz : true, // 데일리 퀴즈 미션 여부
    mini_game : true // 데일리 미니게임 미션 여부
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

  useEffect(() => {
    const loginAndFetchUser = async () => {
      try {
        // 1) 이미 저장된 토큰 불러오기
        const raw = localStorage.getItem('wepin_token');
        const storedToken = raw ? JSON.parse(raw)?.idToken : null;


        if (!storedToken) {
          console.error('❌ id_token이 존재하지 않습니다.');
          return;
        }

        // 2) accessToken이 없다면 로그인 요청
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          const response = await googleLogin(storedToken);
          localStorage.setItem('accessToken', response.accessToken);
          console.log("✅ accessToken 발급 및 저장 완료");
        }
        // Extract userId from Wepin or use mock address for development
        let userId = localStorage.getItem('userId');
        if (!userId) {
          if (window.wepin && typeof window.wepin.getAccount === 'function') {
            const account = await window.wepin.getAccount();
            userId = account.address;
            console.log("✅ wepin 계정 정보로부터 userId 설정 완료:", userId);
          } else {
            // 개발 환경용 mock address
            userId = '0xabc123';
            console.warn("🟡 wepin이 없어서 mock userId를 사용합니다:", userId);
          }
          localStorage.setItem('userId', userId);
        }
        // 3) 유저 정보 요청
        const userIdFinal = userId;

        console.log("📬 x-user-address:", userIdFinal);

        const user = await getUserInfo(userIdFinal);
        console.log("🧪 getUserInfo 응답 원본:", JSON.stringify(user, null, 2));

        if (!user) {
          throw new Error("유저 정보가 undefined 또는 null입니다.");
        }

        console.log("✅ 유저 정보 응답:", user);

        setUserInfo({
          username: user.username || '알 수 없음',
          lastLogin: user.lastLogin || '-',
          rank: user.rank || '-',
          point: user.point || 0,
          SVTPoint: user.SVTPoint || 0,
          monthlyEarned: user.monthlyEarned || 0,
          monthlyUsed: user.monthlyUsed || 0,
          totalExchanged: user.totalExchanged || 0
        });

        if (user.oneTimeMissionStatus) {
          setOneTimeMissionStatus(user.oneTimeMissionStatus);
        }

        if (user.dailyMissionStatus) {
          setDailyMissionStatus(user.dailyMissionStatus);
        }
      } catch (error) {
        console.error("🚨 로그인 또는 유저정보 요청 실패:", error);
      }
    };

    loginAndFetchUser();
  }, []);

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