# Hero 상단 영역 — 타이포·버튼·간격 스펙

> 스크린샷 기준: H1 + 서브카피 + CTA 2개 + 메타 배지 (**퍼널 제외**)
> Framer/v0/Cursor에 **전체 복사** (Cmd+A → Cmd+C)

---

## 목적

Hero 섹션 **상단 텍스트·버튼 영역**만 구현.
폰트 크기·버튼 높이·간격을 **아래 px 값 그대로** 적용. 임의로 키우거나 줄이지 말 것.

## 제약

- 라이트 모드 only
- 폰트: **Pretendard** (fallback: -apple-system, system-ui, sans-serif)
- 가운데 정렬 (text-align center, flex column align center)
- 컨테이너 max-width: **1180px**, 좌우 padding: **clamp(20px, 4vw, 48px)**
- 헤더(Nav)는 만들지 않음

---

## 텍스트 콘텐츠

**H1 줄1:** 채용 플랫폼을 대체하는
**H1 줄2 (accent):** AI Agent 헤드헌팅 솔루션
**서브:** 정확히 필터링된 인재를 부담없는 정찰제로
**Primary CTA:** 인재 매칭받아보기 →
**Secondary CTA:** 문의하기
**메타:** 유료직업소개사업 정식 허가 · 채용 확정 시 결제

---

## 데스크톱 (viewport ≥901px) — 이 값을 기본으로

### H1 (.hero-headline)

| 속성 | 값 |
|------|-----|
| font-size | **68px** (clamp 상한; viewport 1134px~ 에서 68px 고정) |
| font-weight | **800** |
| letter-spacing | **-0.035em** (-2.38px @ 68px) |
| line-height | **1.05** (≈71px) |
| max-width | **920px** |
| margin-top | **24px** (헤더 아래) |
| margin-bottom | 0 |
| color (줄1) | **#0b0f1c** |
| text-align | center |

**참고 clamp:** `clamp(36px, 6vw, 68px)` — 901px 이상이면 사실상 68px

### H1 accent (줄2)

| 속성 | 값 |
|------|-----|
| display | **block** (무조건 줄바꿈) |
| margin-top | **0.22em** (≈15px @ 68px) |
| color | gradient text — **#1A7CFF → #0b4eae** (120deg) |
| background-clip | text (-webkit-background-clip: text) |
| font-size/weight | H1과 동일 |

### 서브카피 (.hero-sub)

| 속성 | 값 |
|------|-----|
| font-size | **19px** (clamp 상한; ≥1267px) |
| font-weight | **400** (regular) |
| color | **#3f4a60** |
| line-height | **1.5** (기본) |
| max-width | **600px** |
| margin-top | **22px** |
| text-align | center |

**참고 clamp:** `clamp(16px, 1.5vw, 19px)`

### CTA 버튼 row (.hero-cta)

| 속성 | 값 |
|------|-----|
| display | flex, justify-content center, flex-wrap wrap |
| gap | **12px** |
| margin-top | **32px** |

### Primary 버튼 (.btn.btn-primary.lg)

| 속성 | 값 |
|------|-----|
| height | **56px** |
| padding | **0 28px** (좌우) |
| border-radius | **10px** |
| font-size | **16px** |
| font-weight | **600** |
| letter-spacing | **-0.005em** |
| background | **#1A7CFF** |
| color | **#ffffff** |
| box-shadow | **0 18px 60px -20px rgba(47,102,246,0.45)**, inset 0 1px 0 rgba(255,255,255,0.15) |
| gap (텍스트↔아이콘) | **8px** |
| arrow icon | **16×16px** |

**hover:** bg **#0e62db**, translateY(**-1px**), arrow translateX(**3px**)

### Secondary 버튼 (.btn.btn-ghost.lg)

| 속성 | 값 |
|------|-----|
| height | **56px** (Primary와 동일) |
| padding | **0 28px** |
| border-radius | **10px** |
| font-size | **16px** |
| font-weight | **600** |
| background | **transparent** |
| color | **#0b0f1c** |
| border | **1px solid #d4dbe7** |

**hover:** bg **#f5f7fb**, border **#b2bccb**

### 메타 배지 (.hero-meta)

| 속성 | 값 |
|------|-----|
| margin-top | **22px** |
| font-size | **13px** |
| font-weight | **400** |
| color | **#8390a5** |
| gap (항목 사이) | **18px** |
| dot 구분자 | **4×4px** circle, bg **#b2bccb** |

---

## 태블릿 (601px ~ 900px)

| 요소 | font-size |
|------|-----------|
| H1 | **36px ~ 54px** (6vw, 68px 미만) |
| 서브 | **16px ~ 18px** (1.5vw) |
| 버튼 | 데스크톱과 **동일 56px / 16px** |

---

## 모바일 (≤600px)

| 요소 | 값 |
|------|-----|
| H1 font-size | **clamp(30px, 8.5vw, 40px)** → 375px 기준 **~32px**, 최대 **40px** |
| H1 line-height | 1.05 유지 |
| 서브 | **16px** |
| CTA layout | **세로 stack**, width **100%**, max-width **340px**, margin auto |
| 버튼 height | min-height **48px** (full width) |
| 버튼 font-size | **16px** 유지 |
| 메타 font-size | **12px** |
| 메타 gap | **10px** |

---

## Hero 섹션 패딩·배경

| 속성 | 값 |
|------|-----|
| padding-top | **clamp(72px, 9vw, 120px)** → desktop **~108px** |
| padding-bottom | **clamp(40px, 6vw, 80px)** → desktop **~72px** |
| section bg | **#fbfcfe** |
| grid pattern | 56×56px, line **#d4dbe7** 35% mix, 상단 radial fade mask |
| glow | top -200px center, 900×500px ellipse, primary **22%** opacity |

---

## 간격 요약 (desktop, 위→아래)

```
[헤더 bottom]
   ↓ 24px
H1 줄1
   ↓ 0.22em (≈15px)
H1 줄2 accent
   ↓ 22px
서브카피
   ↓ 32px
[Primary btn] gap 12px [Secondary btn]
   ↓ 22px
메타 배지
   ↓ (퍼널은 별도 — margin-top 40~72px)
```

---

## 입장 애니메이션 (페이지 로드)

모두 `heroTextIn`: opacity 0→1, translateY(14px→0), duration **0.9s**, easing **cubic-bezier(0.2, 0.7, 0.2, 1)**

| 요소 | delay |
|------|-------|
| H1 | **0.05s** |
| 서브 | **0.18s** |
| CTA row | **0.28s** |
| 메타 | **0.36s** |

---

## Framer/v0용 고정값 (clamp 대신)

clamp 구현이 어려우면 **1440px desktop** 기준 아래 고정:

```
H1:           68px / weight 800 / line-height 1.05 / color #0b0f1c
H1 accent:    68px / gradient #1A7CFF→#0b4eae / display block / margin-top 15px
Sub:          19px / weight 400 / color #3f4a60 / max-width 600px
Button height: 56px
Button text:   16px / weight 600 / radius 10px / padding 0 28px
Button gap:    12px
Meta:          13px / color #8390a5
Section pad-top: 108px
```

**375px mobile** 기준:

```
H1:           32px
Sub:          16px
Button:       full width, min-height 48px, 16px text
Meta:         12px
```

---

## 하지 말 것

- H1을 48px 이하로 줄이기 (desktop)
- 버튼 height 48px (desktop — **56px** 필수)
- 버튼 font 14px (— **16px**)
- accent 줄을 H1과 같은 줄에 넣기 (반드시 **block 줄바꿈**)
- CTA를 1개만 만들기 (Primary + Ghost **2개**)
- 퍼널을 이 프롬프트에 포함 (→ `hero-funnel-prompt.md` 별도)

## 체크리스트

- [ ] H1 desktop **68px**, mobile **30~40px**
- [ ] accent **별도 줄**, blue gradient text
- [ ] 서브 **19px** desktop / **16px** mobile
- [ ] 버튼 **56px** 높이, **16px** 텍스트, radius **10px**
- [ ] Primary shadow glow + Ghost border **#d4dbe7**
- [ ] 메타 **13px** + dot 구분
- [ ] 요소 간 margin: 22px / 32px / 22px
