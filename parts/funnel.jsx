// Hero Funnel — vertical pipeline
// Desktop: 20 → [filter] → 8 → [filter] → 5
// Mobile (≤768px): 10 → [filter] → 5 → [filter] → 3

const FN_F1_CHIPS = ["인하우스 출신", "UX 중심", "B2B", "웹 서비스"];
const FN_F2_CHIPS = ["인서울 대학", "경쟁사 재직 여부", "34세 이하"];
const FN_FINAL_NAMES = ["김지원", "박서연", "이재희", "최민수", "윤예진"];

const FN_TIER_LAYOUT = {
  desktop: [
    { count: 20, cols: 10 },
    { count: 8, cols: 8 },
    { count: 5, cols: 5, names: FN_FINAL_NAMES },
  ],
  mobile: [
    { count: 10, cols: 5 },
    { count: 5, cols: 5 },
    { count: 3, cols: 3, names: FN_FINAL_NAMES.slice(0, 3) },
  ],
};

const FN_MOBILE_MQ = "(max-width: 768px)";

function useMobileFunnel() {
  const [mobile, setMobile] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(FN_MOBILE_MQ).matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia(FN_MOBILE_MQ);
    const onChange = (e) => setMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

// Phase indices:
//  0 idle (start delay)
//  1 tier20 in
//  2 filter1 on
//  3 tier10 in
//  4 filter2 on
//  5 tier5 in
//  6 hold final
//  7 reset fade
const FN_HOLDS = [500, 1100, 1500, 1200, 1500, 1400, 3500, 800];

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fn-pi">
      <path
        fill="currentColor"
        d="M12 12.5a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5zm0 1.7c-4.55 0-8.25 2.5-8.25 5.6v1.7h16.5v-1.7c0-3.1-3.7-5.6-8.25-5.6z" />
      
    </svg>);

}

function FnArrow() {
  return (
    <svg viewBox="0 0 12 22" width="11" height="20" aria-hidden="true" className="fn-arrow-svg">
      <path d="M6 0v18M2 14l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

}

function FnTier({ label, count, size, cols, show, state, names, hideCount, className = "" }) {
  return (
    <div className={`fn-tier fn-tier--${size} ${className} ${show ? "is-shown" : ""}`.trim()}>
      {(label || !hideCount) && (
        <div className="fn-tier-head">
          {label && <span className="fn-tier-label">{label}</span>}
          {!hideCount && (
            <span className="fn-tier-count">
              {count}<span className="fn-tier-unit">명</span>
            </span>
          )}
        </div>
      )}
      <div className="fn-grid" style={{ "--fn-cols": cols }}>
        {Array.from({ length: count }).map((_, i) =>
        <div key={i} className="fn-cell">
            <div
            className={`fn-card is-${state}`}
            style={{ transitionDelay: show ? `${i * 35}ms` : "0ms" }}>
            
              <ProfileIcon />
            </div>
            {names && <div className="fn-name">{names[i]}</div>}
          </div>
        )}
      </div>
    </div>);

}

function FnFilter({ num, title, chips, on, done }) {
  return (
    <div className="fn-step">
      <div className={`fn-arrow ${on || done ? "is-on" : ""}`}><FnArrow /></div>
      <div className={`fn-filter ${on ? "is-on" : ""} ${done ? "is-done" : ""}`}>
        <div className="fn-filter-head">
          <span className="fn-filter-tag">
            <span className="fn-filter-num">{num}</span>
            {title}
          </span>
        </div>
        <div className="fn-chips">
          {chips.map((c, i) =>
          <span key={c} className="fn-chip" style={{ transitionDelay: `${100 + i * 80}ms` }}>{c}</span>
          )}
          <span className="fn-chip fn-chip--more" style={{ transitionDelay: `${100 + chips.length * 80}ms` }} aria-label="more">
            <svg width="18" height="4" viewBox="0 0 18 4" aria-hidden="true">
              <circle cx="2"  cy="2" r="1.6" fill="currentColor"/>
              <circle cx="9"  cy="2" r="1.6" fill="currentColor"/>
              <circle cx="16" cy="2" r="1.6" fill="currentColor"/>
            </svg>
          </span>
        </div>
        <span className="fn-sweep" aria-hidden="true" />
      </div>
      <div className={`fn-arrow ${done ? "is-on" : ""}`}><FnArrow /></div>
    </div>);

}

function HeroFunnel() {
  const isMobile = useMobileFunnel();
  const tiers = FN_TIER_LAYOUT[isMobile ? "mobile" : "desktop"];
  const [ref, inView] = useInView({ threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const t = setTimeout(
      () => setPhase((p) => (p + 1) % FN_HOLDS.length),
      FN_HOLDS[phase]
    );
    return () => clearTimeout(t);
  }, [inView, phase]);

  const active = phase < 7;
  const t20on = active && phase >= 1;
  const f1on = active && phase === 2;
  const f1done = active && phase >= 3;
  const t10on = active && phase >= 3;
  const f2on = active && phase === 4;
  const f2done = active && phase >= 5;
  const t5on = active && phase >= 5;

  return (
    <div ref={ref} key={isMobile ? "fn-m" : "fn-d"} className={`fn ${!active ? "is-resetting" : ""}`}>
      <FnTier label="다수 지원자" count={tiers[0].count} size="sm" cols={tiers[0].cols} show={t20on} state="on" hideCount />
      <FnFilter num={1} title="직군별 개인화 키워드 필터" chips={FN_F1_CHIPS} on={f1on} done={f1done} />
      <FnTier count={tiers[1].count} size="md" cols={tiers[1].cols} show={t10on} state="glow" hideCount />
      <FnFilter num={2} title="비공개 필수 조건 필터" chips={FN_F2_CHIPS} on={f2on} done={f2done} />
      <FnTier
        label="FIT 한 인재 매칭"
        count={tiers[2].count}
        size={isMobile ? "md" : "lg"}
        cols={tiers[2].cols}
        show={t5on}
        state="bright"
        names={tiers[2].names}
        hideCount
        className={isMobile ? "fn-tier--final" : ""}
      />
    </div>);

}

Object.assign(window, { HeroFunnel });