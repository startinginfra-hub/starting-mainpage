/** app.starting.kr `/career/privacy`의 개인정보처리방침과 문구가 같아야 한다 */
import type { ReactNode } from "react"

const sectionTitleClassName = "text-[15px] font-semibold text-zinc-900"
const bodyClassName = "mt-3 space-y-3 text-sm leading-7 text-neutral-700"
const listClassName = "list-disc space-y-3 pl-5 text-sm leading-7 text-neutral-700"

function PolicyItem({ value, title, children }: { value: string; title: string; children: ReactNode }) {
  return (
    <section id={value} className="scroll-mt-24 border-t border-zinc-100 pt-6 first:border-t-0 first:pt-0">
      <h2 className={sectionTitleClassName}>{title}</h2>
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}

function ProcessorBlock({
  name,
  work,
  country,
  retention,
}: {
  name: string
  work: string
  country: string
  retention: string
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 px-3.5 py-3 space-y-1.5">
      <p className="text-sm font-semibold text-neutral-900">{name}</p>
      <dl className="space-y-1 text-sm leading-snug text-neutral-700">
        <div className="flex gap-2">
          <dt className="shrink-0 font-medium text-neutral-800">위탁 업무 / 이전 항목</dt>
        </div>
        <dd className="pl-0">{work}</dd>
        <div className="flex gap-2 pt-1">
          <dt className="w-16 shrink-0 font-medium text-neutral-800">국가</dt>
          <dd>{country}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 font-medium text-neutral-800">보유 기간</dt>
          <dd>{retention}</dd>
        </div>
      </dl>
    </div>
  )
}

export function PartnerPrivacyContent() {
  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed text-neutral-500">
        2026년 10월 21일부터 적용 (공고일 2026년 10월 14일)
      </p>

      <p className="mb-6 text-sm leading-7 text-neutral-700">
        스타팅파트너스 주식회사(이하 &quot;회사&quot;)는 스타팅 커리어 서비스(이하 &quot;서비스&quot;) 이용자의
        개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 회사는 이
        개인정보처리방침을 통해 이용자가 제공하는 개인정보가 어떠한 목적과 방식으로 이용되고 있으며,
        개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
      </p>
      <p className="mb-6 text-sm leading-7 text-neutral-700">
        본 방침은 스타팅 커리어(개인용)에 적용되며, 회사가 별도로 제공하는 기업용 채용·매칭 서비스의
        개인정보 처리는 해당 서비스의 개인정보처리방침에 따릅니다.
      </p>

      <div className="mt-8 flex flex-col gap-6 border-t border-zinc-100 pt-8">
        <PolicyItem value="s1" title="1. 수집하는 개인정보 항목">
          <ul className={listClassName}>
            <li>
              <span className="font-medium text-neutral-900">회원가입·로그인(소셜 포함):</span> 계정
              식별자, 닉네임, 프로필 이미지(제공한 경우), 연결 해제에 필요한 인증 토큰, 로그인 세션
              정보
            </li>
            <li>
              <span className="font-medium text-neutral-900">서비스 이용:</span> 이용자가 입력한 이름
              또는 닉네임, 해석형 콘텐츠 제공에 필요한 정보(생년월일, 출생 시각, 성별, 양력·음력 여부
              등), 이용자가 직접 입력한 질문·고민, 생성된 분석 결과, 서비스 이용·열람 기록
            </li>
            <li>
              <span className="font-medium text-neutral-900">공유·초대 참여(비회원 포함):</span>{" "}
              참여자가 직접 입력한 이름 또는 닉네임, 생년월일, 출생 시각, 성별 등. 참여자의 원본
              정보는 다른 이용자에게 공개되지 않으며, 산출된 결과만 초대한 이용자에게 표시될 수
              있습니다.
            </li>
            <li>
              <span className="font-medium text-neutral-900">유료 서비스 결제:</span> 주문번호,
              결제금액·상태·승인정보. 카드번호 등 결제수단 원문 정보는 결제대행사를 통해 처리되며
              회사는 이를 보관하지 않습니다.
            </li>
            <li>
              <span className="font-medium text-neutral-900">파트너 서비스 이용 시:</span> 관심 직군, 소통
              이메일(선택 입력한 경우). 경력 인증을 신청한 경우 소속, 경력 연수, 주 사용 인재풀 채널, 경력
              확인 링크(선택), 증빙 파일(명함·재직/경력증명 등)
            </li>
            <li>
              <span className="font-medium text-neutral-900">고객센터 문의:</span> 문의 연락처(이메일
              등), 문의 내용, 상담 채널을 통한 상담 내용
            </li>
            <li>
              <span className="font-medium text-neutral-900">자동 수집:</span> 접속 로그, 쿠키, 서비스
              이용 기록(열람·검색 등), 기기 및 브라우저 정보
            </li>
          </ul>
        </PolicyItem>

        <PolicyItem value="s2" title="2. 개인정보의 수집 및 이용 목적">
          <ul className={listClassName}>
            <li>회원 관리 및 부정이용 방지(소셜 로그인 연동, 계정 식별)</li>
            <li>커리어 관련 정보 및 디지털 콘텐츠(해석형 콘텐츠 포함) 제공</li>
            <li>공유·초대 기능 운영 및 결과 제공</li>
            <li>유료 서비스 결제 처리, 결제 오류·환불 처리</li>
            <li>(파트너 서비스 이용 시) 파트너 등록·경력 인증 심사, 추천 기록 관리 및 추천 수수료 정산</li>
            <li>고객 문의 응대</li>
            <li>서비스 보안·장애 대응 및 품질 개선</li>
            <li>회원 탈퇴 시 소셜 로그인 연결 해제</li>
            <li>(선택 동의 시) 이벤트·혜택 등 프로모션 정보 안내</li>
          </ul>
        </PolicyItem>

        <PolicyItem value="s3" title="3. 개인정보의 보유 및 이용 기간">
          <ul className={listClassName}>
            <li>
              회원 정보, 서비스 이용 기록, 로그인 인증 토큰: 회원 탈퇴 시까지. 탈퇴 시 지체 없이
              삭제합니다.
            </li>
            <li>
              결제 기록: 전자상거래법상 보존 의무에 따라 5년간 보관하며, 탈퇴 시 개인 식별 정보와
              분리하여 보관합니다.
            </li>
            <li>
              공유·초대 참여 정보(비회원 포함): 초대·공유를 생성한 회원의 탈퇴 또는 해당 참여 정보
              삭제 시까지 보관하며, 참여자 본인이 언제든지 삭제를 요청할 수 있습니다.
            </li>
            <li>
              파트너 서비스 이용 정보(파트너 서비스 이용 시): 파트너 활동 종료 또는 회원 탈퇴 시까지. 추천
              수수료 정산 관련 기록은 관계 법령에 따른 기간 동안 보관합니다.
            </li>
            <li>
              고객센터 문의 및 상담 내역: 소비자 불만·분쟁처리 기록 보존을 위해 최대 3년간 보관 후
              파기합니다.
            </li>
            <li>
              접속 로그, 쿠키: 최대 30일간 보관 후 자동 파기합니다. 법령상 별도 보존 의무가 있는 경우
              그 기간 동안 보관할 수 있습니다.
            </li>
          </ul>
        </PolicyItem>

        <PolicyItem value="s4" title="4. 개인정보의 제3자 제공">
          <p>
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 이용자가 별도로
            동의하거나 법령에 특별한 규정이 있는 경우에는 예외로 합니다.
          </p>
        </PolicyItem>

        <PolicyItem value="s5" title="5. 개인정보 처리 위탁 및 국외 이전">
          <p>
            회사는 서비스 제공을 위해 아래 업체에 개인정보 처리를 위탁하고 있으며, 서비스 이용
            과정에서 암호화된 통신을 통해 국외로 이전될 수 있습니다. 국외 이전은 서비스 제공에 필요한
            범위에서 발생합니다. 구체 수탁자·업무는 아래와 같으며, 변경 시 이 방침을 개정하여
            안내합니다.
          </p>
          <div className="space-y-3">
            <ProcessorBlock
              name="수탁업체: Supabase Inc."
              work="데이터베이스·저장소 호스팅 및 인증 (회원·프로필·결제·분석 결과 등)"
              country="미국"
              retention="회원 탈퇴 시까지, 결제 기록은 5년"
            />
            <ProcessorBlock
              name="수탁업체: Vercel Inc."
              work="웹 호스팅, 서버 로그, 접속 IP"
              country="미국"
              retention="최대 30일"
            />
            <ProcessorBlock
              name="수탁업체: Google LLC (생성형 AI)"
              work="콘텐츠 생성·분석 처리(이용자가 입력한 정보 등). 입력·출력은 수탁자 유료 API·계약 정책에 따라 처리되며, 상세는 해당 정책에 따름"
              country="미국"
              retention="수탁자 유료 API 데이터 처리 정책에 따름"
            />
            <ProcessorBlock
              name="수탁업체: 페이플 주식회사 (PayPle)"
              work="결제대행 (결제승인·취소·환불 처리)"
              country="대한민국"
              retention="전자상거래법에 따라 5년"
            />
            <ProcessorBlock
              name="수탁업체: 채널코퍼레이션 (채널톡)"
              work="고객상담 채널 운영 (문의 접수 및 상담)"
              country="대한민국"
              retention="상담 종료 후 최대 3년"
            />
          </div>
        </PolicyItem>

        <PolicyItem value="s6" title="6. 개인정보의 파기">
          <p>
            회사는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우 해당 개인정보를 지체 없이
            파기합니다. 전자적 파일 형태로 저장된 개인정보는 복구할 수 없는 기술적 방법을 사용하여
            삭제하며, 종이에 출력된 개인정보는 분쇄하거나 소각하여 파기합니다.
          </p>
        </PolicyItem>

        <PolicyItem value="s7" title="7. 이용자의 권리">
          <p>이용자는 언제든지 자신의 개인정보에 대해 다음의 권리를 행사할 수 있습니다.</p>
          <ul className={listClassName}>
            <li>개인정보 열람 요청</li>
            <li>오류 등이 있을 경우 정정 요청</li>
            <li>삭제 요청</li>
            <li>처리 정지 요청</li>
          </ul>
          <p>
            이용자는 서비스 내 설정 화면 또는 고객센터(이메일, 상담 채널)를 통해 위 권리를 행사할 수
            있으며, 회원 탈퇴 시 개인정보와 서비스 이용 기록을 삭제하고 소셜 로그인 연결도 해제합니다.
            다만 법령상 보존 의무가 있는 결제 기록은 개인 식별 정보를 분리한 뒤 별도로 보관합니다.
          </p>
        </PolicyItem>

        <PolicyItem value="s8" title="8. 쿠키의 사용">
          <p>
            서비스는 로그인 세션 유지 등 필수적인 목적으로 쿠키를 사용할 수 있습니다. 이용자는
            브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우 로그인 등 서비스 이용에 제한이
            있을 수 있습니다. 회사가 선택적 분석·광고 목적의 쿠키 또는 유사 기술을 도입하는 경우, 이
            방침을 개정하여 안내하고 관련 법령에 따라 필요한 동의를 받습니다.
          </p>
        </PolicyItem>

        <PolicyItem value="s9" title="9. 개인정보 보호책임자">
          <dl className="space-y-1.5 text-sm leading-snug text-neutral-700">
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 font-medium text-neutral-900">성명</dt>
              <dd>김홍찬</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 font-medium text-neutral-900">직위</dt>
              <dd>대표이사</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 font-medium text-neutral-900">전화</dt>
              <dd>1688-7360</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 font-medium text-neutral-900">이메일</dt>
              <dd>support@starting.kr</dd>
            </div>
          </dl>
          <p>
            개인정보 관련 문의·요청은 위 연락처로 접수해주시면 신속히 답변드리겠습니다.
          </p>
        </PolicyItem>

        <PolicyItem value="s10" title="10. 개인정보 침해 구제">
          <p>개인정보 침해에 대한 신고나 상담이 필요한 경우 아래 기관에 문의하실 수 있습니다.</p>
          <ul className={listClassName}>
            <li>개인정보침해 신고센터: privacy.kisa.or.kr / (국번없이) 118</li>
            <li>개인정보 분쟁조정위원회: kopico.go.kr / 1833-6972</li>
            <li>대검찰청 사이버범죄수사단: www.spo.go.kr / 1301</li>
            <li>경찰청 사이버수사국: ecrm.cyber.go.kr / 182</li>
          </ul>
        </PolicyItem>

        <PolicyItem value="appendix" title="부칙">
          <p>이 개인정보처리방침은 2026년 10월 14일에 공고하고, 2026년 10월 21일부터 적용합니다.</p>
          <p>이전 개인정보처리방침은 2026년 9월 11일부터 2026년 10월 20일까지 적용됩니다.</p>
        </PolicyItem>

        <PolicyItem value="company" title="회사 정보">
          <dl className="space-y-1.5 text-sm leading-snug text-neutral-700">
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 font-medium text-neutral-900">상호</dt>
              <dd>스타팅파트너스 주식회사</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 font-medium text-neutral-900">대표이사</dt>
              <dd>김홍찬</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 font-medium text-neutral-900">사업자등록번호</dt>
              <dd>313-88-02066</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 font-medium text-neutral-900">통신판매업신고번호</dt>
              <dd>2025-서울광진-0701</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 font-medium text-neutral-900">본사</dt>
              <dd>서울특별시 광진구 능동로 81, 3층</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 font-medium text-neutral-900">지사(연구소)</dt>
              <dd>서울특별시 중구 퇴계로 15, 5층</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 font-medium text-neutral-900">고객센터</dt>
              <dd>1688-7360</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 font-medium text-neutral-900">이메일</dt>
              <dd>support@starting.kr</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 font-medium text-neutral-900">개인정보 보호책임자</dt>
              <dd>김홍찬 (대표이사)</dd>
            </div>
          </dl>
        </PolicyItem>
      </div>
    </div>
  )
}
