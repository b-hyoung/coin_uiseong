import React, { useState } from 'react'
import './HeroPageB.css'
const DEFAULT_TOURISM_ROUTES = [
  {
    id: 'jomunguk',
    title: '조문국 역사 탐방',
    description: '의성역에서 시작하는 천년 여행, 조문국의 비밀을 향해',
    iconBgClass: 'icon-circle light-blue',
    iconPath: 'uiseong_video_qr.png',
    quests: [
      { title: '의성역', subtitle: '역광장 포토존 인증샷 미션', status: 'completed' },
      { title: '조문국', subtitle: '가장 높지만 낮은 길 미션', status: 'ongoing' },
      { title: '고운사', subtitle: '고운사 상징물 3개 업로드 미션', status: 'locked' },
      { title: '사천마을', subtitle: '마을 벽화 속 동물과 사진 찍기 미션', status: 'locked' },
      { title: '여행의 마지막 페이지', subtitle: '모든 퀘스트를 완료하고 최종 보상 획득!', status: 'locked' },
    ]
  },
    {
    id: 'historic-churches',
    title: '의성 100년 교회 역사 탐방',
    description: '광복과 6.25의 흔적을 간직한 의성의 오래된 교회를 찾아가는 여정',
    iconBgClass: 'icon-circle red',
    iconPath: 'uiseong_samsancher.png',
    quests: [
      { title: '삼산교회', subtitle: '100년 넘은 의성 최초의 교회 탐방', status: 'ongoing' },
      { title: '안평교회', subtitle: '6.25 전쟁 당시 피난민을 품은 장소', status: 'locked' },
      { title: '비안교회', subtitle: '광복 후 의성 지역 신앙 공동체의 중심', status: 'locked' },
      { title: '주기철 목사님 기념관', subtitle: '교회들의 역사 사진을 업로드하고 스토리를 공유하기', status: 'locked' },
    ]
  },
  // {
  //   id: 'sanchoon-story',
  //   title: '의성 산수유마을',
  //   description: '노란 물결이 넘실대는 아름다운 산수유 마을 탐방',
  //   iconBgClass: 'icon-circle yellow',
  //   iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
  //   quests: [
  //     { title: '산수유 마을 입구', subtitle: '인증샷 찍기', status: 'ongoing' },
  //     { title: '화전 체험', subtitle: '산수유 화전 만들기', status: 'locked' },
  //     { title: '마을 장터', subtitle: '특산물 구매', status: 'locked' },
  //   ]
  // },
  // {
  //   id: 'festival-gabaek',
  //   title: '의성 마늘 축제',
  //   description: '풍요로운 의성 마늘 축제를 즐기고 포인트를 얻으세요!',
  //   iconBgClass: 'icon-circle green',
  //   iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  //   quests: [
  //     { title: '축제장 입구', subtitle: 'QR 스캔 후 입장', status: 'completed' },
  //     { title: '마늘 요리 체험', subtitle: '의성 마늘로 요리하기', status: 'completed' },
  //     { title: '마늘 굿즈 부스', subtitle: '한정판 굿즈 구매', status: 'ongoing' },
  //     { title: '폐막식 참여', subtitle: '폐막식 참여 인증', status: 'locked' },
  //   ]
  // },

];

function HeroPageB({ tourismRoutes = DEFAULT_TOURISM_ROUTES, onSelectRoute, instagramReels = [], youtubeMap = {} }) {
  const [theme, setTheme] = useState('neon'); // 'default' | 'modern' | 'neon' | 'pastel' | 'ocean' | 'retro'

  // Single YouTube embed state and handlers
  const [ytOpen, setYtOpen] = useState(false);
  const [ytId, setYtId] = useState('');
  const openVideo = (routeId) => {
    const id = youtubeMap[routeId];
    if (!id) { alert('이 루트에 연결된 영상이 아직 없어요.'); return; }
    setYtId(id);
    setYtOpen(true);
  };
  const closeVideo = () => {
    setYtOpen(false);
    setYtId('');
  };

  return (
    <div className={`landing-root theme-${theme}`}>
      <div className="theme-switcher">
        <button className={`ts-btn ${theme==='default'?'on':''}`} onClick={()=>setTheme('default')}>Default</button>
        <button className={`ts-btn ${theme==='modern'?'on':''}`} onClick={()=>setTheme('modern')}>Modern</button>
        <button className={`ts-btn ${theme==='neon'?'on':''}`} onClick={()=>setTheme('neon')}>Neon</button>
        <button className={`ts-btn ${theme==='pastel'?'on':''}`} onClick={()=>setTheme('pastel')}>Pastel</button>
        <button className={`ts-btn ${theme==='ocean'?'on':''}`} onClick={()=>setTheme('ocean')}>Ocean</button>
        <button className={`ts-btn ${theme==='retro'?'on':''}`} onClick={()=>setTheme('retro')}>Retro</button>
      </div>
      {/* HERO */}
      <section className="landing-hero">
        <div className="landing-hero__inner">
          <div className="hero-badge">NEW • 키워드형 루트</div>
          <h1 className="landing-title">의성 여행, <span className="underline">키워드형 루트</span>로 시작하세요</h1>
          <p className="landing-sub">추천 루트를 먼저 고르고 그에 맞게 돌아다니며 다양한 포인트와 굿즈를 획득해보세요!</p>
          <div className="landing-cta">
            <a className="btn primary" href="#routes">추천 루트 보기</a>
          </div>
          {instagramReels?.length > 0 && (
            <div className="reels-strip" aria-label="인스타 릴스 미리보기">
              {instagramReels.map((url, i) => (
                <div className="reel-embed" key={`reel-${i}`}>
                  <iframe
                    src={`${url.replace(/\/$/, '')}/embed`}
                    title={`Instagram Reel ${i+1}`}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 추천 루트 — 보기 전용 (Row List) */}
      <section id="routes" className="landing-section">
        <div className="landing-section__head">
          <h2>추천 키워드</h2>
          <p>계절 / 행사별 다양한 키워드를 확인하고 여행에 참고하세요</p>
        </div>

        <div className="routes-list">
          {tourismRoutes.map((r, i) => (
            <article key={`row-${r.id}`} className={`route-row ${i % 2 === 1 ? 'alt' : 'alt'}`}>
              <figure className="route-media">
                <img
                  src={`${process.env.PUBLIC_URL || ''}/assets/images/${r.iconPath}`}
                  alt={r.title}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="route-info">
                <div className="route-kicker">{String(i+1).padStart(2,'0')}</div>
                <h3 className="route-title">{r.title}</h3>
                <p className="route-desc">{r.description}</p>
                <div className="route-tags">
                  {r.quests.slice(0,4).map((q) => (
                    <span key={q.title} className="tag">{q.title}</span>
                  ))}
                  {r.quests.length > 4 && <span className="tag more">+{r.quests.length - 4}</span>}
                </div>
                <div className="route-steps-inline">
                  {r.quests.map((q, idx) => (
                    <span key={q.title+idx} className="step">
                      <i className={`dot ${q.status}`} />
                      {q.title}
                    </span>
                  ))}
                </div>
                <div className="route-actions">
                  <button type="button" className="btn video" onClick={() => openVideo(r.id)}>Details..</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 루트별 간단 상세 (타이포 + 라인 리스트) */}
      {tourismRoutes.map((r, i) => (
        <section id={`route-${r.id}`} key={`sec-${r.id}`} className={`landing-section route-detail ${i % 2 === 1 ? 'alt' : ''}`}>
          <div className="route-detail__inner">
            <header className="route-detail__head">
              <h2 className="rd-title">{r.title}</h2>
              <p className="rd-desc">{r.description}</p>
            </header>
            <ul className="rd-list">
              {r.quests.map((q) => (
                <li key={q.title}>
                  <span className={`rd-dot ${q.status}`} />
                  <strong>{q.title}</strong>
                  <span className="sep">—</span>
                  <span className="sub">{q.subtitle}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* AI 보조: 후순위 & 베타 표기 */}
      <section id="ai-planner" className="landing-section ai glass">
        <div className="landing-section__head reveal-on-scroll">
          <h2>AI 보조 설계 (Beta)</h2>
          <p>AI는 보조 도구입니다. 먼저 추천 루트를 선택한 뒤, 키워드/일정으로 미세 조정하세요. (개발 진행 중)</p>
        </div>
        <form className="ai-form" onSubmit={(e)=>{e.preventDefault(); alert('Beta: AI 추천은 준비중이에요. 우선 추천 루트를 선택해 보세요.');}}>
          <label className="ai-label">관심 키워드</label>
          <input className="ai-input" type="text" placeholder="예: 역사, 사찰, 굿즈, 꽃구경"/>
          <label className="ai-label">여행 기간</label>
          <select className="ai-select" defaultValue="당일">
            <option>당일</option>
            <option>1박 2일</option>
            <option>2박 3일</option>
          </select>
          <div className="landing-cta inline">
            <button className="btn ghost" type="submit">AI 제안 받기(Beta)</button>
          </div>
        </form>
      </section>

      {/* Single YouTube Embed (one instance) */}
      <div className={`video-modal ${ytOpen ? 'on' : ''}`} role="dialog" aria-modal="true" aria-label="영상 재생 모달">
        <div className="video-backdrop" onClick={closeVideo} />
        <div className="video-sheet" role="document">
          <button className="video-close" aria-label="닫기" onClick={closeVideo}>×</button>
          {ytOpen && ytId && (
            <div className="video-frame">
              <iframe
                key={ytId}
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>

      <footer className="landing-footer">
        <p>© 2025 Uiseong Tourism. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HeroPageB
