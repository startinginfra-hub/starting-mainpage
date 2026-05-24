// Landing page sections

function Nav({ onToggleTheme, dark }) {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#" className="nav-logo" aria-label="Starting">
          <StartingLogo height={22} />
        </a>
        <div className="nav-links">
          <a href="#features">특징</a>
          <a href="#process">Ai Agent</a>
          <a href="#pricing">요금</a>
          <a href="#faq">FAQ</a>
          <a href="https://blog.starting.kr/starting/ko" target="_blank" rel="noopener noreferrer">블로그</a>
        </div>
        <div className="nav-cta">
          <button className="btn btn-soft sm" onClick={onToggleTheme} aria-label="테마 전환">
            <Icon name={dark ? "sun" : "moon"} size={15} />
          </button>
          <a className="btn btn-ghost sm" href="#login">로그인</a>
        </div>
      </div>
    </nav>);

}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="wrap hero-inner">
        <span className="eyebrow">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)" }} />
          국내 누적 인재 100,000명+
        </span>
        <h1 className="hero-headline">
          공고 플랫폼을 대체하는<br />
          <span className="accent">Ai Agent 헤드헌팅 솔루션</span>
        </h1>
        <p className="hero-sub">매칭 신청부터 후보자 매칭까지, 모든 과정을 효율적으로

        </p>
        <div className="hero-cta">
          <a className="btn btn-primary lg" href="#start">
            인재 매칭받아보기
            <Icon name="arrow-right" size={16} className="arrow" />
          </a>
          <a className="btn btn-ghost lg" href="#" data-channel-action="open">문의하기</a>
        </div>
        <div className="hero-meta">
          <span>사전 결제 없이 시작</span>
          <span className="dot" />
          <span>유료직업소개사업 정식 허가</span>
          <span className="dot" />
          <span>채용 확정 시 결제</span>
        </div>

        <div className="hero-funnel-wrap">
          <HeroFunnel />
        </div>
      </div>
    </section>);

}

function Logos() {
  const logos = [
  { src: "logos/secuwow.png", alt: "SECUWOW" },
  { src: "logos/wavbor.png", alt: "Wavbor" },
  { src: "logos/ponbi.png", alt: "폰비" },
  { src: "logos/parity.png", alt: "parity" },
  { src: "logos/easy.png", alt: "easy" },
  { src: "logos/gpters.png", alt: "GPTers" },
  { src: "logos/wishes.png", alt: "Wishes" },
  { src: "logos/thera.png", alt: "씨테라수면연구소" },
  { src: "logos/graygo.png", alt: "GRAYGO" },
  { src: "logos/onulhunnam.png", alt: "오늘훈남" },
  { src: "logos/acrossb.png", alt: "acrossB" },
  { src: "logos/terracle.png", alt: "Terracle" },
  { src: "logos/pia.png", alt: "PIA" },
  { src: "logos/hgrs.png", alt: "해그로시" }];

  return (
    <section className="logos">
      <div className="wrap">
        <div className="logos-label">Seed부터 Series 기업까지, 성장하는 기업이 스타팅을 선택해요</div>
        <div className="logos-grid">
          {logos.map((l) =>
          <div key={l.src} className="logo-pill">
              <img src={l.src} alt={l.alt} loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Comparison() {
  const cards = [
  {
    type: "normal",
    tag: "공고형 플랫폼",
    fee: "플랫폼 수수료 7%",
    title: "직접 채용",
    steps: ["공고 게시", "다수 지원자 유입", "미충족 인재 서류 검토 반복"],
    footer: "모든 과정을 직접하고 수수료 지불\n시간, 비용 비효율 끝판왕"
  },
  {
    type: "featured",
    tag: "스타팅",
    fee: "정찰제 300만 원",
    title: "AI Agent 헤드헌팅 솔루션",
    steps: ["상세 매칭 조건 입력", "직군 키워드 + 그외 조건 필터", "핏한 소수 인재 매칭"],
    footer: "연봉 관계 없는 정찰제\n플랫폼 수준의 비용으로 전문 헤드헌팅 퍼포먼스"
  },
  {
    type: "normal",
    tag: "타사 헤드헌팅",
    fee: "계약 연봉의 15 ~ 22%",
    title: "채용 대행",
    steps: ["포지션 의뢰", "기본 조건 기반 소싱", "소수 인재 매칭"],
    footer: "계약 연봉에 따른 수수료\n고연봉 포지션일수록 수수료 부담이 커집니다"
  }];


  return (
    <section className="compare-section" id="compare">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><Icon name="target" size={13} /> 합리적인 스타팅</span>
          <h2 className="section-title compare-title">헤드헌팅 솔루션은 무엇이 다른가요?</h2>
          <p className="section-sub">공고형 플랫폼, 타사 헤드헌팅과 어떻게 다른지 한눈에 비교해봤어요. 


          </p>
        </div>
        <div className="compare-grid">
          {cards.map((c, i) => <Reveal key={i} delay={i * 120}
          className={`compare-card ${c.type === "featured" ? "is-featured" : ""}`}>
            
              <div className="compare-tag">{c.tag}</div>
              <div className="compare-fee">{c.fee}</div>
              <h3 className="compare-card-title">{c.title}</h3>
              <div className="compare-flow-label">핵심 흐름</div>
              <ol className="compare-flow">
                {c.steps.map((s, j) =>
              <li key={j}>
                    <span className="compare-step-num">{j + 1}</span>
                    <span>{s}</span>
                  </li>
              )}
              </ol>
              <div className="compare-divider" />
              <p className="compare-footer">{c.footer}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

function ProductPreview() {
  return (
    <section id="product" className="product-preview">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><Icon name="chart" size={13} /> 제품 미리보기</span>
          <h2 className="section-title">
            공고별 매칭 현황,<br />
            한 화면에서 관리해요
          </h2>
        </div>
        <Reveal y={24}>
          <ProductUI />
        </Reveal>
      </div>
    </section>);

}

function Stats() {
  const stats = [
  { numValue: 100000, fmt: (n) => n.toLocaleString(), suffix: "+", label: "즉시 매칭 가능한 인재", bar: 100, sub: "검증된 인재 풀" },
  { numValue: 90, fmt: (n) => n.toString(), suffix: "%", label: "3개월 이상 재직률", bar: 90, sub: "Fit한 매칭의 결과" },
  { numValue: 67, fmt: (n) => n.toString(), suffix: "%", label: "평균 서류 합격률", bar: 67, sub: "업계 평균의 4배" }];

  return (
    <section className="stats-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><Icon name="chart" size={13} /> 숫자로 보는 스타팅</span>
          <h2 className="section-title">
            이유 있는 선택,<br />
            데이터로 증명해요
          </h2>
          <p className="section-sub">
            잘 맞는 인재를 빠르게, 부담은 적게. 스타팅이 만드는 변화예요.
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((s, i) =>
          <Reveal key={i} delay={i * 120} className="stat-card">
              <div className="stat-num">
                <CountNum to={s.numValue} format={s.fmt} duration={1600 + i * 200} />
                <span className="plus">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-bar"><GrowBar to={s.bar} className="stat-bar-fill" duration={1500} delay={300 + i * 120} /></div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 10 }}>{s.sub}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

function Features() {
  return (
    <section id="features">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><Icon name="spark" size={13} /> 특장점</span>
          <h2 className="section-title">
            헤드헌팅의 그 이상의 정교함을<br />
            플랫폼 보다 저렴하게
          </h2>
          <p className="section-sub">스타팅이 다른 헤드헌팅 서비스와 다른 4가지 이유.</p>
        </div>
        <div className="features-grid">
          <Reveal className="feature-card f1" delay={0}>
            <div className="feature-icon"><Icon name="filter" size={20} /></div>
            <h3 className="feature-title">정확히 필터링된 인재만 추천</h3>
            <p className="feature-desc">JD, 직군 별 개인화 키워드, 기타 필수 조건, 등
다양한 조건을 분석해서 핏(Fit)이 맞는 후보자만 골라 매칭해요.
모든 지원자를 절대 그대로 떠넘기지 않아요.
            </p>
            <div className="visual">
              <div className="fv-pool fv-pool--cards">
                {Array.from({ length: 24 }).map((_, i) => {
                  const matchIdx = [3, 9, 14, 17, 20].indexOf(i);
                  const isMatch = matchIdx !== -1;
                  return (
                    <Reveal
                      as="div"
                      key={i}
                      delay={isMatch ? 600 + matchIdx * 110 : i * 20}
                      y={6}
                      className={`fn-card ${isMatch ? "is-bright" : ""}`}>
                      <ProfileIcon />
                    </Reveal>);

                })}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span>지원자 풀 (24명)</span>
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>매칭 후보 5명</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="feature-card f2" delay={120}>
            <div className="feature-icon"><Icon name="spark" size={20} /></div>
            <h3 className="feature-title">AI Agent 기능 지원</h3>
            <p className="feature-desc" style={{ whiteSpace: "pre-line", letterSpacing: "-0.2px" }}>
              {"매칭신청부터, 키워드 설정, 인재를 만나보기까지\n전부 서포트해요"}
            </p>
            <div className="visual fv-ai">
              <div className="fv-ai-head">
                <div className="fv-ai-av" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className="fv-ai-name">Starting AI</div>
                <span className="fv-ai-tag">Agent</span>
              </div>
              <ul className="fv-ai-steps">
                <li>
                  <span className="fv-ai-check"><Icon name="check" size={11} /></span>
                  매칭조건 & 공고내용 검토 및 수정 제안
                </li>
                <li>
                  <span className="fv-ai-check"><Icon name="check" size={11} /></span>
                  직군별 개인화 키워드 제공
                </li>
                <li>
                  <span className="fv-ai-check"><Icon name="check" size={11} /></span>
                  조건 기준 인재 분석 리포트 생성
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="feature-card f3" delay={200}>
            <div className="feature-icon"><Icon name="target" size={20} /></div>
            <h3 className="feature-title">정찰제 가격</h3>
            <p className="feature-desc" style={{ whiteSpace: "pre-line" }}>
              {"연봉 5,000만 원 인재 기준,\n약 450만 원을 절감할 수 있어요!"}
            </p>
            <div className="visual">
              <div className="fv-price">
                <span className="fv-price-strike">750만</span>
                <span className="fv-price-now">300만 원</span>
                <span className="fv-price-tag">최대 60% ↓</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="feature-card f4" delay={280}>
            <div className="feature-icon"><Icon name="shield" size={20} /></div>
            <h3 className="feature-title">담당 헤드헌터 배정</h3>
            <p className="feature-desc" style={{ whiteSpace: "pre-line" }}>
              {"채용 전략, 조건 설정 등 고민이 생길 때\n함께 논의할 수 있는 파트너가 생겨요."}
            </p>
            <div className="visual fv-hh">
              <div className="fv-hh-shake" aria-hidden="true">
                <svg viewBox="0 0 64 64" width="34" height="34">
                  <defs>
                    <linearGradient id="hhPh" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--brand-300)" />
                      <stop offset="100%" stopColor="var(--brand-600)" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#hhPh)"
                    d="M22.5 8.5c2 0 3.7 1.3 4.3 3.3l2.2 7.2a4.5 4.5 0 0 1-1.2 4.5l-3.6 3.6c2.7 5.6 7.5 10.4 13.1 13.1l3.6-3.6a4.5 4.5 0 0 1 4.5-1.2l7.2 2.2c2 .6 3.3 2.3 3.3 4.3v7c0 2.5-2 4.6-4.5 4.6C28 53.5 10.5 36 10.5 14c0-2.5 2-4.5 4.5-4.5h7.5z" />
                  
                </svg>
              </div>
              <div className="fv-hh-status">
                <span className="fv-hh-dot" />
                Online
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>);
}

function Process() {
  return (
    <section id="process" className="process-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><Icon name="bolt" size={13} /> 매칭 순서</span>
          <h2 className="section-title">효율을 향상시키는 AI Agent</h2>
          <p className="section-sub">공고작성, 인재검토 등 AI가 서포트해요</p>
        </div>
        <div className="process-list">
          <Reveal className="process-row" y={24}>
            <div className="process-text">
              <span className="process-step">Agent 01</span>
              <h3 className="process-title">직군별 개인화 키워드 추출</h3>
              <p className="process-desc" style={{ whiteSpace: "pre-line" }}>
                {"공고 내용을 분석해 직군별 핵심 키워드를 자동으로 뽑아드려요.\n이후 "}
                <b style={{ color: "var(--text)" }}>인재가 직접 경험 유무를 선택</b>하기 때문에,
                {"\n지원자의 실제 역량을 보다 정확하게 파악할 수 있어요."}
              </p>
            </div>
            <div className="process-vis">
              <FilterCard />
            </div>
          </Reveal>

          <Reveal className="process-row reverse" y={24}>
            <div className="process-text">
              <span className="process-step">Agent 02</span>
              <h3 className="process-title">매칭조건 AI 스크리닝</h3>
              <p className="process-desc" style={{ whiteSpace: "pre-line" }}>
                직군과 경력 기준으로 적절하게
                <b style={{ color: "var(--text)" }}> 주요업무, 자격요건, 우대사항
                </b>{"해드려요.\n놓치기 쉬운 부분을 AI가 함께 챙겨요."}
              </p>
            </div>
            <div className="process-vis">
              <ScreeningCard />
            </div>
          </Reveal>

          <Reveal className="process-row" y={24}>
            <div className="process-text">
              <span className="process-step">Agent 03</span>
              <h3 className="process-title">공고 자동 생성</h3>
              <p className="process-desc" style={{ whiteSpace: "pre-line" }}>
                확정된 조건과 키워드로 <b style={{ color: "var(--text)" }}>공고를 자동으로 생성</b>{"해드려요.\n바로 게시할 수 있는 완성도, 다듬는 시간을 크게 절약해요."}
              </p>
            </div>
            <div className="process-vis">
              <JobPostCard />
            </div>
          </Reveal>

          <Reveal className="process-row reverse" y={24}>
            <div className="process-text">
              <span className="process-step">Agent 04</span>
              <h3 className="process-title">조건 분석 상세 매칭 리포트 발행</h3>
              <p className="process-desc" style={{ whiteSpace: "pre-line" }}>
                지원자별로 <b style={{ color: "var(--text)" }}>키워드 분석·조건별 적합도</b>{"를 분석한\n상세 매칭 리포트를 발행해드려요.\n빠르고 정확하게 의사결정 할 수 있어요."}
              </p>
            </div>
            <div className="process-vis">
              <ReportCard />
            </div>
          </Reveal>
        </div>
      </div>
    </section>);
}

function Testimonials() {
  const items = [
  {
    logo: "logos/pia.png",
    cover: "linear-gradient(135deg, #cfd7df 0%, #eef1f6 60%, #d5dde5 100%)",
    quote: "채용에 들어가는 시간\n획기적으로 줄일 수 있었어요",
    role: "피아스페이스 COO",
    href: "https://blog.starting.kr/ko/articles/%ED%94%BC%EC%95%84%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4-AI-%EC%98%81%EC%83%81%EB%B6%84%EC%84%9D-%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85-%EB%B0%98%EB%B3%B5%EB%90%98%EB%8A%94-%EC%B1%84%EC%9A%A9-%EB%B9%84%ED%9A%A8%EC%9C%A8-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-9f7fcf24"
  },
  {
    logo: "logos/toktokhan.png",
    cover: "linear-gradient(135deg, #d4dde6 0%, #eef2f7 50%, #c9d4df 100%)",
    quote: "매칭 리포트를 통해\n인재 정보를 한눈에 볼 수 있어서\n시간 단축에 큰 도움이 되었어요.",
    role: "똑똑한 개발자 HR 담당자",
    href: "https://blog.starting.kr/ko/articles/%EB%98%91%EB%98%91%ED%95%9C%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B8%EC%82%AC%EB%A7%A4%EB%8B%88%EC%A0%80%EA%B0%80-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A5%BC-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9C%BC%EB%A1%9C-%EB%BD%91%EB%8A%94-%EB%B0%A9%EB%B2%95-906f7bb1"
  },
  {
    brand: "CAREER",
    brandAccent: <span style={{ color: "#FF2E2E" }}>ABLE</span>,
    brandStyle: { fontFamily: "Inter, sans-serif", fontWeight: 800, color: "#111", fontSize: 24, letterSpacing: "-0.02em" },
    cover: "linear-gradient(135deg, #e1e6ec 0%, #f0f3f7 100%)",
    quote: "원하는 기준을 충분히 갖춘\n인재 중에서 고를 수 있었어요",
    role: "커리어블 CEO",
    href: "https://blog.starting.kr/ko/articles/%EC%BB%A4%EB%A6%AC%EC%96%B4%EB%B8%94-%EC%B2%AD%EC%B0%BD%EC%82%AC-%EC%B6%9C%EC%8B%A0-%EC%97%90%EB%93%80%ED%85%8C%ED%81%AC-%EA%B8%B0%EC%97%85-%EC%B4%88%EA%B8%B0-%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85%EC%97%90-%EB%A7%9E%EB%8A%94-%EC%9D%B8%EC%9E%AC-%ED%99%95%EB%B3%B4-%EB%B0%A9%EB%B2%95-702b2821"
  },
  {
    logo: "logos/acrossb.png",
    cover: "linear-gradient(135deg, #dde4ee 0%, #f1f4f8 100%)",
    quote: "채용 매니저분이 밀착해서\n관리해주셔서 정말 마음에 들어요\n이정도면 사내 인사팀 아닌가요?!",
    role: "어크로스비 HR 담당자",
    href: "https://blog.starting.kr/ko/articles/%EC%96%B4%ED%81%AC%EB%A1%9C%EC%8A%A4%EB%B9%84-%EA%B8%80%EB%A1%9C%EB%B2%8C-SCM-Tech-%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85-%EB%B9%A0%EB%A5%B4%EA%B3%A0-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EC%B1%84%EC%9A%A9%EC%9D%98-%EB%B9%84%EA%B2%B0-b9c9e726"
  },
  {
    logo: "logos/hgrs.png",
    cover: "linear-gradient(135deg, #d3dce6 0%, #eaf0f6 100%)",
    quote: "지금 바로 필요한\n인재를 신속하게\n채용할 수 있었어요",
    role: "해그로시 CEO",
    href: "https://blog.starting.kr/ko/articles/%ED%95%B4%EA%B7%B8%EB%A1%9C%EC%8B%9C-%EB%B8%8C%EB%9E%9C%EB%94%A9-%EC%A0%84%EB%AC%B8-%EA%B8%B0%EC%97%85%EC%9D%98-%EB%B9%A0%EB%A5%B4%EA%B3%A0-%EC%9C%A0%EC%97%B0%ED%95%9C-%EC%B1%84%EC%9A%A9-%EC%A0%84%EB%9E%B5-dadad2a0"
  },
  {
    logo: "logos/onulhunnam.png",
    cover: "linear-gradient(135deg, #f1d8c2 0%, #f9e7d6 100%)",
    quote: "채용 과정이\n효율적으로 바뀌었어요",
    role: "오늘훈남 CEO",
    href: "https://blog.starting.kr/ko/articles/%EC%98%A4%EB%8A%98%ED%9B%88%EB%82%A8-%EB%82%A8%EC%84%B1-%EB%B7%B0%ED%8B%B0%EA%B8%B0%EC%97%85%EC%9D%B4-%EB%A9%80%ED%8B%B0%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4%EB%A5%BC-%EC%B1%84%EC%9A%A9%ED%95%9C-%EB%B9%84%EA%B2%B0-a3899ed8"
  },
  {
    logo: "logos/secuwow.png",
    cover: "linear-gradient(135deg, #d6dff0 0%, #eaf0fb 60%, #cfd8ee 100%)",
    quote: "정보보호 컨설팅 전문기업의\n까다로운 채용 기준에 맞는\n인재를 정확히 찾아주셨어요",
    role: "시큐와우 채용 담당자",
    href: "https://blog.starting.kr/ko/articles/%EC%8B%9C%ED%81%90%EC%99%80%EC%9A%B0-%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8-%EC%BB%A8%EC%84%A4%ED%8C%85-%EC%A0%84%EB%AC%B8%EA%B8%B0%EC%97%85-%EC%A4%91%EC%A7%84%EA%B3%B5-%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-%ED%86%B5%ED%95%9C-%EC%B1%84%EC%9A%A9-%EC%A0%84%EB%9E%B5-18dcdef4"
  },
  {
    logo: "logos/terracle.png",
    cover: "linear-gradient(135deg, #d8e2dc 0%, #eef3ef 60%, #cdd8d2 100%)",
    quote: "불필요한 인터뷰 없이\n적합한 인재만 만나볼 수 있어\n시간을 크게 아꼈어요",
    role: "테라클 CEO",
    href: "https://blog.starting.kr/ko/articles/%ED%85%8C%EB%9D%BC%ED%81%B4-%ED%95%B4%EC%A4%91%ED%95%A9-%EA%B8%B0%EB%B0%98-%ED%8F%90%ED%94%8C%EB%9D%BC%EC%8A%A4%ED%8B%B1-%EC%9E%AC%ED%99%9C%EC%9A%A9-%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85-%EB%B6%88%ED%95%84%EC%9A%94%ED%95%9C-%EC%9D%B8%ED%84%B0%EB%B7%B0-%EC%A4%84%EC%9D%B4%EB%8A%94-%EB%B0%A9%EB%B2%95-3a75d208"
  }];


  // Duplicate twice for a seamless infinite marquee
  const doubled = [...items, ...items];

  return (
    <section id="testimonials">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><Icon name="users" size={13} /> 고객 후기</span>
          <h2 className="section-title">이유 있는 선택</h2>
          <p className="section-sub">스타팅을 통해 많은 기업이 채용 효율을 올리고 있어요.</p>
        </div>
      </div>
      <div className="t-marquee">
        <div className="t-track">
          {doubled.map((it, i) =>
          <a key={i} className="t-card" href={it.href} target="_blank" rel="noopener noreferrer">
              <div className="t-cover" style={{ background: it.cover }}>
                {it.logo ?
              <img src={it.logo} alt={it.role} className="t-cover-logo" loading="lazy" /> :

              <div className="t-cover-brand">
                  {it.brandIcon}
                  <span style={it.brandStyle}>
                    {it.brand}{it.brandAccent}
                  </span>
                </div>}
                {it.sub && <div className="t-cover-sub">{it.sub}</div>}
              </div>
              <div className="t-body">
                <p className="t-quote">{it.quote}</p>
                <div className="t-role">{it.role}</div>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>);

}

function Pricing() {
  return (
    <section id="pricing" className="process-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><Icon name="receipt" size={13} /> 요금제</span>
          <h2 className="section-title">
            리스크를 줄여주는<br />
            합리적인 가격과 안전장치
          </h2>
          <p className="section-sub">연봉 비례 수수료 대신, 인재 1명당 정찰제로 책정해요.</p>
        </div>

        <div className="pricing-grid">
          <Reveal className="price-card" y={20}>
            <span className="price-eyebrow">후불 정찰제</span>
            <h3 className="price-title">합격 후 결제</h3>
            <div className="price-amount">
              <span className="currency">₩</span>300<span className="won">만 원</span><span className="unit">/ 1명</span>
            </div>
            <div className="price-meta">VAT 별도 · 입사 이후 결제</div>
            <ul className="price-features">
              <li><Icon name="check" size={16} className="check" />다양한 서류 지원 · 창업자 출신 전담 매니저</li>
              <li><Icon name="check" size={16} className="check" />기업 내부 조건에 맞는 인재 프리미엄 매칭</li>
              <li><Icon name="check" size={16} className="check" />신속한 서류 검토 · 유사도 분석 리포트 제공</li>
              <li><Icon name="check" size={16} className="check" />면접 일정 조율 및 처우 협의 서포트</li>
            </ul>
            <div className="price-pay">
              <span>최종 결제 금액(부가세 제외)</span>
              <b>300만 원</b>
            </div>
          </Reveal>

          <Reveal className="price-card featured" y={20} delay={120}>
            <span className="price-badge">1명당 50만 원 절약</span>
            <span className="price-eyebrow">선불 정찰제</span>
            <h3 className="price-title">면접 진행 전 결제</h3>
            <div className="price-amount">
              <span className="currency">₩</span>250<span className="won">만 원</span><span className="unit">/  2명 </span>
            </div>
            <div className="price-meta">VAT 별도 · 면접 진행 전 결제</div>
            <ul className="price-features">
              <li><Icon name="check" size={16} className="check" />1년간 애드온팅 최대 2명 지원</li>
              <li><Icon name="check" size={16} className="check" />후불형 대비 총 100만 원 절감</li>
              <li><Icon name="check" size={16} className="check" />다양한 서류 지원 · 창업자 출신 전담 매니저</li>
              <li><Icon name="check" size={16} className="check" />기업 내부 조건에 맞는 인재 프리미엄 매칭</li>
              <li><Icon name="check" size={16} className="check" />신속한 서류 검토 · 유사도 분석 리포트 제공</li>
            </ul>
            <div className="price-pay">
              <span>최종 결제 금액(부가세 제외)</span>
              <b>500만 원</b>
            </div>
          </Reveal>
        </div>

        <div className="licenses">
          <div className="license">
            <div className="license-mark"><Icon name="shield" size={18} /></div>
            <div>
              <div className="license-name">유료직업소개사업 정식 허가</div>
              <div className="license-id">신고번호 · 제 2025-3040234-14-5-00005 호</div>
            </div>
          </div>
          <div className="license">
            <div className="license-mark"><Icon name="check" size={18} /></div>
            <div>
              <div className="license-name">유료직업소개사업 보증보험 가입</div>
              <div className="license-id">증권번호 · 제 100-000-2025-0359-3297 호</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <a className="btn btn-soft" href="#contact" data-channel-action="open">
            요금제 관련해서 궁금하다면?
            <Icon name="arrow-right" size={14} className="arrow" />
          </a>
        </div>
      </div>
    </section>);

}

function FAQ() {
  const items = [
  { q: "요금제는 언제, 어디서 신청하나요?",
    a: "회원가입 시 기본적으로 후불 요금제가 적용되며, 선불 요금제 이용을 원할 경우 담당 매니저에게 요청하시면 됩니다." },
  { q: "후불 요금제 이용 중간에 선불 요금제로 변경할 수 있나요?",
    a: "선불 요금제는 결제 완료 시점부터 적용됩니다. 따라서 채용 전형 진행 중이라도 면접 이전에 결제가 완료된 경우에만 선불 요금제로 인정됩니다. 만약 결제 전에 면접이 진행되면, 해당 인재는 자동으로 후불 요금제가 적용되며, 이후 소급 적용은 불가합니다." },
  { q: "선불 요금제 이용 중간에 후불 요금제로 변경할 수 있나요?",
    a: "선불 티켓이 먼저 차감되며, 이후 잔여 티켓이 부족한 포지션은 자동으로 후불제로 적용됩니다." },
  { q: "선불 요금제는 어떤 프로세스로 진행되나요?",
    a: "선불 요금제는 '채용 카운트' 방식으로 운영되며, 채용 확정 시 1명당 카운트 1개가 차감됩니다. 매칭 프로세스는 후불제와 동일하게 진행됩니다." },
  { q: "선불 요금제 보증기간과 재추천은 어떻게 진행되나요?",
    a: "입사일 기준 한 달 이내 자진퇴사 시, 카운트 원복 혹은 재추천을 제공합니다." },
  { q: "선불 요금제 만료 기한이 지나면 어떻게 되나요?",
    a: "잔여 티켓은 기한 만료와 함께 모두 소멸됩니다." },
  { q: "선불 요금제 최대 지원 카운트 모두 소진시 어떻게 되나요?",
    a: "후불 요금제가 자동 적용됩니다." },
  { q: "선불 요금제 잔여 카운트가 남아있는 상태에서 추가 결제를 하면 어떻게 되나요?",
    a: "선불 요금제 추가 결제를 하실 경우, 서비스 이용 기간은 초기화되며, 기존에 남아 있던 카운트는 소멸되지 않고 그대로 누적되어 함께 사용하실 수 있습니다." }];

  return (
    <section id="faq">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><Icon name="search" size={13} /> 자주 묻는 질문</span>
          <h2 className="section-title">궁금한 점, 미리 정리해뒀어요</h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) =>
          <details key={i} className="faq-item" {...i === 0 ? { open: true } : {}}>
              <summary>
                <span>{it.q}</span>
                <span className="faq-icon"><Icon name="plus" size={20} /></span>
              </summary>
              <div className="faq-body">{it.a}</div>
            </details>
          )}
        </div>
      </div>
    </section>);

}

function FinalCTA() {
  return (
    <section className="cta-section">
      <div className="wrap">
        <div className="cta-card">
          <div>
            <span style={{ display: "inline-flex", padding: "6px 10px", background: "rgba(255,255,255,.18)", borderRadius: 999, fontSize: 12, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 14 }}>
              지금 바로 시작
            </span>
            <h2 className="cta-h">
              플랫폼 보다 저렴한 금액으로<br />
              헤드헌팅 퍼포먼스.
            </h2>
            <p className="cta-sub">
              추가로 더 궁금한 내용이 있다면 상담을 신청해주세요<br />
              이해하기 쉽게 유선으로 설명드릴게요!
            </p>
          </div>
          <form className="cta-form" data-channel-form="consultation">
            <label>
              회사명
              <input name="company" type="text" placeholder="(주)스타팅파트너스" required />
            </label>
            <label>
              담당자 이름
              <input name="name" type="text" placeholder="홍길동" required />
            </label>
            <label>
              담당자 전화번호
              <input name="phone" type="tel" placeholder="010-0000-0000" required />
            </label>
            <label>
              담당자 이메일
              <input name="email" type="email" placeholder="you@company.com" />
            </label>
            <label>
              채용 예정 직군
              <select name="role" defaultValue="">
                <option value="" disabled>선택해주세요</option>
                <option value="개발 (프론트/백엔드/AI)">개발 (프론트/백엔드/AI)</option>
                <option value="디자인 (UI/UX/프로덕트)">디자인 (UI/UX/프로덕트)</option>
                <option value="PM / PO">PM / PO</option>
                <option value="마케팅">마케팅</option>
                <option value="경영지원">경영지원</option>
                <option value="기타">기타</option>
              </select>
            </label>
            <button type="submit">유선 상담 신청하기</button>
          </form>
        </div>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-col">
            <div className="nav-logo" style={{ marginBottom: 16 }}>
              <StartingLogo height={24} />
            </div>
            <p className="footer-meta" style={{ maxWidth: 360 }}>스타팅
공고 플랫폼을 대체하는 AI Agent 헤드헌팅 서비스
            </p>
          </div>
          <div className="footer-col">
            <h5>제품</h5>
            <ul>
              <li><a href="#features">특징</a></li>
              <li><a href="#process">Ai Agent</a></li>
              <li><a href="#pricing">요금</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>회사</h5>
            <ul>
              <li><a href="https://starting.kr/company" target="_blank" rel="noopener noreferrer">회사 소개</a></li>
              <li><a href="https://blog.starting.kr/ko" target="_blank" rel="noopener noreferrer">블로그</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>지원</h5>
            <ul>
              <li><a href="#" data-channel-action="open">문의하기</a></li>
              <li><a href="#terms">이용약관</a></li>
              <li><a href="#privacy">개인정보처리방침</a></li>
              <li><a href="mailto:support@starting.kr">support@starting.kr</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-meta">
            대표이사 : 김홍찬 | 사업자 등록번호 : 313-88-02066 | 통신판매번호 : 2025-서울광진-0701<br />
            직업정보제공번호 : 서울동부 제 2026-6 호 | 유료직업소개번호 : 제 2025-3040234-14-5-00005 호<br />
            본사 : 서울특별시 광진구 능동로 81, 3층 | 지사/연구소 : 서울특별시 중구 퇴계로 15, 5층<br />
            문의 : 1688-7360 / support@starting.kr
          </div>
          <div className="footer-meta">© 2026 Starting Partners, Inc.</div>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Nav, Hero, Logos, Comparison, ProductPreview, Stats, Features, Process, Testimonials, Pricing, FAQ, FinalCTA, Footer });