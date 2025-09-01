import React, { useState } from 'react'
import './HeroPageB.css'
import routesData from '../../data/route.json'
import place from '../../data/place.json'
import experience from '../../data/experience.json'
import Choiceai from './components/Choiceai'

// Reusable grid card for spots / cafes / exps
function ContentCard({ section, item, pub, onOpen }){
  if (!item) return null;
  return (
    <article className="route-static-card" data-section={section} data-id={item.id}>
      <div className="rsc-thumb">
        {item.image ? (
          <img src={pub(item.image)} alt={item.title} loading="lazy" decoding="async" />
        ) : (
          <div style={{width:'100%',height:'200px',background:'#111'}} />
        )}
      </div>
      <div className="rsc-body">
        <h3 className="rsc-title">{item.title}</h3>
        {item.description && (<p className="rsc-desc">{item.description}</p>)}
        {Array.isArray(item.tags) && item.tags.length > 0 && (
          <div className="rsc-chips">
            {item.tags.slice(0,3).map((tag, idx) => (
              <span key={tag+idx} className="rsc-chip">{tag}</span>
            ))}
            {item.tags.length > 3 && <span className="rsc-chip more">+{item.tags.length-3}</span>}
          </div>
        )}
      </div>
      <div className="rsc-footer">
        <button className="btn primary" type="button" style={{width:"100%"}} onClick={() => onOpen(section, item.id)}>자세히 보기</button>
      </div>
    </article>
  );
}

// Route detail with sub-tabs (overview | spots | experiences | cafes)
function RouteDetailPanel({ route: r, places, experiences, pickReel, pub }) {
  const [subTab, setSubTab] = React.useState('overview');

  // ID lists supported: spots/spotIds, exps/experiences, cafes/cafeIds
  const spotIds = r.spots || r.spotIds || [];
  const expIds = r.exps || r.experiences || [];
  const cafeIds = r.cafes || r.cafeIds || [];

  const spots = Array.isArray(spotIds) ? spotIds.map(id => (places || []).find(p => p.id === id)).filter(Boolean) : [];
  const exps  = Array.isArray(expIds)  ? expIds.map(id => (experiences || []).find(e => e.id === id)).filter(Boolean) : [];
  const cafes = Array.isArray(cafeIds) ? cafeIds.map(id => (places || []).find(p => p.id === id)).filter(Boolean) : [];

  // Fallbacks: if mapping arrays are empty, we keep UI but show a gentle notice
  const hasSpots = spots.length > 0;
  const hasExps  = exps.length > 0;
  const hasCafes = cafes.length > 0;

  return (
    <div className="route-detail__inner">
      <div className="route-detail__grid">
        <div className="detail-media">
          {(() => {
            const reel = (r && r.reels) ? (Array.isArray(r.reels) && r.reels.length > 0 ? r.reels[0]?.url || r.reels[0] : null) : null;
            const picked = reel || null;
            if (picked) {
              return (
                <iframe
                  src={`${String(picked).replace(/\/$/, '')}/embed`}
                  title={`${r.title} - Instagram Reel`}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              );
            }
            return (
              <img
                src={pub(`${process.env.PUBLIC_URL || ''}/assets/images/${r.iconPath}`)}
                alt={r.title}
                loading="lazy"
                decoding="async"
              />
            );
          })()}
        </div>

        <div className="detail-body">
          <header className="route-detail__head">
            <h2 className="rd-title">{r.title}</h2>
            <p className="rd-desc">{r.description}</p>
          </header>

          <div className="subtabs">
            <button type="button" className={`subtab-btn ${subTab==='overview' ? 'on':''}`} onClick={() => setSubTab('overview')}>개요</button>
            <button type="button" className={`subtab-btn ${subTab==='spots' ? 'on':''}`} onClick={() => setSubTab('spots')}>관광지</button>
            <button type="button" className={`subtab-btn ${subTab==='exps' ? 'on':''}`} onClick={() => setSubTab('exps')}>체험</button>
            <button type="button" className={`subtab-btn ${subTab==='cafes' ? 'on':''}`} onClick={() => setSubTab('cafes')}>카페·식당</button>
          </div>

          {subTab === 'overview' && (
            <ul className="rd-list">
              {(r.quests || []).map((q) => (
                <li key={q.title}>
                  <span className={`rd-dot ${q.status}`} />
                  <strong>{q.title}</strong>
                  <span className="sep">—</span>
                  <span className="sub">{q.subtitle}</span>
                </li>
              ))}
            </ul>
          )}

          {subTab === 'spots' && (
            <div className="mini-list">
              {hasSpots ? spots.map((p) => (
                <article key={p.id} className="mini-item">
                  <div className="mini-thumb">
                    {p.image ? <img src={pub(p.image)} alt={p.title} loading="lazy" decoding="async"/> : <div className="mini-ph"/>}
                  </div>
                  <div className="mini-body">
                    <h4 className="mini-title">{p.title}</h4>
                    {p.description && (<p className="mini-desc">{p.description}</p>)}
                    {Array.isArray(p.tags) && p.tags.length > 0 && (
                      <div className="mini-tags">{p.tags.map((t, idx) => <span key={t+idx} className="mini-tag">{t}</span>)}</div>
                    )}
                  </div>
                </article>
              )) : <p className="mini-empty">연결된 관광지 데이터가 아직 없어요.</p>}
            </div>
          )}

          {subTab === 'exps' && (
            <div className="mini-list">
              {hasExps ? exps.map((e) => (
                <article key={e.id} className="mini-item">
                  <div className="mini-thumb">
                    {e.image ? <img src={pub(e.image)} alt={e.title} loading="lazy" decoding="async"/> : <div className="mini-ph"/>}
                  </div>
                  <div className="mini-body">
                    <h4 className="mini-title">{e.title}</h4>
                    {e.description && (<p className="mini-desc">{e.description}</p>)}
                    {Array.isArray(e.tags) && e.tags.length > 0 && (
                      <div className="mini-tags">{e.tags.map((t, idx) => <span key={t+idx} className="mini-tag">{t}</span>)}</div>
                    )}
                  </div>
                </article>
              )) : <p className="mini-empty">연결된 체험 프로그램 데이터가 아직 없어요.</p>}
            </div>
          )}

          {subTab === 'cafes' && (
            <div className="mini-list">
              {hasCafes ? cafes.map((c) => (
                <article key={c.id} className="mini-item">
                  <div className="mini-thumb">
                    {c.image ? <img src={pub(c.image)} alt={c.title} loading="lazy" decoding="async"/> : <div className="mini-ph"/>}
                  </div>
                  <div className="mini-body">
                    <h4 className="mini-title">{c.title}</h4>
                    {c.description && (<p className="mini-desc">{c.description}</p>)}
                    {Array.isArray(c.tags) && c.tags.length > 0 && (
                      <div className="mini-tags">{c.tags.map((t, idx) => <span key={t+idx} className="mini-tag">{t}</span>)}</div>
                    )}
                  </div>
                </article>
              )) : <p className="mini-empty">연결된 카페·식당 데이터가 아직 없어요.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroPageB({ tourismRoutes = routesData, experiences = experience, places = place, onSelectRoute, instagramReels = [], youtubeMap = {}, instagramByType = { route:{}, exp:{}, place:{} } }) {

  const [openDetailType, setOpenDetailType] = React.useState(null);
  const [openDetailId, setOpenDetailId] = React.useState(null);

  // Global section filter: 'spots' | 'cafes' | 'exps'
  const [sectionFilter, setSectionFilter] = useState('spots'); // 'spots' | 'cafes' | 'exps'

  // ---- fullpane state ----
  const [fullOpen, setFullOpen] = useState(null);
  const [fullClosing, setFullClosing] = useState(false);

  const openFull = (section, id) => {
    setFullClosing(false);
    setFullOpen({ section, id });
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };
  const closeFull = () => {
    setFullClosing(true);
    setTimeout(() => {
      const section = fullOpen?.section;
      setFullOpen(null);
      setFullClosing(false);
      if (section) {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  };

  // --- asset & reel helpers ---
  const pub = (p) => {
    if (!p) return p;
    // If path starts with '/assets', prefix PUBLIC_URL for GH Pages project path compatibility
    if (typeof p === 'string' && p.startsWith('/assets/')) {
      return `${process.env.PUBLIC_URL || ''}${p}`;
    }
    return p;
  };
  const pickReel = (objReels, type, id) => {
    const fromObj = Array.isArray(objReels) && objReels.length > 0 ? objReels[0]?.url || objReels[0] : null;
    if (fromObj) return fromObj;
    const fromMap = instagramByType?.[type]?.[id]?.[0] || null;
    if (fromMap) return fromMap;
    // legacy route id substring fallback only for route
    if (type === 'route') {
      const hit = (instagramReels || []).find((url) => typeof url === 'string' && url.includes(id));
      return hit || null;
    }
    return null;
  };

  // --- derive spots (관광지) from routes and split cafes (non-spot places) ---
  const spotIdSet = React.useMemo(() => {
    const s = new Set();
    (tourismRoutes || []).forEach((r) => {
      const spotIds = r.spots || r.spotIds || [];
      if (Array.isArray(spotIds)) spotIds.forEach(id => id && s.add(id));
    });
    return s;
  }, [tourismRoutes]);

  const spotsFromRoutes = React.useMemo(() => {
    const byId = new Map((places || []).map(p => [p.id, p]));
    return Array.from(spotIdSet).map(id => byId.get(id)).filter(Boolean);
  }, [places, spotIdSet]);

  const cafesOnly = React.useMemo(() => {
    // fallback: all places that are not part of spotsFromRoutes
    const set = spotIdSet;
    return (places || []).filter(p => !set.has(p.id));
  }, [places, spotIdSet]);



  const goDetail = (type, id) => {
    setOpenDetailType(type);
    setOpenDetailId(id);
    setTimeout(() => {
      const el = document.getElementById(`detail-${type}-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <div className={`landing-root theme-neon`}>
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

      {/* TOP: 추천 루트 — Story Mode (full-bleed slides) */}
      <section id="routes" className="landing-section story-mode">
        <div className="landing-section__head">
          <h2>추천 루트</h2>
        </div>

        <div className="story-viewport">
          {tourismRoutes.map((r) => (
            <article key={`story-${r.id}`} className="story-slide" style={{backgroundImage: `url(${pub(`${process.env.PUBLIC_URL || ''}/assets/images/${r.iconPath}`)})`}}>
              {/* Optional: if a reel exists, render it as an absolutely positioned video background */}
              {(() => {
                const reel = pickReel(r.reels, 'route', r.id);
                if (!reel) return null;
                return (
                  <iframe
                    className="story-img"
                    src={`${String(reel).replace(/\/$/, '')}/embed`}
                    title={`${r.title} - Instagram Reel`}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                );
              })()}

              <div className="story-overlay">
                <span className="story-tag">키워드 루트</span>
                <h3 className="story-title">{r.title}</h3>
                <p className="story-desc">{r.description}</p>
                {Array.isArray(r.quests) && r.quests.length > 0 && (
                  <div className="story-steps">
                    {r.quests.slice(0,4).map((q, idx) => (
                      <span key={q.title+idx} className="story-chip"><i className={`dot ${q.status}`}></i>{q.title}</span>
                    ))}
                    {r.quests.length > 4 && (<span className="story-chip more">+{r.quests.length - 4} more</span>)}
                  </div>
                )}
                <div className="story-cta">
                  <button type="button" className="btn primary" style={{width:"100%"}} onClick={() => goDetail('route', r.id)}>자세히 보기</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Active route detail shown below story slides */}
        {(openDetailType==='route') && (
          <section id={`detail-route-${openDetailId}`} className="route-detail contained">
            {(() => {
              const r = tourismRoutes.find(x => x.id === openDetailId);
              if (!r) return null;
              return (
                <RouteDetailPanel
                  route={r}
                  places={places}
                  experiences={experiences}
                  pickReel={pickReel}
                  pub={pub}
                />
              );
            })()}
          </section>
        )}
      </section>

      {/* GLOBAL FILTER: 관광지 | 카페·식당 | 체험프로그램 */}
      <section className="landing-section" id="browse">
        <div className="landing-section__head">
          <h2>둘러보기</h2>
          <div className="content-tabs">
            <button type="button" className={`tab-btn ${sectionFilter==='spots'?'on':''}`} onClick={()=>setSectionFilter('spots')}>관광지</button>
            <button type="button" className={`tab-btn ${sectionFilter==='cafes'?'on':''}`} onClick={()=>setSectionFilter('cafes')}>카페·식당</button>
            <button type="button" className={`tab-btn ${sectionFilter==='exps'?'on':''}`} onClick={()=>setSectionFilter('exps')}>체험프로그램</button>
          </div>
        </div>
      </section>

      {/* MIDDLE: 관광지 (routes에 연결된 spot들) */}
      {sectionFilter==='spots' && (
      <section id="spots" className="landing-section">
        <div className="landing-section__head">
          <h2>관광지</h2>
          <p>추천 루트에 연결된 포토스팟/명소들</p>
        </div>
        {fullOpen?.section === 'spots' ? (
          (() => {
            const spot = spotsFromRoutes.find(p => p.id === fullOpen.id);
            if (!spot) return null;
            const reel = pickReel(spot.reels, 'place', spot.id);
            return (
              <div className={`fullpane ${fullClosing?'closing':'on'}`}>
                <div className="fp-media">
                  {reel ? (
                    <iframe
                      src={`${String(reel).replace(/\/$/, '')}/embed`}
                      title={`${spot.title} - Instagram Reel`}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    spot.detailImage ? (
                      <img src={pub(spot.detailImage)} alt={spot.title} />
                    ) : (
                      spot.image ? <img src={pub(spot.image)} alt={spot.title} /> : <div style={{width:'100%',height:'100%',background:'#111'}}/>
                    )
                  )}
                </div>
                <div className="fp-body">
                  <h3 className="fp-title">{spot.title}</h3>
                  {spot.description && (<p className="fp-desc">{spot.description}</p>)}

                  {Array.isArray(spot.tags) && spot.tags.length > 0 && (
                    <div className="fp-chips">
                      {spot.tags.map((t, idx) => <span key={t+idx} className="rsc-chip">{t}</span>)}
                    </div>
                  )}

                  {Array.isArray(spot.detailList) && spot.detailList.length > 0 && (
                    <ul className="rd-list">
                      {spot.detailList.map((item, idx) => (
                        <li key={item.title||idx}>
                          <span className="rd-dot" />
                          <strong>{item.title}</strong>
                          {item.subtitle && (<><span className="sep">—</span><span className="sub">{item.subtitle}</span></>)}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="fp-actions">
                    {reel && (
                      <a className="btn" href={reel} target="_blank" rel="noreferrer">인스타에서 보기</a>
                    )}
                    <button type="button" className="btn primary" onClick={closeFull}>닫기</button>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="routes-static-grid">
            {spotsFromRoutes.map((spot)=> (
              <ContentCard key={spot.id} section="spots" item={spot} pub={pub} onOpen={openFull} />
            ))}
          </div>
        )}
      </section>
      )}

      {/* LOWER: 카페 · 식당 (루트 외 장소들) */}
      {sectionFilter==='cafes' && (
      <section id="cafes" className="landing-section">
        <div className="landing-section__head">
          <h2>카페 · 식당</h2>
        </div>
        {fullOpen?.section === 'cafes' ? (
          (() => {
            const place = cafesOnly.find(p => p.id === fullOpen.id);
            if (!place) return null;
            const reel = pickReel(place.reels, 'place', place.id);
            return (
              <div className={`fullpane ${fullClosing?'closing':'on'}`}>
                <div className="fp-media">
                  {reel ? (
                    <iframe
                      src={`${String(reel).replace(/\/$/, '')}/embed`}
                      title={`${place.title} - Instagram Reel`}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    place.detailImage ? (
                      <img src={pub(place.detailImage)} alt={place.title} />
                    ) : (
                      place.image ? <img src={pub(place.image)} alt={place.title} /> : <div style={{width:'100%',height:'100%',background:'#111'}}/>
                    )
                  )}
                </div>
                <div className="fp-body">
                  <h3 className="fp-title">{place.title}</h3>
                  {place.description && (<p className="fp-desc">{place.description}</p>)}

                  {Array.isArray(place.tags) && place.tags.length > 0 && (
                    <div className="fp-chips">
                      {place.tags.map((t, idx) => <span key={t+idx} className="rsc-chip">{t}</span>)}
                    </div>
                  )}

                  {Array.isArray(place.detailList) && place.detailList.length > 0 && (
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

                  <div className="fp-actions">
                    {reel && (
                      <a className="btn" href={reel} target="_blank" rel="noreferrer">인스타에서 보기</a>
                    )}
                    <button type="button" className="btn primary" onClick={closeFull}>닫기</button>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="routes-static-grid">
            {cafesOnly.map((place)=> (
              <ContentCard key={place.id} section="cafes" item={place} pub={pub} onOpen={openFull} />
            ))}
          </div>
        )}
      </section>
      )}

      {/* BOTTOM: 체험 프로그램 */}
      {sectionFilter==='exps' && (
      <section id="experiences" className="landing-section">
        <div className="landing-section__head">
          <h2>체험 프로그램</h2>
        </div>
        {fullOpen?.section === 'exps' ? (
          (() => {
            const exp = experiences.find(e => e.id === fullOpen.id);
            if (!exp) return null;
            const reel = pickReel(exp.reels, 'exp', exp.id);
            return (
              <div className={`fullpane ${fullClosing?'closing':'on'}`}>
                <div className="fp-media">
                  {reel ? (
                    <iframe
                      src={`${String(reel).replace(/\/$/, '')}/embed`}
                      title={`${exp.title} - Instagram Reel`}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    exp.detailImage ? (
                      <img src={pub(exp.detailImage)} alt={exp.title} />
                    ) : (
                      exp.image ? <img src={pub(exp.image)} alt={exp.title} /> : <div style={{width:'100%',height:'100%',background:'#111'}}/>
                    )
                  )}
                </div>
                <div className="fp-body">
                  <h3 className="fp-title">{exp.title}</h3>
                  {exp.description && (<p className="fp-desc">{exp.description}</p>)}

                  {Array.isArray(exp.tags) && exp.tags.length > 0 && (
                    <div className="fp-chips">
                      {exp.tags.map((t, idx) => <span key={t+idx} className="rsc-chip">{t}</span>)}
                    </div>
                  )}

                  {Array.isArray(exp.detailList) && exp.detailList.length > 0 && (
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

                  <div className="fp-actions">
                    {reel && (
                      <a className="btn" href={reel} target="_blank" rel="noreferrer">인스타에서 보기</a>
                    )}
                    <button type="button" className="btn primary" onClick={closeFull}>닫기</button>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="routes-static-grid">
            {experiences.map((exp)=> (
              <ContentCard key={exp.id} section="exps" item={exp} pub={pub} onOpen={openFull} />
            ))}
          </div>
        )}
      </section>
      )}

      <Choiceai />

      <footer className="landing-footer">
        <p>© 2025 Uiseong Tourism. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HeroPageB
