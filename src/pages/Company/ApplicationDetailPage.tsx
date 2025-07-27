import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';
import { applicationGroups } from '../../shared/constants/applicationData';

export default function ApplicationDetailPage() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title ?? '');

  const navigate = useNavigate();

  // ✅ title로 그룹 찾기
  const group = applicationGroups.find((group) => group.title === decodedTitle);

  const [statusMap, setStatusMap] = useState<
    Record<string, 'init' | 'check' | 'complete'>
  >(
    () =>
      group?.applications.reduce(
        (acc, app) => {
          acc[app.id] = 'init';
          return acc;
        },
        {} as Record<string, 'init' | 'check' | 'complete'>
      ) ?? {}
  );

  const handleButtonClick = (id: string) => {
    setStatusMap((prev) => {
      const current = prev[id];
      if (current === 'init') return { ...prev, [id]: 'check' };
      if (current === 'check') return { ...prev, [id]: 'complete' };
      return prev;
    });
  };

  const goToResultPage = (id: string) => {
    navigate(
      `/company/jobs/applications/${encodeURIComponent(decodedTitle)}/results?id=${id}`
    );
  };

  return (
    <div className="h-[740px] flex flex-col bg-white font-pretendard">
      <Topbar />
      <div className="flex flex-col items-center w-full max-w-[320px] self-center px-4 pt-10">
        <PageHeader title="받은 신청서" />
        <PageHeader title={decodedTitle} />

        <ul className="w-full mt-6 space-y-6">
          {group?.applications.map((app) => (
            <li key={app.id} className="w-full">
              <div className="flex items-center justify-between">
                {/* 이름 + 이동 */}
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => goToResultPage(app.id)}
                >
                  <span className="text-[16px] text-black font-normal">
                    {app.name} 님 신청서
                  </span>
                  <FiChevronRight className="text-[20px] text-black ml-[12px]" />
                </div>

                {/* 버튼 상태별 렌더링 */}
                {statusMap[app.id] === 'init' && (
                  <button
                    onClick={() => handleButtonClick(app.id)}
                    className="w-[94px] h-[34px] bg-[#0D29B7] text-white text-[16px] font-medium rounded-[8px]"
                  >
                    확인
                  </button>
                )}
                {statusMap[app.id] === 'check' && (
                  <button
                    onClick={() => handleButtonClick(app.id)}
                    className="w-[94px] h-[34px] bg-[#0D29B7] text-white text-[16px] font-medium rounded-[8px]"
                  >
                    합불입력
                  </button>
                )}
                {statusMap[app.id] === 'complete' && (
                  <button
                    disabled
                    className="w-[94px] h-[34px] border border-[#C9C9C9] text-[#C9C9C9] bg-white text-[16px] font-medium rounded-[8px]"
                  >
                    입력완료
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
