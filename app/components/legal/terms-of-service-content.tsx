const policyTableClassName =
  "w-full border-collapse text-left text-xs leading-relaxed text-neutral-700 [&_th]:border [&_th]:border-neutral-200 [&_th]:bg-neutral-50 [&_th]:px-2 [&_th]:py-1.5 [&_th]:font-semibold [&_td]:border [&_td]:border-neutral-200 [&_td]:px-2 [&_td]:py-1.5 [&_td]:align-top"

const chapterTitleClassName = "mt-8 text-base font-semibold text-neutral-900 first:mt-0"
const sectionTitleClassName = "mt-6 text-sm font-semibold text-neutral-900"
const bodyClassName = "mt-2 space-y-2 text-sm leading-relaxed text-neutral-700"
const listClassName = "mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-neutral-700"
const orderedListClassName = "mt-1 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-neutral-700"

export function TermsOfServiceContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-neutral-900">
        스타팅파트너스 주식회사 AI 채용 서비스 이용약관
      </h2>

      <section>
        <h3 className={chapterTitleClassName}>총칙</h3>

        <h4 className={sectionTitleClassName}>제1조 (목적)</h4>
        <p className={bodyClassName}>
          본 약관은 스타팅파트너스 주식회사(이하 회사)가 제공하는 AI 기반 채용 서비스(이하 서비스)의 이용에 관하여
          회사와 서비스를 이용하는 기업 고객(이하 고객사) 사이의 권리 의무 및 기타 필요한 사항을 정함을 목적으로
          한다.
        </p>

        <h4 className={sectionTitleClassName}>제2조 (고객사 회원의 약관 동의)</h4>
        <ol className={orderedListClassName}>
          <li>
            본 서비스는 고객사 단위로 계약이 체결되며, 고객사 소속 임직원(이하 이용자) 중 1인이 서비스에 로그인하여
            본 약관에 동의하는 경우, 이는 해당 고객사를 대리하여 동의한 것으로 본다.
          </li>
          <li>
            이용자는 본인이 소속 고객사를 대리하여 본 약관에 동의할 권한이 있음을 진술하고 보증하며, 그 권한의 진위
            여부에 대한 책임은 해당 고객사 및 이용자 본인에게 있다.
          </li>
          <li>
            회사는 이용자의 대리 권한 유무를 개별적으로 확인할 의무를 지지 않으며, 대리권의 부존재로 인하여 발생하는
            손해에 대해 책임을 지지 않는다. 다만 회사가 대리권 없음을 명백히 알았거나 중대한 과실로 알지 못한 경우에는
            그러하지 아니하다.
          </li>
          <li>회사는 동의 시점의 계정 정보, 소속 고객사 정보, 동의 일시, 약관 버전을 기록하여 보관한다.</li>
        </ol>

        <h4 className={sectionTitleClassName}>제3조 (약관의 효력 및 개정)</h4>
        <ol className={orderedListClassName}>
          <li>본 약관은 제2조에 따라 고객사가 동의함으로써 효력이 발생한다.</li>
          <li>본 약관은 제10조에 따라 핵심조항과 일반조항으로 구성되며, 각 조항의 개정 절차는 제10조 및 본조에 따른다.</li>
          <li>
            다음 각 호에 해당하는 사항을 변경하는 경우, 회사는 적용 일자로부터 최소 30일 전에 고객사에게 고지하고,
            고객사로부터 개정 내용에 대한 동의를 다시 받는다.
            <ul className={listClassName}>
              <li>결제방식의 종류, 크레딧 단가, 최소 충전 금액, 크레딧 차감 기준 및 시점</li>
              <li>일반결제 수수료 금액</li>
              <li>환불 사유, 환불율, 크레딧 복구 조건</li>
              <li>후보자지위 인정 기간 및 우회채용 시 수수료 지급 의무</li>
              <li>계약 해지 조건, 손해배상 범위</li>
              <li>그 밖에 고객사의 금전적 부담 또는 법적 의무를 불리하게 변경하는 사항</li>
            </ul>
          </li>
          <li>
            제3항에 해당하지 않는 사항의 변경은 적용 일자로부터 최소 30일 전 고지로 효력이 발생하며 별도 동의 절차를
            요하지 않는다.
          </li>
          <li>
            고객사가 개정 약관의 적용 일자 이후에도 서비스를 계속 이용하는 경우 개정된 내용에 동의한 것으로 본다. 다만
            고객사가 동의하지 않는 경우 서비스 이용을 중단하고 이용계약을 해지할 수 있다.
          </li>
          <li>
            이미 제8조에 따라 이용계약이 유효하게 성립한 고객사가 본조 제3항에 따라 재동의하는 경우, 이는 기존
            이용계약을 유지하기 위한 절차로서 제8조에 따른 별도의 승인 절차를 다시 거치지 아니한다.
          </li>
        </ol>
      </section>

      <section>
        <h3 className={chapterTitleClassName}>핵심조항 (재동의 대상)</h3>

        <h4 className={sectionTitleClassName}>제4조 (결제방식 및 수수료)</h4>
        <ol className={orderedListClassName}>
          <li>
            서비스 결제방식은 다음과 같이 구분한다.
            <div className="mt-2 overflow-x-auto">
              <table className={policyTableClassName}>
                <thead>
                  <tr>
                    <th scope="col">구분</th>
                    <th scope="col">내용</th>
                    <th scope="col">결제수단</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">크레딧결제</th>
                    <td>사전에 충전한 크레딧에서 채용 성사 시 자동 차감하는 방식</td>
                    <td>크레딧 충전 잔액에서 차감</td>
                  </tr>
                  <tr>
                    <th scope="row">일반결제</th>
                    <td>채용 성사 후 수수료를 청구하는 후불 방식</td>
                    <td>카드 결제, 계좌이체</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>크레딧 충전은 카드 결제 또는 계좌이체를 통해 할 수 있다.</li>
          <li>
            크레딧결제의 기본 정책은 다음과 같다.
            <div className="mt-2 overflow-x-auto">
              <table className={policyTableClassName}>
                <thead>
                  <tr>
                    <th scope="col">항목</th>
                    <th scope="col">내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">크레딧 단가</th>
                    <td>1 크레딧 = 1만원</td>
                  </tr>
                  <tr>
                    <th scope="row">최소 충전 금액</th>
                    <td>600만원(600 크레딧)</td>
                  </tr>
                  <tr>
                    <th scope="row">최대 충전 한도</th>
                    <td>없음</td>
                  </tr>
                  <tr>
                    <th scope="row">유효기간</th>
                    <td>없음(무기한)</td>
                  </tr>
                  <tr>
                    <th scope="row">차감 시점</th>
                    <td>최종 입사일 기준, 입사일 입력 당일 자동 차감</td>
                  </tr>
                  <tr>
                    <th scope="row">채용 1건당 차감 크레딧</th>
                    <td>300 크레딧(300만원)</td>
                  </tr>
                  <tr>
                    <th scope="row">정부지원금</th>
                    <td>집행 가능(재원 라벨로 구분 관리)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>
            일반결제의 수수료는 경력 무관 300만원(VAT 별도) 정액제로 하며, 입사일 기준 14일 이내에 납부한다. 입사가
            취소된 경우 이미 발행된 청구 세금계산서는 취소하며 수수료를 청구하지 않는다.
          </li>
          <li>결제수단별 할인 혜택, 세금계산서 발행 절차 등 세부 결제 프로세스는 제12조에서 정한다.</li>
        </ol>

        <h4 className={sectionTitleClassName}>제5조 (환불 및 크레딧 복구 정책)</h4>
        <ol className={orderedListClassName}>
          <li>
            모든 환불 및 크레딧 복구는 고객사의 요청 접수 후 회사의 검토 및 승인을 거쳐 처리된다. 자동 처리되지
            않는다.
          </li>
          <li>
            크레딧결제 환불 정책은 다음과 같다.
            <div className="mt-2 overflow-x-auto">
              <table className={policyTableClassName}>
                <thead>
                  <tr>
                    <th scope="col">사유</th>
                    <th scope="col">환불율</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>서비스 미이용</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>서류합격자 1명 미만</td>
                    <td>90%</td>
                  </tr>
                  <tr>
                    <td>이 외 사유</td>
                    <td>환불 없음</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>
            크레딧결제 조기 퇴사 시 크레딧 복구는 다음과 같다(기준일은 달력일 적용).
            <div className="mt-2 overflow-x-auto">
              <table className={policyTableClassName}>
                <thead>
                  <tr>
                    <th scope="col">퇴사 시점</th>
                    <th scope="col">처리 방식</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>입사일 기준 30일 이내</td>
                    <td>300 크레딧 전액 복구(퇴사일로부터 5영업일 이내 서면 또는 서비스 내 요청 접수 및 회사 승인 시)</td>
                  </tr>
                  <tr>
                    <td>30일 초과</td>
                    <td>복구 없음</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>
            일반결제 조기 퇴사 시 수수료 환불은 다음과 같다(기준일은 달력일 적용). 고객사가 퇴사일로부터 5영업일
            이내 서면 통지한 경우에 한한다.
            <div className="mt-2 overflow-x-auto">
              <table className={policyTableClassName}>
                <thead>
                  <tr>
                    <th scope="col">퇴사 시점</th>
                    <th scope="col">환불율</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>입사일 기준 30일 이내</td>
                    <td>수수료 80% 환불 또는 동일 포지션 1회 재추천(재추천 후 30일 내 채용 실패 시 80% 환불)</td>
                  </tr>
                  <tr>
                    <td>60일 이내</td>
                    <td>수수료 50% 환불</td>
                  </tr>
                  <tr>
                    <td>90일 이내</td>
                    <td>수수료 20% 환불</td>
                  </tr>
                  <tr>
                    <td>90일 초과</td>
                    <td>환불 없음</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>환불 및 크레딧 복구의 신청 방법, 제출 서류, 확인 절차 등 절차적 사항은 제13조에서 정한다.</li>
          <li>
            고객사가 허위 서류를 제출하거나 퇴사 사유를 사실과 다르게 통지한 경우, 환불 크레딧 복구 권리는 즉시
            소멸하며 회사는 기지급 환불금의 반환 및 손해배상을 청구할 수 있다.
          </li>
        </ol>

        <h4 className={sectionTitleClassName}>제6조 (환불 및 크레딧 복구 예외사항)</h4>
        <p className={bodyClassName}>
          다음 각 호의 사유에 해당하는 경우 크레딧 복구 및 환불은 이루어지지 않는다. 일반결제의 경우 미납 수수료는
          약정 기한 내 전액 납부하여야 한다.
        </p>
        <ol className={orderedListClassName}>
          <li>고객사가 후보자에게 최초 제시한 근로조건을 이행하지 않거나 불리하게 변경하여 자진퇴사가 발생한 경우</li>
          <li>
            고객사 귀책으로 입사 전까지 근로계약서를 체결하지 않거나 입사일로부터 7영업일 이상 지연 체결한 경우
          </li>
          <li>후보자의 자진퇴사가 아닌 경우(권고사직, 해고 등 포함)</li>
          <li>천재지변, 감염병 등 외부 요인으로 고용 유지가 불가한 경우</li>
        </ol>

        <h4 className={sectionTitleClassName}>제7조 (후보자지위 유지)</h4>
        <ol className={orderedListClassName}>
          <li>
            고객사 및 그 계열회사는 회사로부터 후보자 정보를 제공받은 날로부터 1년간 해당 후보자의 후보자지위를
            인정하며, 정규직 계약직 기간제 인턴 파견 프리랜서 용역 외주 등 고용형태나 채용 방식에 관계없이 회사를
            통하지 않고 채용할 경우에도 제4조의 수수료 지급 의무가 발생한다.
          </li>
          <li>
            후보자지위는 최초 지원한 직종과 다른 직종으로 채용되더라도 유지되며, 이 경우에도 동일하게 제4조 수수료를
            지급한다.
          </li>
          <li>
            고객사가 회사의 서비스를 이용하기 전부터 해당 후보자의 정보를 확보하고 있었던 경우, 후보자 정보를 확보한
            날로부터 5영업일 이내 회사에 서면 통지하여야 한다. 회사가 통지일로부터 30일 이내에 이의를 제기하지 않으면
            해당 후보자지위는 소멸한다.
          </li>
        </ol>

        <h4 className={sectionTitleClassName}>제8조 (계약 기간 및 해지)</h4>
        <ol className={orderedListClassName}>
          <li>
            이용계약은 고객사가 제2조 및 제3조에 따라 약관에 동의하고 서비스 이용을 신청한 후, 회사가 이를 승인한
            날로부터 효력이 발생하며, 별도의 해지 의사표시가 없는 한 계속 유효하다.
          </li>
          <li>
            고객사가 제11조에서 정한 서비스 이용 절차를 위반하거나 수수료를 미납할 경우 회사는 서비스 제공을 중단하거나
            이용계약을 해지할 수 있다.
          </li>
          <li>
            고객사는 언제든지 서면(전자문서 포함)으로 이용계약 해지를 신청할 수 있다. 다만, 해지 신청 시점에 진행 중인
            채용 건에 대한 수수료 지급 의무는 소멸하지 않는다.
          </li>
        </ol>

        <h4 className={sectionTitleClassName}>제9조 (손해배상)</h4>
        <p className={bodyClassName}>
          고객사가 회사를 통하지 않고 후보자를 우회 채용하거나 수수료를 미납한 경우, 회사는 미지급 수수료, 연 15%의
          지연이자 및 미지급 수수료 원금의 3배 상당의 손해배상을 청구할 수 있다(법령이 허용하는 범위 내).
        </p>
      </section>

      <section>
        <h3 className={chapterTitleClassName}>운영세칙 및 일반조항</h3>

        <h4 className={sectionTitleClassName}>제10조 (약관의 구성)</h4>
        <ol className={orderedListClassName}>
          <li>
            본 약관은 다음과 같이 구성한다.
            <ul className={listClassName}>
              <li>핵심조항(재동의 대상): 제4조, 제5조, 제6조, 제7조, 제8조, 제9조</li>
              <li>일반조항(사전고지 대상): 제1조, 제2조, 제3조, 제10조, 제11조부터 제19조까지</li>
            </ul>
          </li>
          <li>
            핵심조항의 개정은 제3조 제3항의 절차에 따르며, 회사는 재동의 화면에 핵심조항만을 발췌하여 제시할 수
            있다.
          </li>
          <li>
            일반조항의 개정은 제3조 제4항의 절차에 따라 효력이 발생한다. 다만 일반조항의 변경이라 하더라도 그 실질이
            제3조 제3항 각 호에 해당하는 경우에는 핵심조항에 준하여 처리한다.
          </li>
          <li>
            조항 번호는 약관 개정 시에도 변경하지 아니한다. 조항을 신설하는 경우 직전 조항의 번호에 가지번호(예
            제11조의2)를 부여하여 기존 조항의 번호 체계를 유지한다.
          </li>
        </ol>

        <h4 className={sectionTitleClassName}>제11조 (서비스 내용 및 이용 방법)</h4>
        <ol className={orderedListClassName}>
          <li>
            회사는 AI Agent 기반 후보자 서칭 검증 제안 등 채용 관련 서비스를 제공하며, 채용의 최종 결정 권한과 그에
            따른 책임은 고객사에게 있다.
          </li>
          <li>
            고객사는 서비스를 통해 추천받은 후보자를 면접 대상자로 선정하는 즉시 회사에 서면(전자문서 포함, 전자서명
            이메일 서비스 내 알림 등 전자적 수단 포함)으로 통지한다.
          </li>
          <li>
            고객사는 후보자와 근로계약 주요 사항에 합의하여 채용을 확정한 경우 즉시 회사에 통보하고, 입사일(계약상
            출근일과 실제 출근일 중 빠른 일자), 근로계약서 사본 등 회사가 요청하는 자료를 지체 없이 제공한다.
          </li>
        </ol>

        <h4 className={sectionTitleClassName}>제12조 (결제 및 정산 절차)</h4>
        <ol className={orderedListClassName}>
          <li>
            결제수단별 할인 혜택은 프로모션 등에 따라 수시로 변동될 수 있어 본 조에는 구체적인 할인율을 기재하지
            아니하며, 회사가 별도로 정하여 서비스 내 결제 화면에서 안내한다.
          </li>
          <li>
            결제수단별 처리 절차는 다음과 같다.
            <div className="mt-2 overflow-x-auto">
              <table className={policyTableClassName}>
                <thead>
                  <tr>
                    <th scope="col">결제수단</th>
                    <th scope="col">처리 절차</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">카드 결제</th>
                    <td>결제 완료 즉시 처리(크레딧 충전 또는 수수료 납부), 카드 영수증 이메일 자동 발송</td>
                  </tr>
                  <tr>
                    <th scope="row">계좌이체</th>
                    <td>전자세금계산서 선발행 후 지정 계좌로 입금, 입금 확인 후 처리(크레딧 충전 또는 수수료 납부)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>
            결제방식별 청구 시점은 다음과 같다.
            <div className="mt-2 overflow-x-auto">
              <table className={policyTableClassName}>
                <thead>
                  <tr>
                    <th scope="col">구분</th>
                    <th scope="col">청구 및 차감 시점</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">크레딧결제</th>
                    <td>사전 충전, 채용 성사 시(최종 입사일 기준) 크레딧 자동 차감</td>
                  </tr>
                  <tr>
                    <th scope="row">일반결제</th>
                    <td>채용확정 시점에 수수료 지급 의무 발생, 회사는 즉시 세금계산서 발행, 입사일 기준 14일 이내 납부</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ol>

        <h4 className={sectionTitleClassName}>제13조 (환불 및 크레딧 복구 접수 절차)</h4>
        <ol className={orderedListClassName}>
          <li>환불 및 크레딧 복구는 서면 또는 서비스 내 요청 접수 채널을 통해 신청한다.</li>
          <li>접수 후 회사의 검토 및 승인을 거쳐 처리되며, 자동으로 처리되지 않는다.</li>
          <li>신청 시 사직서 및 해당 후보자의 고용보험 취득 상실 이력 등 회사가 요청하는 자료를 제출하여야 한다.</li>
          <li>
            회사는 요청의 적정성을 확인하기 위해 후보자에게 퇴사 경위를 직접 확인할 수 있으며, 고객사는 이에 협조하여야
            한다.
          </li>
          <li>환불율, 복구율, 접수 기한 등 실질적 조건은 제5조에서 정하며, 본 조는 접수 방법에 대한 절차를 정한다.</li>
        </ol>

        <h4 className={sectionTitleClassName}>제14조 (고객사 알림)</h4>
        <p className={bodyClassName}>
          회사는 크레딧 충전, 크레딧 차감, 잔액 부족, 결제 요청, 환불 관련 이벤트 등 고객사의 금전적 권리의무에 영향을
          미치는 주요 사항이 발생하는 경우 고객사에게 알림을 발송한다. 구체적인 알림 이벤트 및 발송 시점은 회사가
          서비스 화면에서 별도로 안내하며, 이는 제3조 제4항에 따른 일반조항으로서 사전 고지로 변경할 수 있다. 다만
          발송 시점 자체가 요금 산정 기준(예 크레딧 차감 시점)과 연동되어 실질적으로 변경되는 경우에는 제3조 제3항의
          절차를 따른다.
        </p>

        <h4 className={sectionTitleClassName}>제15조 (비밀준수의무)</h4>
        <ol className={orderedListClassName}>
          <li>
            당사자는 서비스 이용 중 알게 된 상대방의 영업 기술 노하우 등 비밀정보를 사전 서면 동의 없이 제3자에게
            제공 누설하지 않는다.
          </li>
          <li>고객사는 후보자의 개인정보를 관련 법령에 따라 보호하고, 동의 없이 제3자에게 제공하거나 외부에 공개하지 않는다.</li>
          <li>고객사는 본 약관 외 목적으로 서비스를 사용하거나 정보를 유출할 수 없다.</li>
          <li>본 조의 의무는 이용계약 종료 후에도 유효하다.</li>
        </ol>

        <h4 className={sectionTitleClassName}>제16조 (면책)</h4>
        <p className={bodyClassName}>
          천재지변, 정부 규제, 통신 장애 등 불가항력적 사유로 인한 서비스 제공 불가에 대해 회사는 책임을 지지 않는다.
        </p>

        <h4 className={sectionTitleClassName}>제17조 (약관의 해석)</h4>
        <ol className={orderedListClassName}>
          <li>
            본 약관에서 정하지 않은 사항은 약관의 규제에 관한 법률, 전자상거래 등에서의 소비자보호에 관한 법률 등 관련
            법령 및 일반 상관례에 따른다.
          </li>
          <li>본 약관의 내용이 불명확한 경우 고객사에게 유리하게 해석한다.</li>
        </ol>

        <h4 className={sectionTitleClassName}>제18조 (분쟁 해결 및 관할)</h4>
        <ol className={orderedListClassName}>
          <li>본 약관과 관련한 분쟁은 협의 조정으로 해결한다.</li>
          <li>협의 조정이 성립되지 않는 경우 서울중앙지방법원을 제1심 전속관할 법원으로 한다.</li>
        </ol>

        <h4 className={sectionTitleClassName}>제19조 (기존 선불 정찰제 고객 전환, 경과조치)</h4>
        <p className={bodyClassName}>
          크레딧결제 방식 시행 시점에 선불 정찰제를 이용 중이던 고객사의 잔여 티켓은 다음 기준으로 전환되었다.
        </p>
        <div className="overflow-x-auto">
          <table className={policyTableClassName}>
            <thead>
              <tr>
                <th scope="col">항목</th>
                <th scope="col">기준</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">전환 단위</th>
                <td>잔여 티켓 1개당 300 크레딧 전환</td>
              </tr>
              <tr>
                <th scope="row">유효기간</th>
                <td>기존 티켓의 유효기간은 전환과 동시에 소멸, 전환된 크레딧은 무기한 적용</td>
              </tr>
              <tr>
                <th scope="row">전환 방식</th>
                <td>전환 시행일 기준 자동 일괄 전환</td>
              </tr>
              <tr>
                <th scope="row">안내 방법</th>
                <td>전환 완료 후 이메일로 전환 크레딧 수량 안내</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={bodyClassName}>
          본 조는 시행일 당시에만 적용된 일회성 경과조치로, 신규 고객사에는 적용되지 아니한다.
        </p>
      </section>

      <section>
        <h3 className={chapterTitleClassName}>부칙</h3>
        <p className={bodyClassName}>본 약관은 2026년 7월 13일부터 시행한다.</p>
      </section>
    </div>
  )
}
