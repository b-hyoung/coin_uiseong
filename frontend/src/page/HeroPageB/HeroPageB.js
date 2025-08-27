import React, { useState } from 'react'
import './HeroPageB.css'
const DEFAULT_TOURISM_ROUTES = [
  {
    id: 'jomunguk',
    title: '천년 역사 탐방',
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
    description: '경북 삼일운동의 시작 의성에서의 기독교 성지순례 ',
    iconBgClass: 'icon-circle red',
    iconPath: 'uiseong_samsancher.png',
    quests: [
      { title: '비봉교회', subtitle: '100년 넘은 의성 최초의 교회 탐방', status: 'ongoing' },
      { title: '대사교회', subtitle: '삼일절 참여한 교회', status: 'locked' },
      { title: '구천교회', subtitle: '옛 본당 건물이 의성군 문화유산 제49호로 지정된 문화유산', status: 'locked' },
      { title: '주기철 목사님 수난 기념관', subtitle: '일제강점기 신앙의 자유를 지키다 순교한 주기철 목사의 뜻을 기리는 기념관.', status: 'locked' },
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



function HeroPageB({ tourismRoutes = DEFAULT_TOURISM_ROUTES, experiences = [], places = [], onSelectRoute, instagramReels = [], youtubeMap = {}, instagramByType = { route:{}, exp:{}, place:{} } }) {
  const [theme] = useState('neon');

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
  // Content tabs: route | exp | place
  const [tab, setTab] = useState('route');
  const [openDetailType, setOpenDetailType] = useState(null);
  const [openDetailId, setOpenDetailId] = useState(null);

  // --- Instagram helpers ---
  const getFirstReel = (type, id) => {
    if (instagramByType && instagramByType[type] && instagramByType[type][id] && instagramByType[type][id].length > 0) {
      return instagramByType[type][id][0];
    }
    // backward-compat: try to find by substring in instagramReels
    if (type === 'route') {
      const hit = (instagramReels || []).find((url) => typeof url === 'string' && url.includes(id));
      return hit || null;
    }
    return null;
  };
  const getReelsForTab = () => {
    const list = [];
    if (tab === 'route') {
      // collect first reel per visible route
      tourismRoutes.forEach((r) => {
        const u = getFirstReel('route', r.id);
        if (u) list.push(u);
      });
    } else if (tab === 'exp') {
      (experiences || []).forEach((e) => {
        const arr = instagramByType?.exp?.[e.id];
        if (arr && arr.length) list.push(arr[0]);
      });
    } else if (tab === 'place') {
      (places || []).forEach((p) => {
        const arr = instagramByType?.place?.[p.id];
        if (arr && arr.length) list.push(arr[0]);
      });
    }
    // fallback: if nothing collected, show the legacy strip
    if (list.length === 0 && instagramReels?.length) return instagramReels;
    return list;
  };

  const goDetail = (type, id) => {
    setOpenDetailType(type);
    setOpenDetailId(id);
    setTimeout(() => {
      const el = document.getElementById(`detail-${type}-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <div className={`landing-root theme-${theme}`}>
      {/* HERO */}
      <section className="landing-hero">
        <div className="landing-hero__inner">
          <div className="hero-badge">NEW • 키워드형 루트</div>
          <h1 className="landing-title">의성 여행, <span className="underline">키워드형 루트</span>로 시작하세요</h1>
          <p className="landing-sub">추천 루트를 먼저 고르고 그에 맞게 돌아다니며 다양한 포인트와 굿즈를 획득해보세요!</p>
          <div className="landing-cta">
            <a className="btn primary" href="#routes">추천 루트 보기</a>
          </div>
        </div>
      </section>

      {/* 추천 루트/체험/카페·식당 — 보기 전용 (Row List, Tabbed) */}
      <section id="routes" className="landing-section">
        <div className="landing-section__head">
          <h2>
            {tab==='route' && '추천 루트'}
            {tab==='exp' && '체험 프로그램'}
            {tab==='place' && '카페 · 식당'}
          </h2>
          <div className="content-tabs">
            <button type="button" className={`tab-btn ${tab==='route'?'on':''}`} onClick={()=>setTab('route')}>루트</button>
            <button type="button" className={`tab-btn ${tab==='exp'?'on':''}`} onClick={()=>setTab('exp')}>체험</button>
            <button type="button" className={`tab-btn ${tab==='place'?'on':''}`} onClick={()=>setTab('place')}>카페·식당</button>
          </div>
        </div>

        <div className="routes-list">
          {tab === 'route' && tourismRoutes.map((r, i) => (
            <React.Fragment key={`row-route-${r.id}`}>
              <article className={`route-row alt ${(openDetailType==='route' && openDetailId === r.id) ? 'expanded' : ''}`}>
                <div className="route-media">
                  <img
                    src={`${process.env.PUBLIC_URL || ''}/assets/images/${r.iconPath}`}
                    alt={r.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="route-info">
                  <div className="route-kicker">{String(i+1).padStart(2,'0')}</div>
                  <h3 className="route-title">{r.title}</h3>
                  <p className="route-desc">{r.description}</p>
                  <div className="route-steps-inline">
                    {r.quests.map((q, idx) => (
                      <span key={q.title+idx} className="step">
                        <i className={`dot ${q.status}`} />
                        {q.title}
                      </span>
                    ))}
                  </div>
                  <div className="route-actions">
                    <button
                      type="button"
                      className="btn video"
                      title="인스타 릴스 영상으로 보기"
                      onClick={() => goDetail('route', r.id)}
                    >▶ 영상을 통해 미리 여행해보기</button>
                  </div>
                </div>
              </article>
              {(openDetailType==='route' && openDetailId === r.id) && (
                <section id={`detail-route-${r.id}`} className="route-detail contained">
                  <div className="route-detail__inner">
                    <div className="route-detail__grid">
                      <div className="detail-media">
                        {getFirstReel('route', r.id) ? (
                          <iframe
                            src={`${getFirstReel('route', r.id).replace(/\/$/, '')}/embed`}
                            title={`${r.title} - Instagram Reel`}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                          ></iframe>
                        ) : (
                          <img
                            src={`${process.env.PUBLIC_URL || ''}/assets/images/${r.iconPath}`}
                            alt={r.title}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                      </div>
                      <div className="detail-body">
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
                    </div>
                  </div>
                </section>
              )}
            </React.Fragment>
          ))}
          {tab === 'exp' && experiences.map((exp, i) => (
            <React.Fragment key={`row-exp-${exp.id}`}>
              <article className={`route-row alt ${(openDetailType==='exp' && openDetailId === exp.id) ? 'expanded' : ''}`}>
                <div className="route-media">
                  {exp.image ? (
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div style={{width:'100%',height:'100%',background:'#eee'}} />
                  )}
                </div>
                <div className="route-info">
                  <div className="route-kicker">{String(i+1).padStart(2,'0')}</div>
                  <h3 className="route-title">{exp.title}</h3>
                  <p className="route-desc">{exp.description}</p>
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="route-tags">
                      {exp.tags.map((tag, idx) => (
                        <span key={tag+idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="route-actions">
                    <button
                      type="button"
                      className="btn video"
                      title="인스타 릴스 영상으로 보기"
                      onClick={() => goDetail('exp', exp.id)}
                    >▶ 영상을 통해 미리 여행해보기</button>
                  </div>
                </div>
              </article>
              {(openDetailType==='exp' && openDetailId === exp.id) && (
                <section id={`detail-exp-${exp.id}`} className="route-detail contained">
                  <div className="route-detail__inner">
                    <div className="route-detail__grid">
                      <div className="detail-media">
                        {instagramByType?.exp?.[exp.id]?.[0] ? (
                          <iframe
                            src={`${instagramByType.exp[exp.id][0].replace(/\/$/, '')}/embed`}
                            title={`${exp.title} - Instagram Reel`}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                          ></iframe>
                        ) : exp.detailImage ? (
                          <img
                            src={exp.detailImage}
                            alt={exp.title}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : exp.image ? (
                          <img
                            src={exp.image}
                            alt={exp.title}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div style={{width:'100%',height:'100%',background:'#eee'}} />
                        )}
                      </div>
                      <div className="detail-body">
                        <header className="route-detail__head">
                          <h2 className="rd-title">{exp.title}</h2>
                          <p className="rd-desc">{exp.description}</p>
                        </header>
                        {exp.detailList && exp.detailList.length > 0 && (
                          <ul className="rd-list">
                            {exp.detailList.map((item, idx) => (
                              <li key={item.title||idx}>
                                <span className="rd-dot" />
                                <strong>{item.title}</strong>
                                {item.subtitle && (<><span className="sep">—</span><span className="sub">{item.subtitle}</span></>)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </React.Fragment>
          ))}
          {tab === 'place' && places.map((place, i) => (
            <React.Fragment key={`row-place-${place.id}`}>
              <article className={`route-row alt ${(openDetailType==='place' && openDetailId === place.id) ? 'expanded' : ''}`}>
                <div className="route-media">
                  {place.image ? (
                    <img
                      src={place.image}
                      alt={place.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div style={{width:'100%',height:'100%',background:'#eee'}} />
                  )}
                </div>
                <div className="route-info">
                  <div className="route-kicker">{String(i+1).padStart(2,'0')}</div>
                  <h3 className="route-title">{place.title}</h3>
                  <p className="route-desc">{place.description}</p>
                  {place.tags && place.tags.length > 0 && (
                    <div className="route-tags">
                      {place.tags.map((tag, idx) => (
                        <span key={tag+idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="route-actions">
                    <button
                      type="button"
                      className="btn video"
                      title="인스타 릴스 영상으로 보기"
                      onClick={() => goDetail('place', place.id)}
                    >▶ 영상을 통해 미리 여행해보기</button>
                  </div>
                </div>
              </article>
              {(openDetailType==='place' && openDetailId === place.id) && (
                <section id={`detail-place-${place.id}`} className="route-detail contained">
                  <div className="route-detail__inner">
                    <div className="route-detail__grid">
                      <div className="detail-media">
                        {instagramByType?.place?.[place.id]?.[0] ? (
                          <iframe
                            src={`${instagramByType.place[place.id][0].replace(/\/$/, '')}/embed`}
                            title={`${place.title} - Instagram Reel`}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                          ></iframe>
                        ) : place.detailImage ? (
                          <img
                            src={place.detailImage}
                            alt={place.title}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : place.image ? (
                          <img
                            src={place.image}
                            alt={place.title}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div style={{width:'100%',height:'100%',background:'#eee'}} />
                        )}
                      </div>
                      <div className="detail-body">
                        <header className="route-detail__head">
                          <h2 className="rd-title">{place.title}</h2>
                          <p className="rd-desc">{place.description}</p>
                        </header>
                        {place.detailList && place.detailList.length > 0 && (
                          <ul className="rd-list">
                            {place.detailList.map((item, idx) => (
                              <li key={item.title||idx}>
                                <span className="rd-dot" />
                                <strong>{item.title}</strong>
                                {item.subtitle && (<><span className="sep">—</span><span className="sub">{item.subtitle}</span></>)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>


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
