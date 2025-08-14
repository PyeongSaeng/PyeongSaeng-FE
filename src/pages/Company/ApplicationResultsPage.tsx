import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';
import Field from '../../shared/components/Field';
import {
  getApplicationDetails,
  patchApplicationStatus,
} from './apis/applications';

export default function ApplicationResultsPage() {
  const navigate = useNavigate();
  const { jobPostId } = useParams<{ jobPostId: string }>();
  const [searchParams] = useSearchParams();

  // id 안전 파싱
  const idParam = searchParams.get('id');
  const applicationId =
    idParam && /^\d+$/.test(idParam) ? parseInt(idParam, 10) : undefined;

  const [detail, setDetail] = useState<Awaited<
    ReturnType<typeof getApplicationDetails>
  > | null>(null);
  const [result, setResult] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (!applicationId) return;
    (async () => {
      const d = await getApplicationDetails(applicationId);
      setDetail(d);
      if (
        d.applicationState === 'APPROVED' ||
        d.applicationState === 'REJECTED'
      )
        setIsPublished(true);
    })();
  }, [applicationId]);

  const asTextFields = useMemo(() => {
    const from = detail?.questionAndAnswerList ?? [];
    const dict: Record<string, string> = {};
    from.forEach((item) => {
      if (item.fieldType === 'TEXT') dict[item.fieldName] = item.answerContent;
      if (item.fieldType === 'IMAGE')
        dict[item.fieldName] = item.answerContent
          .map((f) => f.originalFileName)
          .join(', ');
    });
    return dict;
  }, [detail]);

  // 관대한 합/불 파서
  const parseStatus = (v: string): 'APPROVED' | 'REJECTED' | null => {
    const norm = v
      .normalize('NFKC')
      .replace(
        /[\s\u00A0\u200B-\u200D\uFEFF.,!?:;'"`~(){}[\]_+\-=\\/|<>@#%^&*]/g,
        ''
      )
      .toLowerCase();
    if (/^(합|합격|승인|ok|패스|pass|approve|approved)$/.test(norm))
      return 'APPROVED';
    if (/^(불|불합|불합격|거절|fail|reject|rejected|ng)$/.test(norm))
      return 'REJECTED';
    if (norm.includes('합')) return 'APPROVED';
    if (norm.includes('불')) return 'REJECTED';
    return null;
  };

  const handlePublish = async () => {
    if (!applicationId) {
      alert('URL에 applicationId가 없습니다. (예: .../results?id=456)');
      return;
    }
    const status = parseStatus(result);
    if (!status) {
      alert('합/불을 정확히 입력해주세요 (예: 합격, 불합격)');
      return;
    }
    try {
      await patchApplicationStatus(applicationId, status);
      setIsPublished(true);
      // 이전 페이지로 돌아가며 업데이트된 applicationId 전달
      navigate(`/company/jobs/applications/${jobPostId}`, {
        state: { updatedId: applicationId },
      });
    } catch (e) {
      console.error('PATCH status failed:', e);
      alert('결과 공시에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="h-[740px] flex flex-col bg-white font-pretendard">
      <Topbar />

      {/* 고정 헤더 */}
      <div className="flex flex-col items-center w-full max-w-[320px] self-center px-4 pt-10">
        <PageHeader title="받은 신청서" />
        <PageHeader
          title={`${asTextFields['성함'] ? `${asTextFields['성함']} 님 신청서` : ''}`}
        />
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-10 pb-6 flex justify-center">
        <div className="w-full max-w-[320px] flex flex-col items-center gap-[13px] pt-4">
          <Field label="연세" value={asTextFields['연세'] ?? ''} />
          <Field label="성별" value={asTextFields['성별'] ?? ''} />
          <Field label="전화번호" value={asTextFields['전화번호'] ?? ''} />
          <Field label="거주지" value={asTextFields['거주지'] ?? ''} />
          <Field label="경력" value={asTextFields['경력'] ?? ''} />
          <Field label="상태" value={detail?.applicationState ?? ''} />

          {/* onChange: 이벤트/문자열 모두 수용 */}
          <Field
            label="합불"
            value={result}
            onChange={(v: any) =>
              setResult(typeof v === 'string' ? v : (v?.target?.value ?? ''))
            }
            placeholder="합격 / 불합격"
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
