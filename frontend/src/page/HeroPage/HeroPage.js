import { React, useEffect, useState } from 'react';
import { WepinPin } from '@wepin/pin-js';
import './HeroPage.css';
import { useNavigate } from 'react-router';
import { WepinLogin } from '@wepin/login-js'


function HeroPage() {
  const navigate = useNavigate();
  const [modalMsg, setModalMsg] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);

  const wepinLogin = new WepinLogin({
    appId: process.env.REACT_APP_WEPIN_APP_ID,
    appKey: process.env.REACT_APP_WEPIN_API_KEY
  })

  const wepinPin = new WepinPin({
    appId: process.env.REACT_APP_WEPIN_APP_ID,
    appKey: process.env.REACT_APP_WEPIN_API_KEY
  });


  const handleClickLogin = async () => {
    try {
      await wepinLogin.init({ defaultLanguage: 'ko' });
      await wepinPin.init({ defaultLanguage: 'ko' });

      if (wepinLogin.isInitialized()) {
        console.log('✅ wepinSDK is initialized!');
      }

      // 1) 소셜 로그인 (Firebase 토큰)
      const oauth = await wepinLogin.loginWithOauthProvider({ provider: 'google' });

      // 2) 위핀 로그인 (Wepin Access Token 발급 + 상태)
      let wepinUser = await wepinLogin.loginWepin(oauth);
      console.log('✅ wepin user status:', wepinUser.userStatus);

      const userId = wepinUser?.userInfo?.userId;
      if (!userId) {
        console.error('❌ userId가 없습니다. wepinUser:', wepinUser);
        throw new Error('userId 없음 (loginWepin 응답 확인 필요)');
      }

      // ⛳️ 이후 REST 호출에는 wepinUser.token.accessToken 사용
      const accessToken = wepinUser?.token?.accessToken;
      if (!accessToken) {
        throw new Error('Wepin accessToken이 없습니다 (loginWepin 응답 확인 필요)');
      }

      const appDomain = window.location.origin;

      // 3) 상태에 따라 등록 처리
      if (wepinUser.userStatus?.loginStatus === 'pinRequired') {
        // 신규 지갑 생성 + 앱 등록 (PIN 2회 입력 권장이지만 SDK가 화면에서 처리)
        const pinBlock = await wepinPin.generateRegistrationPINBlock();

        const res = await fetch('https://sdk.wepin.io/v1/app/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,            // ✅ Wepin Access Token
            'X-API-KEY': process.env.REACT_APP_WEPIN_API_KEY,    // ✅ 필수
            'X-API-DOMAIN': appDomain,                           // ✅ 필수 (Wepin 콘솔에 등록된 도메인)
            'X-SDK-TYPE': 'web_rest_api',                        // ✅ 필수
          },
          body: JSON.stringify({
            appId: process.env.REACT_APP_WEPIN_APP_ID,
            userId,
            loginStatus: 'pinRequired',
            UVD: pinBlock.UVD,
            hint: pinBlock.hint,
          }),
        });

        if (!res.ok) {
          const err = await res.text().catch(() => '');
          console.error('❌ 지갑 등록 실패(res):', res.status, err);
          throw new Error('지갑 등록 실패');
        }

        console.log('✅ 지갑 생성+앱 등록 완료');

        // 등록 후 상태/토큰 갱신
        wepinUser = await wepinLogin.loginWepin(oauth);
        console.log('✅ updated user:', wepinUser.userStatus);
      } else if (wepinUser.userStatus?.loginStatus === 'registerRequired') {
        // 기존 지갑을 앱에 등록 (PIN 1회 입력)
        const pinBlock = await wepinPin.generateAuthPINBlock(1);

        if (!wepinUser.walletId) {
          throw new Error('registerRequired인데 walletId가 없습니다.');
        }

        const res = await fetch('https://sdk.wepin.io/v1/app/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'X-API-KEY': process.env.REACT_APP_WEPIN_API_KEY,
            'X-API-DOMAIN': appDomain,
            'X-SDK-TYPE': 'web_rest_api',
          },
          body: JSON.stringify({
            appId: process.env.REACT_APP_WEPIN_APP_ID,
            userId,
            loginStatus: 'registerRequired',
            walletId: wepinUser.walletId,
            // generateAuthPINBlock 응답은 SDK 버전에 따라 UVD 또는 UVDs 구조가 다를 수 있음
            UVD: pinBlock.UVDs ? pinBlock.UVDs[0] : pinBlock.UVD,
          }),
        });

        if (!res.ok) {
          const err = await res.text().catch(() => '');
          console.error('❌ 앱 등록 실패(res):', res.status, err);
          throw new Error('앱 등록 실패');
        }

        console.log('✅ 앱 등록 완료');

        // 등록 후 상태/토큰 갱신
        wepinUser = await wepinLogin.loginWepin(oauth);
        console.log('✅ updated user:', wepinUser.userStatus);
      }

      // 4) 최종 로그인 완료 처리
      localStorage.setItem('wepin_token', JSON.stringify(wepinUser.token));
      navigate('/mainpage');
    } catch (error) {
      console.error('❌ login error:', error);
      setModalMsg(`로그인 중 오류가 발생했습니다: ${error.message}`);
    }
  };


  // 시작하기 메인페이지 이동
  const handleClickStart = () => {
    navigate('/mainpage');
  };

  return (
    <div>
      <section
        className="hero"
        style={{
          backgroundImage: "url('/assets/images/hero_background.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="landing_header">
          <button onClick={handleClickLogin}>
            로그인
          </button>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Hidden Gems of Uiseong</h1>
          <p className="hero-subtitle">
            의성의 아름다운 농촌 풍경과 함께, 포인트 퀘스트를 시작해보세요.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleClickStart}>
              시작하기
            </button>
          </div>
        </div>
      </section>
      {/* Modals are no longer used for login/register flows */}
    </div>
  );
}

export default HeroPage;