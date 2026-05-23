// Product UI mock — Starting recruiter dashboard

function ProductUI() {
  const [ref, inView] = useInView({ threshold: 0.05, rootMargin: "0px 0px -10% 0px" });
  return (
    <div ref={ref} className={`pu ${inView ? "armed" : ""}`}>
      <div className="pu-bar">
        <div className="pu-dots"><span className="pu-dot"/><span className="pu-dot"/><span className="pu-dot"/></div>
        <div className="pu-url">app.starting.kr / 매칭 현황</div>
      </div>
      <div className="pu-body">
        <aside className="pu-side">
          <div className="pu-sb-logo">
            <span className="pu-sb-mark">S</span>
            Starting
          </div>
          <div className="pu-sb-item active">
            <Icon name="inbox" size={15} />
            매칭 현황
          </div>
          <div className="pu-sb-item">
            <Icon name="users" size={15} />
            인재 풀
          </div>
          <div className="pu-sb-item">
            <Icon name="doc" size={15} />
            리포트
          </div>
          <div className="pu-sb-item">
            <Icon name="receipt" size={15} />
            정산
          </div>
          <div className="pu-sb-section">설정</div>
          <div className="pu-sb-item">
            <Icon name="user" size={15} />
            팀 멤버
          </div>
          <div className="pu-sb-item">
            <Icon name="settings" size={15} />
            워크스페이스
          </div>
        </aside>

        <main className="pu-main">
          <div className="pu-head">
            <div>
              <div className="pu-h-title">공고별 매칭 현황</div>
              <div className="pu-h-meta">실시간 업데이트 · 마지막 동기화 방금 전</div>
            </div>
            <button className="pu-h-cta">
              <Icon name="plus" size={14} />
              신규 매칭 신청
            </button>
          </div>

          <div className="pu-tabs">
            <div className="pu-tab active">전체<span className="count">7</span></div>
            <div className="pu-tab">채용 중<span className="count">5</span></div>
            <div className="pu-tab">최종 검토<span className="count">2</span></div>
            <div className="pu-tab">마감<span className="count">0</span></div>
          </div>

          <div className="pu-table">
            <div className="pu-tr head">
              <div>상태</div>
              <div>채용 직군</div>
              <div>경력 · 인원</div>
              <div>매칭</div>
              <div>진척도</div>
              <div></div>
            </div>
            <Row status="active" job="Product Manager" sub="시리즈 B · 핀테크" exp="3~4년 · 6명" matches={28} prog={86} />
            <Row status="active" job="백엔드 개발자" sub="Node.js / TypeScript" exp="1~2년 · 4명" matches={42} prog={64} />
            <Row status="active" job="UI/UX 디자이너" sub="B2B SaaS" exp="7~10년 · 5명" matches={19} prog={52} />
            <Row status="active" job="AI 엔지니어" sub="LLM 응용" exp="1~2년 · 2명" matches={31} prog={38} />
            <Row status="closed" job="콘텐츠 마케터" sub="퍼포먼스" exp="3~5년 · 3명" matches={24} prog={100} />
          </div>
        </main>
      </div>

      <div className="pu-chip">
        <div className="pu-chip-avatar">JK</div>
        <div>
          <div className="pu-chip-match"><CountNum to={96} duration={1400} />% 매칭</div>
          <div className="pu-chip-text"><b>김지원</b> · 백엔드 5년</div>
        </div>
      </div>
      <div className="pu-chip b">
        <div className="pu-chip-avatar" style={{ background: "linear-gradient(135deg, #6dccc3, #0a7c73)" }}>HS</div>
        <div>
          <div className="pu-chip-match" style={{ color: "#0a7c73" }}>리포트 발행</div>
          <div className="pu-chip-text"><b>박현수</b> · PM 4년</div>
        </div>
      </div>
    </div>
  );
}

function Row({ status, job, sub, exp, matches, prog }) {
  return (
    <div className="pu-tr">
      <div>
        <span className={`pu-status ${status === "closed" ? "closed" : ""}`}>
          <span className="pulse" />
          {status === "closed" ? "마감" : "채용 중"}
        </span>
      </div>
      <div className="pu-job">
        {job}
        <small>{sub}</small>
      </div>
      <div className="pu-cap">{exp}</div>
      <div className="pu-cap"><b>{matches}</b>명</div>
      <div className="pu-prog">
        <div className="pu-prog-bar" style={{ "--w": `${prog}%` }}><i /></div>
        <div className="pu-prog-num">{prog}%</div>
      </div>
      <div className="pu-more">⋯</div>
    </div>
  );
}

// Process step visuals
function FilterCard() {
  // Keyword extraction simulation — chips light up one-by-one as if user is clicking.
  const groups = [
    { label: "분야",   items: ["SaaS", "애견", "플랫폼", "B2C"],         active: [0, 1, 3] },
    { label: "타겟",   items: ["B2C"],                                   active: [0] },
    { label: "스킬",   items: ["Node.js", "Spring", "AWS", "RDBMS"],     active: [0, 1, 3] },
    { label: "협업툴", items: ["Slack", "Notion", "Figma", "Git"],       active: [0, 1, 2] },
  ];
  // Total selectable chips across all groups (denominator for %)
  const TOTAL_CHIPS = groups.reduce((sum, g) => sum + g.items.length, 0);

  // Flat list of (groupIdx, itemIdx) for the activation sequence
  const seq = React.useMemo(() => {
    const list = [];
    groups.forEach((g, gi) => g.active.forEach((ai) => list.push([gi, ai])));
    return list;
  }, []);

  const [ref, inView] = useInView({ threshold: 0.2 });
  const [step, setStep] = React.useState(0); // 0..seq.length, +1 = reset
  React.useEffect(() => {
    if (!inView) return;
    const HOLD = step === seq.length ? 1400 : step === 0 ? 700 : 600;
    const t = setTimeout(() => setStep((s) => (s + 1) % (seq.length + 1)), HOLD);
    return () => clearTimeout(t);
  }, [inView, step, seq.length]);

  const activatedSet = new Set();
  for (let i = 0; i < step && i < seq.length; i++) activatedSet.add(`${seq[i][0]}-${seq[i][1]}`);

  const pct = (Math.min(step, seq.length) / TOTAL_CHIPS) * 100;

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
    {
      msg: <>채용 직군과 <b>주요 업무</b> 내용이 맞지 않아요. 주요 업무를 직군에 맞게 다시 정리하는 게 좋아요.</>,
    },
    {
      msg: <>자격 요건이 프론트엔드 스택 위주로 작성되어 있어요. <b>백엔드 기술 스택</b>으로 수정해주세요.</>,
    },
    {
      msg: <>경력 조건이 너무 광범위해요. <b>3~5년</b> 정도로 좁혀 입력하면 핏한 인재를 더 잘 찾을 수 있어요.</>,
    },
    {
      msg: <>우대 사항에 <b>도메인 경험(B2B SaaS)</b>을 추가하면 매칭 정확도가 높아져요.</>,
    },
  ];

  const [ref, inView] = useInView({ threshold: 0.15 });
  const [count, setCount] = React.useState(0); // # of messages currently visible
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
  // Vary the placeholder line widths so rows feel natural
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
                <span
                  key={j}
                  className="jp-line"
                  style={{ width: w, animationDelay: `${i * 80 + j * 60}ms` }}
                />
              ))}
            </div>
            <div className="rep-lines">
              {widths[i].res.map((w, j) => (
                <span
                  key={j}
                  className="jp-line"
                  style={{ width: w, animationDelay: `${i * 80 + j * 60 + 120}ms` }}
                />
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
