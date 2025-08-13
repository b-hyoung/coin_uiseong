import { React, useEffect, useState } from 'react';
import { WepinPin } from '@wepin/pin-js';
import './HeroPage.css';
import { useNavigate } from 'react-router';
import { WepinLogin } from '@wepin/login-js'
import { googleLogin } from '../../api/auth';

const scrollToTutorial = () => {
  const el = document.getElementById('tutorial');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function HeroPage() {
  const navigate = useNavigate();
  const [modalMsg, setModalMsg] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [theme, setTheme] = useState('mint'); // 'forest' | 'garlic' | 'sunrise' | 'mint'
  const [layout, setLayout] = useState('zigzag'); // 'grid' | 'zigzag' | 'rows'




  // const handleClickLog = async () => {
  //   try {
  //     await wepinLogin.init({ defaultLanguage: 'ko' });
  //     await wepinPin.init({ defaultLanguage: 'ko' });

  //     const oauth = await wepinLogin.loginWithOauthProvider({ provider: 'google' });

  //     let wepinUser = await wepinLogin.loginWepin(oauth);

  //     const userId = wepinUser?.userInfo?.userId;
  //     const accessToken = wepinUser?.token?.accessToken;
  //     console.log(wepinUser.userInfo)

  //     if (!userId) {
  //       throw new Error('userId 없음 (loginWepin 응답 확인 필요)');
  //     }
  //     if (!accessToken) {
  //       throw new Error('Wepin accessToken이 없습니다 (loginWepin 응답 확인 필요)');
  //     }

  //     const appDomain = window.location.origin;
  //     let registerIdToken = null;

  //     if (wepinUser.userStatus?.loginStatus === 'pinRequired') {
  //       const pinBlock = await wepinPin.generateRegistrationPINBlock();

  //       const res = await fetch('https://sdk.wepin.io/v1/app/register', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${accessToken}`,
  //           'X-API-KEY': process.env.REACT_APP_WEPIN_API_KEY,
  //           'X-API-DOMAIN': appDomain,
  //           'X-SDK-TYPE': 'web_rest_api',
  //         },
  //         body: JSON.stringify({
  //           appId: process.env.REACT_APP_WEPIN_APP_ID,
  //           userId,
  //           loginStatus: 'pinRequired',
  //           UVD: pinBlock.UVD,
  //           hint: pinBlock.hint,
  //         }),
  //       });

  //       if (!res.ok) {
  //         const errText = await res.text().catch(() => '');
  //         throw new Error('지갑 등록 실패: ' + errText);
  //       }

  //       let registerJson = null;
  //       try {
  //         registerJson = await res.json();
  //       } catch (_) {
  //         registerJson = null;
  //       }

  //       if (registerJson?.token?.idToken) {
  //         registerIdToken = registerJson.token.idToken;
  //       }

  //       wepinUser = await wepinLogin.loginWepin(oauth);
  //     } else if (wepinUser.userStatus?.loginStatus === 'registerRequired') {
  //       const pinBlock = await wepinPin.generateAuthPINBlock(1);

  //       if (!wepinUser.walletId) {
  //         throw new Error('registerRequired인데 walletId가 없습니다.');
  //       }

  //       const res = await fetch('https://sdk.wepin.io/v1/app/register', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${accessToken}`,
  //           'X-API-KEY': process.env.REACT_APP_WEPIN_API_KEY,
  //           'X-API-DOMAIN': appDomain,
  //           'X-SDK-TYPE': 'web_rest_api',
  //         },
  //         body: JSON.stringify({
  //           appId: process.env.REACT_APP_WEPIN_APP_ID,
  //           userId,
  //           loginStatus: 'registerRequired',
  //           walletId: wepinUser.walletId,
  //           UVD: pinBlock.UVDs ? pinBlock.UVDs[0] : pinBlock.UVD,
  //         }),
  //       });

  //       if (!res.ok) {
  //         const errText = await res.text().catch(() => '');
  //         throw new Error('앱 등록 실패: ' + errText);
  //       }

  //       let registerJson = null;
  //       try {
  //         registerJson = await res.json();
  //       } catch (_) {
  //         registerJson = null;
  //       }

  //       if (registerJson?.token?.idToken) {
  //         registerIdToken = registerJson.token.idToken;
  //       }

  //       wepinUser = await wepinLogin.loginWepin(oauth);
  //     }

  //     const idTokenForBackend = registerIdToken ?? oauth?.token?.idToken;
  //     if (!idTokenForBackend) {
  //       throw new Error('백엔드로 전달할 id_token을 찾을 수 없습니다.');
  //     }

  //     // wepinUser.userInfo 전체(또는 필요한 필드만) 함께 전송
  //     const backendRes = await googleLogin({
  //       id_token: idTokenForBackend,
  //       userInfo: wepinUser?.userInfo || {},
  //     });
  //     if (!backendRes || backendRes.error) {
  //       throw new Error(backendRes?.error || 'googleLogin 실패');
  //     }

  //     if (backendRes.accessToken) {
  //       localStorage.setItem('app_access_token', backendRes.accessToken);
  //     }
  //     if (backendRes.user) {
  //       localStorage.setItem('app_user', JSON.stringify(backendRes.user));
  //     }

  //     navigate('/mainpage');
  //   } catch (error) {
  //     console.error('❌ login error:', error);
  //     setModalMsg(`로그인 중 오류가 발생했습니다: ${error.message}`);
  //   }
  // };

  // 시작하기 메인페이지 이동
  const handleClickStart = () => {
    navigate('/mainpage');
  };

  return (
    <div className={`uiseong-ui theme-${theme} layout-${layout}`}>
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
          <button>
            로그인
          </button>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">의성, 미션으로 더 재밌게 찍고 모으고 쓰는 지역여행</h1>
          <p className="hero-subtitle">
            의성, 미션으로 즐기는 특별한 여행<br/>
            관광지 QR로 포인트 적립!<br/>
            체험·축제·퀴즈로 채우고,<br/>
            가족·친구와 함께 포인트 퀘스트를 시작해요.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleClickStart}>
              시작하기
            </button>
            <button className="btn-secondary" onClick={scrollToTutorial}>튜토리얼 보기</button>
          </div>
        </div>
      </section>
      <section id="tutorial" className="tutorial">
        <div className="container">
          <span className="section-eyebrow">HOW IT WORKS</span>
          <h2>3분이면 이해되는 참여 방법</h2>

          <div className="steps">
            {/* Step 1 */}
            <div className="step-card">
              <span className="step-index">STEP 1</span>
              <div className="step-icon" aria-hidden>
                {/* QR icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h6v6H4V4Zm0 10h6v6H4v-6Zm10-10h6v6h-6V4Zm3 10h3v3h-3v-3Z" stroke="#2f4f1f" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="step-title">관광지에서 QR 스캔</div>
              <div className="step-desc">주요 포인트 거점에서 QR을 찍으면 미션이 시작되고 포인트가 적립됩니다.</div>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <span className="step-index">STEP 2</span>
              <div className="step-icon" aria-hidden>
                {/* checklist icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 5h12M4 12h8M4 19h12" stroke="#2f4f1f" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="m16 6 2 2 3-3" stroke="#2f4f1f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="step-title">미션 수행</div>
              <div className="step-desc">체험 프로그램 · 데일리 퀴즈, SNS 챌린지 등 다양한 미션으로 추가 포인트를 받아요.</div>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <span className="step-index">STEP 3</span>
              <div className="step-icon" aria-hidden>
                {/* wallet icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7Z" stroke="#2f4f1f" strokeWidth="1.6"/>
                  <path d="M16 10h5v6h-5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z" stroke="#2f4f1f" strokeWidth="1.6"/>
                </svg>
              </div>
              <div className="step-title">포인트 사용</div>
              <div className="step-desc">의성 내 가맹점에서 결제 시 포인트가 먼저 차감되고, 부족분은 BC카드로 결제돼요.</div>
            </div>

            {/* Step 4 */}
            <div className="step-card">
              <span className="step-index">STEP 4</span>
              <div className="step-icon" aria-hidden>
                {/* gift icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9h18v11H3V9Z" stroke="#2f4f1f" strokeWidth="1.6"/>
                  <path d="M12 20V9M3 9h18M7 6a2.5 2.5 0 1 1 5 0v3H7V6Zm5 0a2.5 2.5 0 1 1 5 0v3h-5V6Z" stroke="#2f4f1f" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="step-title">굿즈 및 혜택</div>
              <div className="step-desc">스탬프 완성·랭킹 보상으로 한정판 굿즈와 추가 포인트를 받습니다.</div>
            </div>
          </div>

          <div className="cta-bar">
            <button className="btn-primary" onClick={handleClickStart}>지금 시작하기</button>
            <button className="btn-ghost" onClick={scrollToTutorial}>다시 보기</button>
          </div>
        </div>
      </section>

      {/* Section 1. 주요 미션 미리보기 */}
      <section className="section alt">
        <div className="container">
          <h2 className="section-title">미리 보는 의성 포인트 미션</h2>
          <p className="section-sub">관광지에서 QR을 찍고, 체험·축제로 포인트를 쌓아보세요.</p>
          <div className="grid-3">
            <div className="card">
              <div className="media">
                <img src="/assets/preview/heritage.jpg" alt="의성 고즈넉한 한옥 관광지"/>
              </div>
              <div className="body">
                <div className="title">문화유산 인증</div>
                <div className="desc">현장 QR을 스캔하면 즉시 적립돼요.</div>
                <span className="badge">+300P</span>
              </div>
            </div>
            <div className="card">
              <div className="media">
                <img src="/assets/preview/pottery.jpg" alt="도자기 만들기 체험"/>
              </div>
              <div className="body">
                <div className="title">도자기 만들기</div>
                <div className="desc">체험 미션 완료하고 보너스 포인트!</div>
                <span className="badge">+300P</span>
              </div>
            </div>
            <div className="card">
              <div className="media">
                <img src="/assets/preview/farm.jpg" alt="농장 체험"/>
              </div>
              <div className="body">
                <div className="title">농장 수확 체험</div>
                <div className="desc">가족과 함께 즐기면 재미도 포인트도 UP.</div>
                <span className="badge">+300P</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2. 포인트 사용 예시 */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">포인트, 이렇게 쓸 수 있어요</h2>
          <p className="section-sub">카페·식당·기념품·체험비 등 지역 곳곳에서 결제 시 포인트가 먼저 차감됩니다.</p>
          <div className="grid-4">
            <div className="card">
              <div className="media"><img src="/assets/usage/cafe.jpg" alt="카페 아이스라떼"/></div>
              <div className="body"><div className="title">카페</div><div className="desc">라떼 한 잔도 포인트로.</div></div>
            </div>
            <div className="card">
              <div className="media"><img src="/assets/usage/restaurant.jpg" alt="지역 음식점"/></div>
              <div className="body"><div className="title">식당</div><div className="desc">의성 맛집에서 든든하게.</div></div>
            </div>
            <div className="card">
              <div className="media"><img src="/assets/usage/giftshop.jpg" alt="기념품 상점"/></div>
              <div className="body"><div className="title">기념품</div><div className="desc">한정 굿즈도 가능!</div></div>
            </div>
            <div className="card">
              <div className="media"><img src="/assets/usage/experience.jpg" alt="공방 체험"/></div>
              <div className="body"><div className="title">체험비</div><div className="desc">공방·농장·축제 입장 등.</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4. 후기/인증샷 */}
      <section className="section alt">
        <div className="container">
          <h2 className="section-title">참가자 후기</h2>
          <p className="section-sub">실제 참가자들의 사진과 한 줄 후기</p>
          <div className="grid-3">
            <div className="card">
              <div className="media"><img src="/assets/review/rev1.jpg" alt="가족 체험 사진"/></div>
              <div className="body testimonial">
                <div className="avatar"><img src="/assets/review/ava1.jpg" alt="프로필"/></div>
                <div className="content">
                  <div className="handle">@hana_traveler</div>
                  <div className="desc">포인트로 카페까지! 하루가 진짜 알찼어요 😊</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="media"><img src="/assets/review/rev2.jpg" alt="축제 사진"/></div>
              <div className="body testimonial">
                <div className="avatar"><img src="/assets/review/ava2.jpg" alt="프로필"/></div>
                <div className="content">
                  <div className="handle">@weekend_family</div>
                  <div className="desc">아이들이 미션 찾기 놀이에 푹 빠졌어요!</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="media"><img src="/assets/review/rev3.jpg" alt="공방 체험 사진"/></div>
              <div className="body testimonial">
                <div className="avatar"><img src="/assets/review/ava3.jpg" alt="프로필"/></div>
                <div className="content">
                  <div className="handle">@local_lover</div>
                  <div className="desc">지역 상점도 알게 되고, 다음에 또 올 거예요.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modals are no longer used for login/register flows */}
    </div>
  );
}

export default HeroPage;