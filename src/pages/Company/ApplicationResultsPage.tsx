import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';
import Field from '../../shared/components/Field';
import clsx from 'clsx';
import { applicationGroups } from '../../shared/constants/applicationData';

export default function ApplicationResultsPage() {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('id');

  const matchedApplication = applicationGroups
    .flatMap((group) => group.applications)
    .find((app) => app.id === applicationId);

  const [result, setResult] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    if (result.trim()) setIsPublished(true);
  };

  return (
    <div className="h-[740px] flex flex-col bg-white font-pretendard">
      <Topbar />

      {/* 고정된 헤더 영역 */}
      <div className="flex flex-col items-center w-full max-w-[320px] self-center px-4 pt-10">
        <PageHeader title="받은 신청서" />
        <PageHeader title={`${matchedApplication?.name ?? ''} 님 신청서`} />
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-10 pb-6 flex justify-center">
        <div className="w-full max-w-[320px] flex flex-col items-center gap-[13px] pt-4">
          <Field label="연세" value={matchedApplication?.age ?? ''} />
          <Field label="성별" value={matchedApplication?.gender ?? ''} />
          <Field label="전화번호" value={matchedApplication?.phone ?? ''} />
          <Field label="거주지" value={matchedApplication?.address ?? ''} />
          <Field label="경력" value={matchedApplication?.experience ?? ''} />
          <Field label="상태" value={matchedApplication?.status ?? ''} />
          <Field
            label="합불"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="여기에 입력하세요"
            disabled={isPublished}
          />

          <button
            onClick={handlePublish}
            disabled={isPublished}
            className={clsx(
              'w-full max-w-[320px] py-4 rounded-[8px] text-[16px] font-semibold text-white mt-4',
              isPublished ? 'bg-[#7F7F7F] cursor-not-allowed' : 'bg-[#0D29B7]'
            )}
          >
            {isPublished ? '공시 완료' : '합불 결과 공시'}
          </button>

          <p
            className={clsx(
              'text-[13px] w-full text-center mt-1',
              isPublished ? 'text-[#7F7F7F]' : 'text-[#C2C2C2]'
            )}
          >
            공시 후에는 결과를 수정할 수 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
