import { React, useEffect, useState } from 'react';
import './HeroPage.css';
import { useNavigate } from 'react-router';
import { WepinLogin } from '@wepin/login-js'


function HeroPage() {
  const navigate = useNavigate();

  const wepinLogin = new WepinLogin({
    appId: process.env.REACT_APP_WEPIN_APP_ID,
    appKey: process.env.REACT_APP_WEPIN_API_KEY
})

  const handleClickLogin = async () => {
      await wepinLogin.init('ko')
      if(wepinLogin.isInitialized()) {
        console.log('wepinSDK is initialized!')
      }
      await wepinLogin.loginWithOauthProvider({provider : 'google'})
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
    </div>
  );
}

export default HeroPage;