import { http, HttpResponse } from 'msw';
import { userInfo, oneTimeMissionStatus, dailyMissionStatus } from './mockdata';

export const handlers = [
  http.post('/mock/auth/google', async ({ request }) => {
    const { id_token } = await request.json();

    if (id_token) {
      return HttpResponse.json({ accessToken: 'mock-jwt-token' }, { status: 200 });
    }

    return HttpResponse.json({ message: 'Invalid Google token' }, { status: 400 });
  }),

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