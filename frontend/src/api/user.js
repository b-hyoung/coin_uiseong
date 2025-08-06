import api from './axios';

export const getUserInfo = async () => {
  const res = await api.get('/user');
  return res.data; // userInfo + oneTimeMissionStatus + dailyMissionStatus
};

export const getDailyMissions = async () => {
  const res = await api.get('/user/one-time-missions'); // /user 응답에 dailyMissionStatus 포함됨
  return res.data.dailyMissionStatus;
};

export const getOneTimeMissions = async () => {
  const res = await api.get('/user/daily-missions'); // /user 응답에 oneTimeMissionStatus 포함됨
  return res.data.oneTimeMissionStatus;
};