import { React, useEffect, useState } from 'react';
import { WepinPin } from '@wepin/pin-js';
import './HeroPage.css';
import { useNavigate } from 'react-router';
import { WepinLogin } from '@wepin/login-js'
import { googleLogin } from '../../api/auth';


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


  const handleClickLog = async () => {
    try {
      await wepinLogin.init({ defaultLanguage: 'ko' });
      await wepinPin.init({ defaultLanguage: 'ko' });

      const oauth = await wepinLogin.loginWithOauthProvider({ provider: 'google' });

      let wepinUser = await wepinLogin.loginWepin(oauth);

      const userId = wepinUser?.userInfo?.userId;
      const accessToken = wepinUser?.token?.accessToken;
      console.log(wepinUser.userInfo)

      if (!userId) {
        throw new Error('userId 없음 (loginWepin 응답 확인 필요)');
      }
      if (!accessToken) {
        throw new Error('Wepin accessToken이 없습니다 (loginWepin 응답 확인 필요)');
      }

      const appDomain = window.location.origin;
      let registerIdToken = null;

      if (wepinUser.userStatus?.loginStatus === 'pinRequired') {
        const pinBlock = await wepinPin.generateRegistrationPINBlock();

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
            loginStatus: 'pinRequired',
            UVD: pinBlock.UVD,
            hint: pinBlock.hint,
          }),
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => '');
          throw new Error('지갑 등록 실패: ' + errText);
        }

        let registerJson = null;
        try {
          registerJson = await res.json();
        } catch (_) {
          registerJson = null;
        }

        if (registerJson?.token?.idToken) {
          registerIdToken = registerJson.token.idToken;
        }

        wepinUser = await wepinLogin.loginWepin(oauth);
      } else if (wepinUser.userStatus?.loginStatus === 'registerRequired') {
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
            UVD: pinBlock.UVDs ? pinBlock.UVDs[0] : pinBlock.UVD,
          }),
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => '');
          throw new Error('앱 등록 실패: ' + errText);
        }

        let registerJson = null;
        try {
          registerJson = await res.json();
        } catch (_) {
          registerJson = null;
        }

        if (registerJson?.token?.idToken) {
          registerIdToken = registerJson.token.idToken;
        }

        wepinUser = await wepinLogin.loginWepin(oauth);
      }

      const idTokenForBackend = registerIdToken ?? oauth?.token?.idToken;
      if (!idTokenForBackend) {
        throw new Error('백엔드로 전달할 id_token을 찾을 수 없습니다.');
      }

      // wepinUser.userInfo 전체(또는 필요한 필드만) 함께 전송
      const backendRes = await googleLogin({
        id_token: idTokenForBackend,
        userInfo: wepinUser?.userInfo || {},
      });
      if (!backendRes || backendRes.error) {
        throw new Error(backendRes?.error || 'googleLogin 실패');
      }

      if (backendRes.accessToken) {
        localStorage.setItem('app_access_token', backendRes.accessToken);
      }
      if (backendRes.user) {
        localStorage.setItem('app_user', JSON.stringify(backendRes.user));
      }

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
          <button onClick={handleClickLog}>
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