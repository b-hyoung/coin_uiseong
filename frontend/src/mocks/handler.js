import { http, HttpResponse } from 'msw';
import { userInfo, oneTimeMissionStatus, dailyMissionStatus } from './mockdata';

export const handlers = [
  //구글로그인
  http.post('/mock/auth/google', async ({ request }) => {
    const { id_token } = await request.json();

    if (id_token) {
      return HttpResponse.json({ accessToken: 'mock-jwt-token' }, { status: 200 });
    }

    return HttpResponse.json({ message: 'Invalid Google token' }, { status: 400 });
  }),

  //유저 정보
  http.get('/mock/user', ({ request }) => {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer mock-jwt-token') {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      ...userInfo,
      oneTimeMissionStatus,
      dailyMissionStatus
    }, { status: 200 });
  })
];

// 일회성 미션만
http.get('/mock/user/one-time-missions', ({ request }) => {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== 'Bearer mock-jwt-token') {
    return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return HttpResponse.json(oneTimeMissionStatus, { status: 200 });
})

// 데일리 미션만
http.get('/mock/user/daily-missions', ({ request }) => {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== 'Bearer mock-jwt-token') {
    return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return HttpResponse.json(dailyMissionStatus, { status: 200 });
})

