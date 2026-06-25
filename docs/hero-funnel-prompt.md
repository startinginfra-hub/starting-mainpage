# Hero Funnel — 인재 필터링 파이프라인 UI

> Framer / v0 / Cursor 등에 **아래 전체를 복사**해서 붙여넣으세요.
> 참고 스크린샷: `assets/` 폴더의 funnel 캡처 이미지

---

## 목적

Hero 섹션 하단 **세로형 필터링 퍼널** 컴포넌트.
많은 지원자가 2단계 AI 필터를 거쳐 소수 FIT 인재로 좁혀지는 과정을 **자동 루프 애니메이션**으로 보여준다.

## 제약

- 라이트 모드 only (배경 transparent, 부모 Hero 배경 #fbfcfe 위)
- Primary #1A7CFF, Pretendard, max-width 720px, 가운데 정렬
- 모바일 ≤768px 대응
- 정적 일러스트 ❌ → **state machine 자동 루프** ✅
- 클릭 인터랙션 ❌ / 다크 배경·네온 glow ❌ / 실사 사진 ❌

---

## 전체 구조 (위→아래)

    [Tier 1] 다수 지원자 — 20명 (10×2 그리드)
        ↓
    [Filter 1] ① 직군별 개인화 키워드 필터
        ↓
    [Tier 2] 8명 (1줄, 더 크고 밝음)
        ↓
    [Filter 2] ② 비공개 필수 조건 필터
        ↓
    [Tier 3] FIT 한 인재 매칭 — 5명 + 이름

모바일: 10 → filter → 5 → filter → 3 (+ 이름 3개)

---

## 1. Tier 1 — "다수 지원자"

- 라벨: 13px bold uppercase, letter-spacing 0.04em, #5d6a82
- 20개 카드: 10열×2행, gap 8px, max-width 460px
- 카드: aspect-ratio 1, radius 8px, bg #eef1f7, 사람 실루엣 #b2bccb (60%)

## 2. Filter 1 — "직군별 개인화 키워드 필터"

- 흰색 card, radius 14px, padding 12px 16px
- 숫자 배지 "1": 20×20px, radius 6px, bg #1A7CFF, white
- 칩: 인하우스 출신 | UX 중심 | B2B | 웹 서비스 | •••

## 3. Tier 2 — 8명

- 8열 1행, radius 10px, max-width 520px
- blue gradient (#74acff→#0e62db), white icon, soft glow

## 4. Filter 2 — "비공개 필수 조건 필터"

- Filter 1과 동일, 숫자 "2"
- 칩: 인서울 대학 | 경쟁사 재직 여부 | 34세 이하 | •••

## 5. Tier 3 — "FIT 한 인재 매칭"

- 라벨: #1A7CFF bold uppercase + 은은한 radial tint
- 5열, radius 14px, gap 14px, max-width 460px
- bright blue gradient, white icon, pulse scale 1↔1.04 (2.4s)
- 이름: 김지원, 박서연, 이재희, 최민수, 윤예진 (12px, #0b0f1c)

## 화살표 ↓

- SVG 11×20px, off: #d4dbe7 opacity 0 / on: #1A7CFF + glow
- 위 arrow: filter is-on 또는 is-done
- 아래 arrow: filter is-done only

---

## 색상 (라이트)

| 요소 | 값 |
|------|-----|
| Tier label | #5d6a82 |
| Card default | bg #eef1f7, icon #b2bccb |
| Card glow (Tier2) | #74acff→#0e62db, white icon |
| Card bright (Tier3) | primary gradient, white icon |
| Filter card | white, border #e3e8f1 → active primary glow |
| Chip active | white bg, primary border, text #0e62db |
| Chip done/muted | #f5f7fb bg, text #5d6a82 |

---

## 레이아웃

- vertical gap 8~14px, tier padding 18px, filter max-width 560px
- container max-width 720px, margin-top 40~72px

---

# 애니메이션 상세 스펙 (필수)

## A. 트리거

    intersection observer:
      threshold: 0.12
      rootMargin: "0px 0px -8% 0px"
    phase=0 → 500ms 후 phase=1 시작 → 무한 루프

## B. State Machine — 11.5초 1사이클

| Phase | Hold | Tier1 | F1 active | F1 done | Tier2 | F2 active | F2 done | Tier3 | 비고 |
|-------|------|-------|-----------|---------|-------|-----------|---------|-------|------|
| 0 | 500ms | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | idle |
| 1 | 1100ms | ✓ show | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | 20명 pop-in |
| 2 | 1500ms | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | Filter1 glow |
| 3 | 1200ms | ✓ | ✗ | ✓ muted | ✓ show | ✗ | ✗ | ✗ | 8명 등장 |
| 4 | 1500ms | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | Filter2 glow |
| 5 | 1400ms | ✓ | ✗ | ✓ | ✓ | ✗ | ✓ muted | ✓ show | 5명+이름 |
| 6 | 3500ms | ✓ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ pulse | hold |
| 7 | 800ms | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | reset blur |

**규칙:** Tier는 phase 7 전까지 **사라지지 않음**. Filter는 active(1 phase) → done(muted).

## C. 요소별 파라미터

### Tier 컨테이너 (is-shown)
- opacity 0→1, translateY(10px→0), 0.55s, ease / cubic-bezier(.2,.7,.2,1)

### 프로필 카드 pop-in
- opacity 0→1: 0.5s cubic-bezier(.2,.7,.2,1)
- scale 0.6→1: 0.55s cubic-bezier(.2,1.4,.4,1) ← bounce
- delay: index × 35ms (Tier1: 0~665ms)

### Tier3 pulse
    @keyframes fnBrightPulse {
      0%, 100% { transform: scale(1); }
      50%      { transform: scale(1.04); }
    }
    animation: 2.4s ease-in-out infinite;
    ※ 모바일 ≤768px: pulse OFF

### 이름 (.fn-name)
- opacity 0→1, translateY(4px→0), 0.5s, delay 600ms

### Filter box
- hidden: opacity 0, translateY(8px), visibility hidden
- is-on: opacity 1, primary border glow, triple shadow
- is-done: opacity 0.75, muted border, white bg

### Filter 칩 stagger (is-on)
- delay: 100 + index×80ms → 100, 180, 260, 340, 420ms
- translateY(6px→0) + fade, 0.45s

### Sweep light (is-on 시 1회)
- left -50% → 100%, 1.1s, cubic-bezier(.4,0,.2,1)
- blur(6px), primary 45% gradient

### Reset (phase 7)
- .fn.is-resetting: opacity 0.25, blur(2px), 0.45s

## D. 타임라인

    0ms      idle
    500ms    Tier1 20명 pop-in
    1600ms   Filter1 active + sweep
    3100ms   Filter1 done + Tier2 8명
    4300ms   Filter2 active
    5800ms   Filter2 done + Tier3 5명 + 이름
    7200ms   hold 3.5s (pulse)
    10700ms  reset blur
    11500ms  → loop

## E. 동시 표시 (AI가 자주 틀림)

1. phase 3~6: Tier1 + Filter1(done) + Tier2 **동시**
2. phase 5~6: + Filter2(done) + Tier3 **전부**
3. Filter active는 phase 2, 4 **딱 1번씩**
4. phase 7: **전부 사라짐** (일부 남기면 안 됨)

## F. 모바일

- 10→5→3명, pulse OFF, phase timing 동일

## G. 체크리스트

- [ ] 세로 퍼널 20→8→5
- [ ] Filter = 번호배지 + pill 칩
- [ ] Tier2 > Tier1 크기/밝기
- [ ] Tier3 이름 5개
- [ ] 자동 루프 (정적 X)
- [ ] Filter sweep + chip highlight
- [ ] Tier3 pulse
- [ ] 모바일 10→5→3

## 하지 말 것

가로 플로우, 타임라인 UI, 실사 사진, 다크 배경, 클릭 인터랙션, CSS-only (JS state machine 필수)
