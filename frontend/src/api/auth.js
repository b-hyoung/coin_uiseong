import api from './axios';

// 구글 로그인 후 id_token을 백엔드로 전달
export const googleLogin = async (idToken) => {
  const res = await api.post('/auth/google', { id_token: idToken });
  return res.data; // { accessToken: 'mock-jwt-token' }
};