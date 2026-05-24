// Product UI mock — Starting recruiter dashboard (new overview design)

function ProductUI() {
  const [ref, inView] = useInView({ threshold: 0.05, rootMargin: "0px 0px -10% 0px" });
  return (
    <div ref={ref} className={`pu ${inView ? "armed" : ""}`}>
      {/* App top bar */}
      <div className="pu-top">
        <div className="pu-top-logo">Starting</div>
        <div className="pu-top-user" aria-hidden="true">
          <Icon name="user" size={16} />
        </div>
      </div>

      <div className="pu-body">
        {/* Vertical nav rail */}
        <aside className="pu-rail">
          <div className="pu-rail-item active">
            <span className="pu-rail-ic"><Icon name="menu" size={18} /></span>
            <span>대시보드</span>
          </div>
          <div className="pu-rail-item">
            <span className="pu-rail-ic"><Icon name="plus" size={18} /></span>
            <span>매칭 신청</span>
          </div>
          <div className="pu-rail-item">
            <span className="pu-rail-ic"><Icon name="doc" size={18} /></span>
            <span>매칭 현황</span>
          </div>
          <div className="pu-rail-item">
            <span className="pu-rail-ic"><Icon name="shield" size={18} /></span>
            <span>기업 프로필</span>
          </div>
          <div className="pu-rail-item">
            <span className="pu-rail-ic"><Icon name="users" size={18} /></span>
            <span>담당자</span>
          </div>
        </aside>

        <main className="pu-main">
          {/* Welcome */}
          <div className="pu-welcome">
            <h3 className="pu-welcome-title">
              안녕하세요, 이수진 대표이사님 <span className="pu-badge">관리자</span>
            </h3>
            <p className="pu-welcome-sub">한눈에 진행 현황을 확인하고 바로 업무를 이어가 보세요.</p>
          </div>

          {/* Stat strip — single card with 4 columns separated by dividers */}
          <div className="pu-stats">
            <div className="pu-stat">
              <div className="pu-stat-label">채용 중 공고</div>
              <div className="pu-stat-val"><CountNum to={12} duration={1200} /> <em>개</em></div>
            </div>
            <div className="pu-stat">
              <div className="pu-stat-label">평가 진행 중</div>
              <div className="pu-stat-val"><CountNum to={45} duration={1400} /> <em>명</em></div>
            </div>
            <div className="pu-stat">
              <div className="pu-stat-label">
                프로필 완성도
                <span className="pu-pill">좋음</span>
              </div>
              <div className="pu-stat-val"><CountNum to={95} duration={1600} /> <em>%</em></div>
            </div>
            <div className="pu-stat">
              <div className="pu-stat-label">요금제</div>
              <div className="pu-stat-val">후불</div>
            </div>
          </div>

          {/* Dark promo banner */}
          <div className="pu-promo">
            <div className="pu-promo-lines" aria-hidden="true">
              <span /><span /><span /><span /><span /><span /><span /><span />
            </div>
            <div className="pu-promo-glow" aria-hidden="true" />
            <div className="pu-promo-text">
              <div className="pu-promo-title">헤드헌팅을 공고형 플랫폼 보다 저렴하게 이용하고 있어요!</div>
              <div className="pu-promo-sub">담당 헤드헌터와, AI Agent가 성공적인 채용을 함께해요.</div>
            </div>
          </div>

          {/* Two-up: recent matches + pass-rate chart */}
          <div className="pu-cols">
            <div className="pu-panel">
              <div className="pu-panel-h">
                <div>
                  <div className="pu-panel-title">최근 매칭 인재</div>
                  <div className="pu-panel-sub">최근 30일 이내 매칭 된 인재에요</div>
                </div>
                <Icon name="arrow-right" size={16} className="pu-panel-more" />
              </div>
              <div className="pu-mtable">
                <div className="pu-mtr head">
                  <div>공고명</div>
                  <div>지원자명</div>
                  <div>경력</div>
                  <div>매칭일</div>
                </div>
                <MRow job="프론트 개발자" name="이지안" exp="3년 6개월" date="2026. 05. 24." />
                <MRow job="프론트 개발자" name="김진주" exp="5년 1개월" date="2026. 05. 23." />
                <MRow job="프로젝트 매니저(PM)" name="박민수" exp="3년 2개월" date="2026. 05. 22." />
                <MRow job="인사담당자" name="최사랑" exp="8년 7개월" date="2026. 05. 21." />
                <MRow job="UIUX 디자이너" name="이진아" exp="7년 3개월" date="2026. 05. 20." />
              </div>
            </div>

            <div className="pu-panel">
              <div className="pu-panel-h">
                <div>
                  <div className="pu-panel-title">공고별 서류 합격률</div>
                  <div className="pu-panel-sub">
                    서류 합격률이 <b className="pu-em">67%</b> 이하인 경우 조건을 더 알려주는게 좋아요!
                  </div>
                </div>
                <div className="pu-panel-tools">
                  <button className="pu-iconbtn" aria-label="이전"><Icon name="arrow-right" size={14} style={{ transform: "rotate(180deg)" }} /></button>
                  <button className="pu-iconbtn" aria-label="다음"><Icon name="arrow-right" size={14} /></button>
                </div>
              </div>
              <div className="pu-chart">
                <PassBar label="ML 엔지니어"     sub="4~6년" v={78} />
                <PassBar label="프로덕트 디자이너" sub="1~3년" v={67} />
                <PassBar label="DevOps 엔지니…"   sub="3~5년" v={67} />
                <PassBar label="프론트엔드 개발자" sub="2~4년" v={58} />
                <PassBar label="데이터 엔지니어"   sub="4~6년" v={58} />
                <div className="pu-chart-guide" aria-hidden="true" />
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}

function MRow({ job, name, exp, date }) {
  return (
    <div className="pu-mtr">
      <div className="pu-mtr-job">{job}</div>
      <div>{name}</div>
      <div>{exp}</div>
      <div className="pu-mtr-date">{date}</div>
    </div>
  );
}

function PassBar({ label, sub, v }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <div className="pu-pb" ref={ref}>
      <div className="pu-pb-track">
        <div className="pu-pb-fill" style={{ height: inView ? `${v}%` : "0%" }}>
          <span className="pu-pb-num">{v}%</span>
        </div>
      </div>
      <div className="pu-pb-lbl">{label}</div>
      <div className="pu-pb-sub">{sub}</div>
    </div>
  );
}

// ─── The rest of the file (FilterCard, ScreeningCard, JobPostCard, ReportCard, Bar, InvoiceCard) ───
// These power the process steps elsewhere on the page and are unchanged.

function FilterCard() {
  const groups = [
    { label: "분야",   items: ["SaaS", "애견", "플랫폼", "B2C"],         active: [0, 1, 3] },
    { label: "타겟",   items: ["B2C"],                                   active: [0] },
    { label: "스킬",   items: ["Node.js", "Spring", "AWS", "RDBMS"],     active: [0, 1, 3] },
    { label: "협업툴", items: ["Slack", "Notion", "Figma", "Git"],       active: [0, 1, 2] },
  ];
  const TOTAL_CHIPS = groups.reduce((sum, g) => sum + g.items.length, 0);

  const seq = React.useMemo(() => {
    const list = [];
    groups.forEach((g, gi) => g.active.forEach((ai) => list.push([gi, ai])));
    return list;
  }, []);

  const [ref, inView] = useInView({ threshold: 0.2 });
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    const HOLD = step === seq.length ? 1400 : step === 0 ? 700 : 600;
    const t = setTimeout(() => setStep((s) => (s + 1) % (seq.length + 1)), HOLD);
    return () => clearTimeout(t);
  }, [inView, step, seq.length]);

  const activatedSet = new Set();
  for (let i = 0; i < step && i < seq.length; i++) activatedSet.add(`${seq[i][0]}-${seq[i][1]}`);

  return (
    <div className="fc" ref={ref}>
      <div className="fc-card">
        <div className="fc-card-h">
          <div className="fc-scan" aria-hidden="true">
            <div className="fc-scan-doc">
              <Icon name="doc" size={14} />
              <span>공고 분석중</span>
            </div>
            <div className="fc-scan-lines">
              <span className="fc-scan-line" style={{ width: "92%" }} />
              <span className="fc-scan-line" style={{ width: "76%" }} />
              <span className="fc-scan-line" style={{ width: "84%" }} />
            </div>
          </div>
        </div>
        <div className="fc-keywords">
          {groups.map((g, gi) => (
            <div key={gi} className="fc-row">
              <div className="fc-label">{g.label}</div>
              <div className="fc-pills">
                {g.items.map((it, ii) => {
                  const key = `${gi}-${ii}`;
                  const on = activatedSet.has(key);
                  const isCurrent =
                    step > 0 && step <= seq.length &&
                    seq[step - 1][0] === gi && seq[step - 1][1] === ii;
                  return (
                    <span
                      key={key}
                      className={`fc-pill ${on ? "active" : ""} ${isCurrent ? "just-clicked" : ""}`}
                    >
                      {it}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreeningCard() {
  const messages = [
    { msg: <>채용 직군과 <b>주요 업무</b> 내용이 맞지 않아요. 주요 업무를 직군에 맞게 다시 정리하는 게 좋아요.</> },
    { msg: <>자격 요건이 프론트엔드 스택 위주로 작성되어 있어요. <b>백엔드 기술 스택</b>으로 수정해주세요.</> },
    { msg: <>경력 조건이 너무 광범위해요. <b>3~5년</b> 정도로 좁혀 입력하면 핏한 인재를 더 잘 찾을 수 있어요.</> },
    { msg: <>우대 사항에 <b>도메인 경험(B2B SaaS)</b>을 추가하면 매칭 정확도가 높아져요.</> },
  ];

  const [ref, inView] = useInView({ threshold: 0.15 });
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    const HOLD = count === 0 ? 600 : count > messages.length ? 1800 : 1400;
    const t = setTimeout(
      () => setCount((c) => (c >= messages.length + 1 ? 0 : c + 1)),
      HOLD
    );
    return () => clearTimeout(t);
  }, [inView, count, messages.length]);

  return (
    <div className="fc scrn-chat-card" ref={ref}>
      <div className="scrn-chat-stack">
        {messages.map((m, i) => (
          i < count && (
            <div key={`${count}-${i}`} className="scrn-chat scrn-chat--in">
              <div className="scrn-chat-av" aria-hidden="true">
                <Icon name="spark" size={14} />
              </div>
              <div className="scrn-chat-bubble">
                <div className="scrn-chat-name">
                  Starting AI
                  <span className="scrn-chat-time">방금</span>
                </div>
                <p className="scrn-chat-msg">{m.msg}</p>
              </div>
            </div>
          )
        ))}
        {count > 0 && count <= messages.length && (
          <div className="scrn-chat scrn-chat--typing-row">
            <div className="scrn-chat-av" aria-hidden="true">
              <Icon name="spark" size={14} />
            </div>
            <div className="scrn-chat-bubble scrn-chat-bubble--typing">
              <span className="scrn-chat-typing" aria-hidden="true">
                <span className="scrn-chat-dot" />
                <span className="scrn-chat-dot" />
                <span className="scrn-chat-dot" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function JobPostCard() {
  return (
    <div className="fc">
      <div className="jp">
        <div className="jp-cover" aria-hidden="true">
          <span className="jp-cover-shape jp-cover-shape--a" />
          <span className="jp-cover-shape jp-cover-shape--b" />
        </div>
        <div className="jp-h">
          <div className="jp-logo" aria-hidden="true">
            <Icon name="users" size={20} />
          </div>
          <div className="jp-h-meta">
            <div className="jp-title">백엔드 시니어 엔지니어</div>
            <div className="jp-meta">스타팅파트너스 · 정규직 · 서울 광진</div>
          </div>
        </div>
        <div className="jp-section">
          <div className="jp-section-h">주요 업무</div>
          <div className="jp-line"></div>
          <div className="jp-line short"></div>
          <div className="jp-line"></div>
        </div>
        <div className="jp-section">
          <div className="jp-section-h">자격 요건</div>
          <div className="jp-line"></div>
          <div className="jp-line"></div>
        </div>
        <div className="jp-gen">
          <Icon name="spark" size={12} />
          <span>자동생성</span>
          <span className="jp-gen-dot" />
          <span className="jp-gen-dot" />
          <span className="jp-gen-dot" />
        </div>
      </div>
    </div>
  );
}

function ReportCard() {
  const rows = [
    { tag: "기본조건" },
    { tag: "기본조건" },
    { tag: "주요업무" },
    { tag: "주요업무" },
  ];
  const widths = [
    { req: ["80%"],          res: ["60%"] },
    { req: ["72%"],          res: ["88%"] },
    { req: ["90%", "55%"],   res: ["95%", "70%"] },
    { req: ["85%"],          res: ["92%", "65%"] },
  ];
  return (
    <div className="fc">
      <div className="rep">
        <div className="rep-table-h">
          <span>구분</span>
          <span>기업 필수 요건</span>
          <span>인재 분석</span>
          <span>결과</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="rep-row">
            <span className="rep-tag">{r.tag}</span>
            <div className="rep-lines">
              {widths[i].req.map((w, j) => (
                <span key={j} className="jp-line" style={{ width: w, animationDelay: `${i * 80 + j * 60}ms` }} />
              ))}
            </div>
            <div className="rep-lines">
              {widths[i].res.map((w, j) => (
                <span key={j} className="jp-line" style={{ width: w, animationDelay: `${i * 80 + j * 60 + 120}ms` }} />
              ))}
            </div>
            <span className="rep-check">
              <Icon name="check" size={11} />
              충족
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Bar({ label, v }) {
  const [ref, inView] = useInView();
  return (
    <div className="rc-bar-row">
      <div className="rc-bar-lbl">{label}</div>
      <div className="rc-bar" ref={ref}><i style={{ width: inView ? `${v}%` : "0%", transition: "width 1.4s cubic-bezier(.2,.7,.2,1)" }} /></div>
      <div className="rc-bar-num"><CountNum to={v} duration={1400} /></div>
    </div>
  );
}

function InvoiceCard() {
  return (
    <div style={{ width: "100%", maxWidth: 360 }}>
      <div className="fc-h">STEP 03 · 정산</div>
      <h4 className="fc-title">채용 확정 후 세금계산서 발행</h4>
      <div className="inv">
        <div className="inv-h">
          <div>
            <div className="inv-title">세금계산서</div>
            <div className="inv-id">INV-2026-00237</div>
          </div>
          <Icon name="receipt" size={22} />
        </div>
        <div className="inv-row">후보자 채용 확정<b>김지원 · 백엔드</b></div>
        <div className="inv-row">계약 연봉<b>5,000만 원</b></div>
        <div className="inv-row">기존 헤드헌팅 수수료 (15%)<span style={{ textDecoration: "line-through", color: "var(--text-3)" }}>750만 원</span></div>
        <div className="inv-total">
          <span>스타팅 정찰제</span>
          <span className="amt">300만 원</span>
        </div>
        <div className="inv-stamp">
          <Icon name="check" size={14} />
          연봉 기준 약 450만 원 절감
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProductUI, FilterCard, ScreeningCard, JobPostCard, ReportCard, InvoiceCard });
