const policyTableClassName =
  "w-full border-collapse text-left text-xs leading-relaxed text-neutral-700 [&_th]:border [&_th]:border-neutral-200 [&_th]:bg-neutral-50 [&_th]:px-2 [&_th]:py-1.5 [&_th]:font-semibold [&_td]:border [&_td]:border-neutral-200 [&_td]:px-2 [&_td]:py-1.5 [&_td]:align-top"

const sectionTitleClassName = "mt-6 text-sm font-semibold text-neutral-900 first:mt-0"
const bodyClassName = "mt-2 space-y-2 text-sm leading-relaxed text-neutral-700"
const listClassName = "mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-neutral-700"

export function PrivacyPolicyContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-neutral-700">
        스타팅파트너스 주식회사(이하 &quot;회사&quot;)은 『개인정보보호법』, 『정보통신망 이용촉진 및 정보보호 등에
        관한 법률』 등 관련 법령을 준수하며, 이용자의 개인정보를 소중히 보호하고 권익을 지키기 위해 아래와 같은
        개인정보처리방침을 수립·공개합니다.
      </p>
      <p className="text-sm leading-relaxed text-neutral-700">
        본 방침은 회사가 운영하는 헤드헌팅 솔루션(웹, 모바일웹·앱 포함) 및 연계 서비스(이하 &apos;서비스&apos;)에
        적용됩니다.
      </p>

      <section>
        <h3 className={sectionTitleClassName}>제1조 (수집하는 개인정보 항목 및 수집 방법)</h3>
        <div className={bodyClassName}>
          <p>
            ① 회사는 기업 고객사(회원) 및 개인 인재(비회원)의 원활한 서비스 이용과 관리를 위해 아래의 개인정보를
            수집합니다.
          </p>
          <div className="overflow-x-auto">
            <table className={policyTableClassName}>
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">기업회원</th>
                  <th scope="col">개인회원(비회원)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">필수</th>
                  <td>기업명, 담당자명, 담당자 연락처(이메일, 전화번호)</td>
                  <td>이름, 이메일, 전화번호</td>
                </tr>
                <tr>
                  <th scope="row">선택</th>
                  <td>채용 관련 정보 일체</td>
                  <td>채용 관련 정보 일체</td>
                </tr>
                <tr>
                  <th scope="row">자동 수집</th>
                  <td>IP주소, 쿠키, 방문일시, 기기정보(OS, 브라우저), 서비스 이용로그</td>
                  <td>IP주소, 쿠키, 방문일시, 기기정보(OS, 브라우저), 서비스 이용로그</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>② 수집 방법:</p>
          <p>
            홈페이지, 모바일 앱, 서면양식, 전화/이메일/팩스 접수, 고객센터 문의, 자동 생성정보 수집 도구 등
          </p>
          <p>③ 회사는 원칙적으로 민감정보는 수집하지 않으나, 부득이한 경우 이용자의 별도 동의를 받습니다.</p>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제2조 (개인정보의 이용 목적)</h3>
        <div className="overflow-x-auto">
          <table className={policyTableClassName}>
            <thead>
              <tr>
                <th scope="col">대상</th>
                <th scope="col">이용 목적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">기업회원</th>
                <td>
                  <ul className="list-disc space-y-0.5 pl-4">
                    <li>회원가입 및 관리</li>
                    <li>채용공고 등록 및 지원자 관리</li>
                    <li>채용절차 진행 및 결과 통보</li>
                    <li>계약 이행 및 고객지원</li>
                    <li>서비스 품질 개선 및 통계 분석</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row">비회원 인재</th>
                <td>
                  <ul className="list-disc space-y-0.5 pl-4">
                    <li>인재 추천 및 채용절차 지원</li>
                    <li>이력서 접수 및 기업 전달</li>
                    <li>지원자 관리 및 결과 안내</li>
                    <li>문의 및 상담 처리</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row">공통</th>
                <td>
                  <ul className="list-disc space-y-0.5 pl-4">
                    <li>법령 준수 및 의무 이행</li>
                    <li>맞춤형 정보 제공, 통계분석</li>
                    <li>이벤트·프로모션 안내(마케팅 동의 시)</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제3조 (개인정보의 보유 및 이용기간)</h3>
        <div className={bodyClassName}>
          <p>① 원칙적으로 수집·이용 목적 달성 후 즉시 파기합니다.</p>
          <p>② 단, 아래의 경우에는 관계 법령에 따라 일정 기간 보관할 수 있습니다.</p>
          <div className="overflow-x-auto">
            <table className={policyTableClassName}>
              <thead>
                <tr>
                  <th scope="col">보존 항목</th>
                  <th scope="col">보존 근거</th>
                  <th scope="col">보존 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>계약·청약철회 기록</td>
                  <td>전자상거래법</td>
                  <td>5년</td>
                </tr>
                <tr>
                  <td>대금결제·재화공급 기록</td>
                  <td>전자상거래법</td>
                  <td>5년</td>
                </tr>
                <tr>
                  <td>소비자 불만·분쟁처리 기록</td>
                  <td>전자상거래법</td>
                  <td>3년</td>
                </tr>
                <tr>
                  <td>서비스 접속 기록(로그기록)</td>
                  <td>통신비밀보호법</td>
                  <td>3개월</td>
                </tr>
                <tr>
                  <td>부정이용 기록</td>
                  <td>회사 내부 방침</td>
                  <td>1년</td>
                </tr>
                <tr>
                  <td>수사·조사 관련 기록</td>
                  <td>관련 법령</td>
                  <td>종료 시까지</td>
                </tr>
                <tr>
                  <td>채용지원서 및 이력서</td>
                  <td>내부 방침</td>
                  <td>채용확정 후 최대 5년 이내 또는 이용자 요청 시 즉시 삭제</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제4조 (이용자 권리 및 행사 방법)</h3>
        <ul className={listClassName}>
          <li>기업회원(담당자)은 언제든지 개인정보 열람·정정·삭제·처리정지·동의철회를 요청할 수 있습니다.</li>
          <li>비회원 인재도 이력서 삭제, 추천 철회 등을 요청할 수 있으며 본인확인 후 즉시 처리됩니다.</li>
          <li>권리행사는 홈페이지, 이메일, 고객센터 문의 등을 통해 가능합니다.</li>
          <li>법령상 제한 사유가 있을 경우 일부 권리행사가 제한될 수 있습니다.</li>
        </ul>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제5조 (개인정보의 제3자 제공)</h3>
        <div className={bodyClassName}>
          <p>① 회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다.</p>
          <p>② 단, 아래의 경우는 예외입니다.</p>
          <ul className={listClassName}>
            <li>법령에 의한 의무 이행 또는 수사기관 요청 시</li>
            <li>이용자 본인의 동의가 있는 경우</li>
            <li>통계·연구 목적으로 특정 개인을 식별할 수 없는 형태로 제공하는 경우</li>
          </ul>
          <p>③ 채용 매칭 제공 예시</p>
          <div className="overflow-x-auto">
            <table className={policyTableClassName}>
              <thead>
                <tr>
                  <th scope="col">제공받는 자</th>
                  <th scope="col">제공 목적</th>
                  <th scope="col">제공 항목</th>
                  <th scope="col">보유·이용 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>기업회원(채용사)</td>
                  <td>입사지원자 검토 및 채용절차 진행</td>
                  <td>이력서, 경력·자격·연락처 등</td>
                  <td>채용확정 후 5년 이내</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제6조 (개인정보 처리위탁)</h3>
        <div className="overflow-x-auto">
          <table className={policyTableClassName}>
            <thead>
              <tr>
                <th scope="col">수탁 업체</th>
                <th scope="col">위탁 업무</th>
                <th scope="col">보유·이용 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>㈜비즈온커뮤니케이션</td>
                <td>계약·문서 발송</td>
                <td>탈퇴 또는 위탁계약 종료 시</td>
              </tr>
              <tr>
                <td>㈜채널코퍼레이션</td>
                <td>고객상담 시스템 운영</td>
                <td>탈퇴 또는 위탁계약 종료 시</td>
              </tr>
              <tr>
                <td>㈜페이플</td>
                <td>결제처리</td>
                <td>탈퇴 또는 위탁계약 종료 시</td>
              </tr>
              <tr>
                <td>스티비㈜</td>
                <td>이메일·문자 발송</td>
                <td>탈퇴 또는 위탁계약 종료 시</td>
              </tr>
              <tr>
                <td>㈜카카오</td>
                <td>알림톡 발송</td>
                <td>탈퇴 또는 위탁계약 종료 시</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제7조 (개인정보 파기 절차 및 방법)</h3>
        <ul className={listClassName}>
          <li>절차: 목적 달성 후 별도 DB로 이관 → 내부 방침 및 법령에 따른 보관 후 파기</li>
          <li>방법: 전자파일은 복구 불가능한 방법으로 영구 삭제, 출력물은 분쇄 또는 소각</li>
        </ul>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제8조 (쿠키 등 자동수집 장치 운영 및 거부)</h3>
        <ul className={listClassName}>
          <li>쿠키는 접속빈도 분석, 맞춤형 정보 제공 등을 위해 사용됩니다.</li>
          <li>이용자는 웹 브라우저 설정에서 쿠키 저장 거부 또는 삭제가 가능합니다.</li>
          <li>쿠키 거부 시 일부 서비스 이용에 제한이 있을 수 있습니다.</li>
        </ul>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제9조 (개인정보 보호를 위한 기술적·관리적 대책)</h3>
        <ul className={listClassName}>
          <li>개인정보 암호화 및 접근권한 최소화</li>
          <li>최신 보안 시스템 및 방화벽 운영</li>
          <li>개인정보 처리기록 점검 및 정기 교육 실시</li>
        </ul>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제10조 (개인정보보호책임자 및 문의처)</h3>
        <div className={bodyClassName}>
          <p>책임자: 김홍찬 대표</p>
          <p>연락처: support@starting.kr</p>
          <p>개인정보 관련 불만·침해 신고는 아래 기관을 통해서도 가능합니다.</p>
          <ul className={listClassName}>
            <li>개인정보침해신고센터: ☎ 118 / privacy.kisa.or.kr</li>
            <li>개인정보분쟁조정위원회: ☎ 1833-6972 / www.kopico.go.kr</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제11조 (고지 및 시행일)</h3>
        <p className={bodyClassName}>
          본 방침은 공고일자: 2025년 06월 19일 / 시행일자: 2025년 06월 19일이며, 내용 변경 시 최소 7일 전
          공지하고, 중요한 변경은 30일 전부터 공지합니다.
        </p>
      </section>
    </div>
  )
}
