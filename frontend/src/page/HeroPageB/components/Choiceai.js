import React from 'react'

function Choiceai() {
    return (
        <div>
            {/* AI 보조: 후순위 & 베타 표기 */}
            <section id="ai-planner" className="landing-section ai glass">
                <div className="landing-section__head reveal-on-scroll">
                    <h2>AI 보조 설계 (Beta)</h2>
                    <p>AI는 보조 도구입니다. 먼저 추천 루트를 선택한 뒤, 키워드/일정으로 미세 조정하세요. (개발 진행 중)</p>
                </div>
                <form className="ai-form" onSubmit={(e) => { e.preventDefault(); alert('Beta: AI 추천은 준비중이에요. 우선 추천 루트를 선택해 보세요.'); }}>
                    <label className="ai-label">관심 키워드</label>
                    <input className="ai-input" type="text" placeholder="예: 역사, 사찰, 굿즈, 꽃구경" />
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
        </div>
    )
}

export default Choiceai
