import {
  bodyClassName,
  listClassName,
  policyTableClassName,
  sectionTitleClassName,
} from "@/app/components/legal/privacy-policy-styles"

export function PrivacyPolicyContentCurrent() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-neutral-700">
        스타팅파트너스 주식회사(이하 &quot;회사&quot;라 한다)는 「개인정보 보호법」 등 관련 법령을 준수하며,
        정보주체의 개인정보를 보호하고 그 권익을 보장하기 위하여 같은 법 제30조에 따라 아래와 같은 개인정보
        처리방침을 수립·공개합니다.
      </p>
      <p className="text-sm leading-relaxed text-neutral-700">
        본 방침은 회사가 운영하는 헤드헌팅 솔루션(웹, 모바일웹·앱 포함) 및 연계 서비스(이하 &apos;서비스&apos;)에
        적용됩니다.
      </p>

      <section>
        <h3 className={sectionTitleClassName}>제1조 (수집하는 개인정보 항목 및 수집 방법)</h3>
        <div className={bodyClassName}>
          <p>
            ① 회사는 기업 고객사(회원) 및 인재(후보자)의 원활한 서비스 이용과 관리를 위해 아래의 개인정보를
            수집합니다.
          </p>
          <div className="overflow-x-auto">
            <table className={policyTableClassName}>
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">기업회원</th>
                  <th scope="col">인재(후보자)</th>
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
                  <td>채용공고 내용, 직무기술서, 채용 담당 부서 및 직위, 채용 조건에 관한 정보</td>
                  <td>
                    생년월일, 성별, 거주지역, 학력, 경력사항(재직회사·직위·재직기간·담당업무), 보유 기술 및 자격,
                    어학 능력, 현재 및 희망 연봉, 희망 근무조건, 포트폴리오, 이력서·경력기술서에 기재된 정보
                  </td>
                </tr>
                <tr>
                  <th scope="row">자동 수집</th>
                  <td>IP주소, 쿠키, 방문일시, 기기정보(OS, 브라우저), 서비스 이용로그</td>
                  <td>IP주소, 쿠키, 방문일시, 기기정보(OS, 브라우저), 서비스 이용로그</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>② 수집 방법</p>
          <p>
            홈페이지, 모바일 앱, 서면양식, 전화/이메일/팩스 접수, 고객센터 문의, 자동 생성정보 수집 도구, 인재정보
            제공 플랫폼 등 제휴 채널, 정보주체가 공개한 온라인 프로필, 제3자의 추천 등
          </p>
          <p>
            ③ 회사는 원칙적으로 장애여부, 건강에 관한 정보 등 민감정보는 수집하지 않으나, 부득이한 경우 이용자의
            별도 동의를 받습니다.
          </p>
          <p>
            ④ 회사는 주민등록번호 등 「개인정보 보호법」 제24조의 고유식별정보를 수집하지 아니합니다. 다만 법령에서
            구체적으로 요구하는 경우에는 별도의 동의를 받거나 근거 법률에 따라 수집할 수 있습니다.
          </p>
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
                <th scope="row">인재(후보자)</th>
                <td>
                  <ul className="list-disc space-y-0.5 pl-4">
                    <li>인재 추천 및 채용절차 지원</li>
                    <li>이력서 접수 및 기업 전달</li>
                    <li>지원자 관리 및 결과 안내</li>
                    <li>문의 및 상담 처리</li>
                    <li>직무 적합도 평가</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row">공통</th>
                <td>
                  <ul className="list-disc space-y-0.5 pl-4">
                    <li>법령 준수 및 의무 이행</li>
                    <li>부정이용 방지 및 조치</li>
                    <li>분쟁 대응 및 소송과 수사 절차 대응</li>
                    <li>맞춤형 정보 제공, 통계분석, 오류 대응</li>
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
          <p>① 원칙적으로 수집·이용 목적 달성 후 지체 없이 파기합니다.</p>
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
                  <td>계약·거래에 관한 기록</td>
                  <td>「상법」 제33조</td>
                  <td>10년</td>
                </tr>
                <tr>
                  <td>대금결제·세금계산서 등 거래증빙</td>
                  <td>「국세기본법」 제85조의3, 「부가가치세법」</td>
                  <td>5년</td>
                </tr>
                <tr>
                  <td>고객 문의</td>
                  <td>「개인정보 보호법」 제15조 제1항 제6호(회사의 정당한 이익)</td>
                  <td>3년</td>
                </tr>
                <tr>
                  <td>서비스 접속 기록(로그기록)</td>
                  <td>통신비밀보호법</td>
                  <td>3개월</td>
                </tr>
                <tr>
                  <td>부정이용 기록</td>
                  <td>「개인정보 보호법」 제15조 제1항 제6호(회사의 정당한 이익)</td>
                  <td>1년</td>
                </tr>
                <tr>
                  <td>수사·조사 관련 기록</td>
                  <td>관련 법령</td>
                  <td>
                    수사·소송·분쟁 또는 행정조사가 진행 중인 경우에는 해당 절차의 종료 시까지 보관할 수 있으며,
                    절차 종료 후에는 법령상 보존기간 또는 분쟁 대응에 필요한 기간이 지나면 지체 없이 파기
                  </td>
                </tr>
                <tr>
                  <td>기업 고객사(회원) 담당자 정보</td>
                  <td>계약 이행 및 회원 관리</td>
                  <td>회원 탈퇴 또는 이용계약 종료시까지(다른 법령상 보존기간이 있는 경우 그 기간)</td>
                </tr>
                <tr>
                  <td>인재(후보자)의 이력서 및 채용 관련 정보</td>
                  <td>추천 서비스 제공 및 재추천</td>
                  <td>
                    최종 추천·연락일로부터 3년, 채용이 확정된 경우 채용확정일로부터 5년, 정보주체의
                    삭제·처리정지 요구 시 즉시 파기
                  </td>
                </tr>
                <tr>
                  <td>채용성사 확인자료</td>
                  <td>크레딧 차감 및 정산의 적정성 확인</td>
                  <td>차감 처리 후 3년</td>
                </tr>
                <tr>
                  <td>환불, 크레딧 복구 심사 자료</td>
                  <td>심사 및 분쟁 대응</td>
                  <td>심사 종료 후 3년</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제3조의2 (개인정보의 국외 이전)</h3>
        <div className={bodyClassName}>
          <p>
            회사는 인공지능 분석을 위하여 아래와 같이 개인정보를 국외로 이전합니다. 회사는 「개인정보 보호법」
            제28조의8 제1항 제3호에 따라 계약의 이행 및 정보주체에 대한 편의 제공에 필요한 범위에서, 다음 사항을
            본 처리방침에 공개함으로써 국외 이전을 합니다.
          </p>
          <div className="overflow-x-auto">
            <table className={policyTableClassName}>
              <tbody>
                <tr>
                  <th scope="row">이전받는 자</th>
                  <td>Google LLC (Gemini API)</td>
                </tr>
                <tr>
                  <th scope="row">연락처</th>
                  <td>
                    Google LLC 개인정보 보호 문의 창구(
                    <a
                      href="https://support.google.com/policies"
                      className="underline underline-offset-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://support.google.com/policies
                    </a>
                    )
                  </td>
                </tr>
                <tr>
                  <th scope="row">이전되는 국가</th>
                  <td>미국 등 Google LLC가 데이터를 처리하는 국가</td>
                </tr>
                <tr>
                  <th scope="row">이전 일시 및 방법</th>
                  <td>후보자 정보에 대한 분석이 필요한 시점에 정보통신망을 통한 암호화 전송</td>
                </tr>
                <tr>
                  <th scope="row">이전되는 개인정보 항목</th>
                  <td>
                    경력사항, 학력, 보유 기술 및 자격, 어학 능력, 희망 근무조건 등 직무 관련 정보. 회사는 성명,
                    연락처, 생년월일 등 개인을 직접 식별할 수 있는 정보를 제외하고 이전합니다.
                  </td>
                </tr>
                <tr>
                  <th scope="row">이전받는 자의 이용 목적</th>
                  <td>직무 적합도 분석 등 인공지능 분석 결과의 생성</td>
                </tr>
                <tr>
                  <th scope="row">보유·이용 기간</th>
                  <td>분석 목적 달성 시까지</td>
                </tr>
                <tr>
                  <th scope="row">이전 거부 방법 및 절차</th>
                  <td>
                    정보주체는 제10조의 연락처로 국외 이전의 거부를 요청할 수 있습니다. 다만 이 경우 인공지능
                    분석을 통한 추천 서비스의 일부가 제한될 수 있습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제4조 (이용자 권리 및 행사 방법)</h3>
        <div className={bodyClassName}>
          <p>① 기업회원(담당자)은 언제든지 개인정보 열람·정정·삭제·처리정지·동의철회를 요청할 수 있습니다.</p>
          <p>② 인재(후보자)도 이력서 삭제, 추천 철회 등을 요청할 수 있으며 본인확인 후 처리됩니다.</p>
          <p>③ 권리행사는 홈페이지, 이메일, 고객센터 문의 등을 통해 가능합니다.</p>
          <p>④ 법령상 제한 사유가 있을 경우 일부 권리행사가 제한될 수 있습니다.</p>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제5조 (개인정보의 제3자 제공)</h3>
        <div className={bodyClassName}>
          <p>① 회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다.</p>
          <p>② 단, 아래의 경우는 예외입니다.</p>
          <ul className={listClassName}>
            <li>법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</li>
            <li>수사기관이 법원이 발부한 영장 등 법령에 근거한 적법한 절차에 따라 요구하는 경우</li>
            <li>이용자 본인의 동의가 있는 경우</li>
            <li>통계·연구 목적으로 특정 개인을 식별할 수 없는 형태로 제공하는 경우</li>
          </ul>
          <p>③ 채용 추천에 따른 제3자 제공</p>
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
                  <td>후보자를 추천받는 고객사(추천 시마다 개별적으로 특정하여 고지합니다)</td>
                  <td>후보자 추천</td>
                  <td>
                    성명, 연락처, 이메일, 학력, 경력사항, 보유 기술 및 자격, 희망 근무조건, 이력서 및 경력기술서
                  </td>
                  <td>
                    채용절차 종료 후 지체 없이 파기. 다만 채용이 확정된 경우에는 근로관계 관련 법령에서 정한 기간
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            ④ 회사는 후보자를 특정 고객사에 추천하기 전에 해당 고객사의 명칭, 제공 항목, 제공 목적 및 보유·이용
            기간을 후보자에게 개별적으로 알리고 동의를 받은 후에 제공합니다. 후보자가 동의하지 아니하는 경우 회사는
            해당 고객사에 후보자의 개인정보를 제공하지 아니하며, 이를 이유로 후보자에게 불이익을 주지 아니합니다.
          </p>
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
              <tr>
                <td>Google LLC</td>
                <td>인공지능을 이용한 후보자 정보 분석(국외 이전에 관하여는 제3조의2)</td>
                <td>분석 목적 달성 시까지</td>
              </tr>
              <tr>
                <td>Supabase, Inc.</td>
                <td>서비스 시스템의 운영 및 데이터 저장</td>
                <td>탈퇴 또는 위탁계약 종료 시</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제6조의2 (가명정보의 처리)</h3>
        <div className={bodyClassName}>
          <p>
            ① 회사는 통계작성, 과학적 연구, 공익적 기록보존 등을 위하여 정보주체의 동의 없이 개인정보를
            가명처리하여 처리할 수 있습니다.
          </p>
          <p>② 가명정보의 처리에 관한 사항은 다음과 같습니다.</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-neutral-700">
            <li>처리 목적: 인재 추천 알고리즘의 성능 개선 및 검증, 채용시장 동향에 관한 통계의 작성</li>
            <li>처리 항목: 경력사항, 직무, 학력, 보유 기술 및 자격, 근무 지역, 연봉 구간 등</li>
            <li>보유 기간: 처리 목적 달성 시까지</li>
          </ol>
          <p>
            ③ 회사는 가명정보를 처리하는 과정에서 특정 개인을 알아보기 위한 목적으로 정보를 처리하지 아니하며,
            「개인정보 보호법」 제28조의2부터 제28조의7까지의 규정에 따른 안전성 확보조치 및 기록 보관 의무를
            이행합니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제7조 (개인정보 파기 절차 및 방법)</h3>
        <div className={bodyClassName}>
          <p>① 절차: 목적 달성 후 별도 DB로 이관 → 내부 방침 및 법령에 따른 보관 후 파기</p>
          <p>② 방법: 전자파일은 복구 불가능한 방법으로 영구 삭제, 출력물은 분쇄 또는 소각</p>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제8조 (쿠키 등 자동수집 장치 운영 및 거부)</h3>
        <div className={bodyClassName}>
          <p>① 쿠키는 접속빈도 분석, 맞춤형 정보 제공 등을 위해 사용됩니다.</p>
          <p>② 이용자는 웹 브라우저 설정에서 쿠키 저장 거부 또는 삭제가 가능합니다.</p>
          <p>③ 쿠키 거부 시 일부 서비스 이용에 제한이 있을 수 있습니다.</p>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제9조 (개인정보 보호를 위한 기술적·관리적 대책)</h3>
        <p className={bodyClassName}>
          회사는 「개인정보 보호법」 제29조 및 같은 법 시행령 제30조에 따라 개인정보 암호화 및 접근권한 최소화,
          최신 보안 시스템 및 방화벽 운영, 개인정보 처리기록 점검 및 정기 교육 실시 등의 안전성 확보조치를 하고
          있습니다.
        </p>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제9조의2 (개인정보 유출 등의 통지·신고)</h3>
        <p className={bodyClassName}>
          회사는 개인정보의 분실·도난·유출을 알게 되었을 때에는 「개인정보 보호법」 제34조 및 같은 법 시행령
          제39조·제40조에 따라 정보주체에게 지체 없이 그 사실을 알리고, 필요한 경우 개인정보보호위원회 또는
          한국인터넷진흥원에 신고하며, 피해를 최소화하기 위한 대책을 마련하여 시행합니다.
        </p>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제10조 (개인정보보호책임자 및 문의처)</h3>
        <div className={bodyClassName}>
          <p>
            ① 회사는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
            피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className={policyTableClassName}>
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">개인정보 보호책임자</th>
                  <td>성명: 김홍찬 / 직위: 대표이사</td>
                </tr>
                <tr>
                  <th scope="row">연락처</th>
                  <td>전화: 1688-7360 / 이메일: support@starting.kr</td>
                </tr>
                <tr>
                  <th scope="row">개인정보 열람청구 접수·처리 부서</th>
                  <td>부서명: CS / 전화: 1688-7360 / 이메일: support@starting.kr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            ② 정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁해결이나 상담 등을 신청할 수
            있습니다.
          </p>
          <ul className={listClassName}>
            <li>개인정보침해신고센터: ☎ 118 / privacy.kisa.or.kr</li>
            <li>개인정보분쟁조정위원회: ☎ 1833-6972 / www.kopico.go.kr</li>
            <li>대검찰청 사이버수사과: ☎ 1301 / www.spo.go.kr</li>
            <li>경찰청 국가수사본부 사이버범죄 신고시스템: ☎ 182 / ecrm.police.go.kr</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className={sectionTitleClassName}>제11조 (고지 및 시행일)</h3>
        <div className={bodyClassName}>
          <p>
            ① 본 방침은 공고일자 2026년 8월 24일, 시행일자 2026년 9월 23일부터 적용됩니다.
          </p>
          <p>
            ② 회사는 본 처리방침의 내용을 변경하는 경우 변경 사항의 시행일자와 변경된 내용을 시행일자로부터 최소
            7일 전에 공지합니다. 다만 수집하는 개인정보의 항목, 이용 목적, 제3자 제공, 처리위탁, 국외 이전,
            보유기간 등 정보주체의 권리에 중대한 영향을 미치는 변경의 경우에는 최소 30일 전에 공지하고, 필요한
            경우 별도의 동의를 받습니다.
          </p>
          <p>
            ③ 회사는 처리방침을 변경하는 경우 정보주체가 변경 전후의 내용을 쉽게 비교하여 확인할 수 있도록
            공개하며, 종전의 처리방침은 홈페이지 내 개인정보 처리방침 페이지에서 확인할 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  )
}
