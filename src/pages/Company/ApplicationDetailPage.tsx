import Topbar from '../../shared/components/topbar/Topbar';

export default function ApplicationDetailPage() {
  const mockApplicants = [
    {
      name: '김영희',
      isCompleted: false,
    },
    {
      name: '이말덕',
      isCompleted: true,
    },
  ];

  return (
    <div className="pt-[10px] h-[740px] flex flex-col">
      <Topbar />
      <div className="flex justify-center overflow-y-auto flex-1 pb-6">
        <div className="w-full max-w-[320px] flex flex-col items-center justify-start bg-white px-4 py-10">
          {/* 제목 */}
          <h2 className="text-[18px] font-semibold w-full border-b pb-2 mb-2">
            받은 신청서
          </h2>
          <h3 className="text-[16px] font-medium text-gray-500 w-full border-b pb-2 mb-4">
            죽전도서관 사서 업무
          </h3>

          {/* 신청자 리스트 */}
          <ul className="w-full flex flex-col gap-4">
            {mockApplicants.map((applicant, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-[14px]"
              >
                <span>{applicant.name} 님 신청서</span>
                {applicant.isCompleted ? (
                  <button
                    disabled
                    className="px-4 py-1 text-sm text-gray-400 border border-gray-300 rounded-lg bg-[#F8F8F8]"
                  >
                    입력완료
                  </button>
                ) : (
                  <button
                    className="px-4 py-1 text-sm text-white bg-[#0038FF] rounded-lg"
                    onClick={() => {
                      // 확인 버튼 클릭 시 상세 신청서 보기로 이동
                      // 예: /company/applications/:jobId/:userId
                      alert('해당 신청서 보기로 이동');
                    }}
                  >
                    확인
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
