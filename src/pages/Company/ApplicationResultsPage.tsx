import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';
import Field from '../../shared/components/Field';
import {
  getApplicationDetails,
  patchApplicationStatus,
} from './apis/applications';

type AppState = 'APPROVED' | 'REJECTED';
type LocState = { jobPostTitle?: string; applicantName?: string } | null;

export default function ApplicationResultsPage() {
  const navigate = useNavigate();
  const location = useLocation() as { state: LocState };

  // jobPostId 3중 폴백
  const { jobPostId: pathId } = useParams<{ jobPostId?: string }>();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('jobPostId') ?? undefined;
  const matchId = window.location.pathname.match(/\/applications\/(\d+)/)?.[1];
  const jobPostId = pathId ?? queryId ?? matchId ?? '';

  // applicationId는 쿼리(id)로 전달
  const idParam = searchParams.get('id');
  const applicationId =
    idParam && /^\d+$/.test(idParam) ? parseInt(idParam, 10) : undefined;

  const [detail, setDetail] = useState<Awaited<
    ReturnType<typeof getApplicationDetails>
  > | null>(null);
  const [result, setResult] = useState<string>('');
  const [isPublished, setIsPublished] = useState<boolean>(false);

  useEffect(() => {
    if (!applicationId) return;
    let mounted = true;

    (async () => {
      const d = await getApplicationDetails(applicationId);
      if (!mounted) return;
      setDetail(d);
      const st = d.applicationState;
      if (st === 'APPROVED' || st === 'REJECTED') setIsPublished(true);
    })();

    return () => {
      mounted = false;
    };
  }, [applicationId]);

  const asTextFields = useMemo(() => {
    const from = detail?.questionAndAnswerList ?? [];
    const dict: Record<string, string> = {};
    for (const item of from) {
      if (item.fieldType === 'TEXT') {
        dict[item.fieldName] = String(item.answerContent ?? '');
      } else if (item.fieldType === 'IMAGE') {
        const list = Array.isArray(item.answerContent)
          ? item.answerContent
          : [];
        dict[item.fieldName] = list
          .map((f: any) => f?.originalFileName ?? '')
          .filter(Boolean)
          .join(', ');
      }
    }
    return dict;
  }, [detail]);

  const parseStatus = (v: string): AppState | null => {
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

  const handleChangeResult = (v: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof v === 'string') setResult(v);
    else setResult(v?.target?.value ?? '');
  };

  const handlePublish = async () => {
    if (!applicationId) {
      toast.error('URL에 applicationId가 없습니다. (예: .../results?id=456)');
      return;
    }
    const status = parseStatus(result);
    if (!status) {
      toast.warning('합/불을 정확히 입력해주세요 (예: 합격, 불합격)');
      return;
    }
    try {
      await patchApplicationStatus(applicationId, status);
      setIsPublished(true);
      navigate(`/company/jobs/applications/${jobPostId}`, {
        state: {
          updatedId: applicationId,
          jobPostTitle: location.state?.jobPostTitle,
        },
      });
    } catch (e) {
      console.error('PATCH status failed:', e);
      toast.error('결과 공시에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const headerName = location.state?.applicantName
    ? `${location.state.applicantName} 님 신청서`
    : asTextFields['성함']
      ? `${asTextFields['성함']} 님 신청서`
      : '';

  return (
    <div className="h-[740px] flex flex-col bg-white font-pretendard mb-[6.8rem]">
      <Topbar />

      {/* 고정 헤더 */}
      <div className="flex flex-col items-center w-full max-w-[320px] self-center px-4 pt-10">
        <PageHeader title="받은 신청서" />
        <PageHeader title={headerName} />
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-10 pb-6 flex justify-center">
        <div className="w-full max-w-[320px] flex flex-col items-center gap-[13px] pt-4">
          {Object.entries(asTextFields)
            .filter(([, value]) => value && value?.trim()) // 빈 값 제외
            .map(([fieldName, value]) => (
              <Field key={fieldName} label={fieldName} value={value} />
            ))}

          {/* 상태, 합 불 입력 -> 항상 표시 */}
          <Field label="상태" value={detail?.applicationState ?? ''} />

          <Field
            label="합불"
            value={result}
            onChange={handleChangeResult}
            placeholder="합격 / 불합격"
            disabled={isPublished}
          />

          {/* 버튼: 미공시 → 파랑 '합불 결과 공시', 공시됨 → 회색 '공시 완료' */}
          <button
            onClick={isPublished ? undefined : handlePublish}
            disabled={isPublished}
            className={clsx(
              'w-full max-w-[320px] py-4 rounded-[8px] text-[16px] font-semibold mt-4',
              isPublished
                ? 'bg-[#7F7F7F] text-white cursor-not-allowed'
                : 'bg-[#0D29B7] text-white'
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
