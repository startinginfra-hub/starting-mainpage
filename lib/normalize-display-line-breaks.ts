/** 마이그레이션 텍스트의 이스케이프 개행·CRLF를 LF로 통일 (textarea·whitespace-pre-wrap용) */
export function normalizeDisplayLineBreaks(input: string): string {
  let s = input
  s = s.replace(/\\r\\n/g, "\n")
  s = s.replace(/\\n/g, "\n")
  s = s.replace(/\\r/g, "\n")
  s = s.replace(/\r\n/g, "\n")
  s = s.replace(/\r/g, "\n")
  // 레거시: 백슬래시 없이 문자 "rn"만 줄 구분으로 쓰인 경우 (예: "도출rn- Product", "yearsrn-Product")
  s = s.replace(/rn-\s+/g, "\n- ")
  s = s.replace(/(?<=[a-z])rn-(?=[A-Z])/g, "\n-")
  s = s.replace(/(?<=[가-힣])rn-(?=[A-Za-z가-힣0-9])/g, "\n-")
  // "rn2.", "**rn3.**" 등: rn 뒤 숫자(목록 번호). 단어 내부 "modern2"의 ern2 오인 방지 → r 앞이 ASCII 알파벳이 아닐 때만
  s = s.replace(/(?<![A-Za-z])rn(\d+)/g, "\n$1")
  // 마이그레이션: "rnrn" 등 rn만 연속된 줄바꿈 표기
  s = s.replace(/(?:rn){2,}/g, (m) => "\n".repeat(m.length / 2))
  // 남는 단일 rn (예: …**rn**당시, 한글.rn한글) — 단어 내부 rn 방지: 앞·뒤가 소문자 알파벳이 아닐 때
  s = s.replace(/(?<![A-Za-z])rn(?![a-z])/g, "\n")
  return s
}
