import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';

type ApplicationInfo = {
  name: string;
  title: string;
};

const applicationMap: Record<string, ApplicationInfo> = {
  '101': {
    name: '김영희',
    title: '근무지 + 근무 내용',
  },
  '102': {
    name: '이말덕',
    title: '죽전도서관 사서 업무',
  },
};

export default function ApplicationDetailPage() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const info = applicationMap[applicationId ?? ''] ?? { name: '', title: '' };

  const [status, setStatus] = useState<'init' | 'check' | 'complete'>('init');

  const goToResultPage = () => {
    navigate(`/company/jobs/applications/${applicationId}/results`);
  };

  const handleButtonClick = () => {
    if (status === 'init') setStatus('check');
    else if (status === 'check') setStatus('complete');
  };

  return (
    <div className="pt-[10px] h-[740px] flex flex-col bg-white font-pretendard">
      <Topbar />

      <div className="flex flex-col items-center w-full max-w-[320px] self-center px-4 py-10">
        {/* 상단 제목 */}
        <PageHeader title="받은 신청서" />

        {/* 리스트 타이틀 */}
        <PageHeader title={info.title} />

        {/* 리스트 항목 */}
        <ul className="w-full mt-6 space-y-6">
          <li className="w-full">
            <div className="flex items-center justify-between">
              {/* 신청서 정보 + 페이지 이동 */}
              <div
                className="flex items-center cursor-pointer"
                onClick={goToResultPage}
              >
                <span className="text-[16px] text-black font-normal">
                  {info.name} 님 신청서
                </span>
                <FiChevronRight className="text-[20px] text-black ml-[12px]" />
              </div>

              {/* 버튼 그룹 */}
              {status === 'init' && (
                <button
                  onClick={handleButtonClick}
                  className="w-[94px] h-[34px] bg-[#0D29B7] text-white text-[16px] font-medium rounded-[8px] flex items-center justify-center"
                >
                  확인
                </button>
              )}

              {status === 'check' && (
                <button
                  onClick={handleButtonClick}
                  className="w-[94px] h-[34px] bg-[#0D29B7] text-white text-[16px] font-medium rounded-[8px] flex items-center justify-center"
                >
                  합불입력
                </button>
              )}

              {status === 'complete' && (
                <button
                  disabled
                  className="w-[94px] h-[34px] border border-[#C9C9C9] text-[#C9C9C9] bg-white text-[16px] font-medium rounded-[8px] flex items-center justify-center cursor-default"
                >
                  입력완료
                </button>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
