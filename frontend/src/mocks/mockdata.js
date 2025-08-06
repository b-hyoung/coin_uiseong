//한명의 유저 정보

export const userInfo = {
    username: "박형석", // 유저 이름
    lastLogin: "2025-08-05", // 이전 마지막 로그인 시간
    rank: "마늘", // 랭크 아직 고민중인 영역
    point: 3000, // 미션을 통해 얻는 포인트
    SVTPoint: 150, // 실제 의성시에서 사용할 가상화폐 포인트
    monthlyEarned: 1000, // 이번달 포인트 적립 내역
    monthlyUsed: 500, // 이번달 가상화폐포인트 사용 내역
    totalExchanged: 5600, // 현재까지 누적된 가상화폐포인트 사용 내역
};

// 한번 인증하고 그 이후 인증안해두 되는 것들
export const oneTimeMissionStatus = {
    sns_share: false, // 인스타 인증 여부
    survey: true // 설문조사 참여 여부
};
  // 하루 한번씩 인증해줘야 하는 목록
  // 시간 00:00기준 초기화
export const dailyMissionStatus = {
   daily_quiz: false, // 데일리 퀴즈 미션 여부
    mini_game: true // 데일리 미니게임 미션 여부
};