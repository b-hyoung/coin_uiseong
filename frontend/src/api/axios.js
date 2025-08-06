import axios from 'axios';

const api = axios.create({
  baseURL: '/mock', // MSW에서는 절대경로 /api 로 요청하면 handler.js와 매칭
});

// 요청 시 토큰 자동 포함 (있을 경우)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const getDailyMissions = async () => {
  const res = await api.get('/user'); // /user 응답에 dailyMissionStatus 포함됨
  return res.data.dailyMissionStatus;
};

export const getOneTimeMissions = async () => {
  const res = await api.get('/user'); // /user 응답에 oneTimeMissionStatus 포함됨
  return res.data.oneTimeMissionStatus;
};