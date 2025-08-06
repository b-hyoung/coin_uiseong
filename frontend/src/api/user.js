import api from './axios';

export const getUserInfo = async () => {
  const res = await api.get('/user');
  return res.data; // userInfo + oneTimeMissionStatus + dailyMissionStatus
};