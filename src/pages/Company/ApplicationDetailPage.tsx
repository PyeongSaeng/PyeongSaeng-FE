import { useEffect, useState, useCallback } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';
import { getApplications, getApplicationDetails } from './apis/applications';

type BtnState = 'init' | 'check' | 'complete';
type LocState = {
  updatedId?: number;
  jobPostTitle?: string;
  jobPostAddress?: string;
} | null;

export default function ApplicationDetailPage() {
  // --- jobPostId 폴백 ---
  const { jobPostId: pathId } = useParams<{ jobPostId?: string }>();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('jobPostId') ?? undefined;
  const matchId = window.location.pathname.match(/\/applications\/(\d+)/)?.[1];
  const jobPostIdRaw = pathId ?? queryId ?? matchId ?? '';
  const jobPostId =
    typeof jobPostIdRaw === 'string' && /^\d+$/.test(jobPostIdRaw)
      ? Number(jobPostIdRaw)
      : undefined;

  const navigate = useNavigate();
  const location = useLocation() as { state: LocState };
  const [jobAdress, setjobAdress] = useState<string>(
    location.state?.jobPostAddress ?? ''
  );
  const [jobTitle, setJobTitle] = useState<string>(
    location.state?.jobPostTitle ?? ''
  );
  useEffect(() => {
    if (location.state?.jobPostTitle) setJobTitle(location.state.jobPostTitle);
  }, [location.state?.jobPostTitle]);

  const [apps, setApps] = useState<
    Array<{
      id: number;
      name: string;
      status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
    }>
  >([]);
  const [statusMap, setStatusMap] = useState<Record<number, BtnState>>({});

  const fetchApps = useCallback(
    async (forceCompleteId?: number) => {
      if (!jobPostId) return;

      // 1) 목록 호출
      const res = await getApplications({ jobPostId, page: 1 });
      const list = res.applicationList.map((a) => ({
        id: a.applicationId,
        name: a.applicantName,
        status: a.applicantStatus,
      }));
      setApps(list);

      // 2) 서버 상태 기반 맵
      let baseMap: Record<number, BtnState> = {};
      for (const a of list) {
        const serverComplete =
          a.status === 'APPROVED' || a.status === 'REJECTED';
        baseMap[a.id] = serverComplete ? 'complete' : 'init';
      }

      // 3) 미완료로 보이는 항목만 상세 API로 재검증
      const needVerify = list.filter((a) => baseMap[a.id] !== 'complete');
      if (needVerify.length) {
        const verified = await Promise.all(
          needVerify.map(async (a) => {
            try {
              const d = await getApplicationDetails(a.id);
              const done =
                d.applicationState === 'APPROVED' ||
                d.applicationState === 'REJECTED';
              return { id: a.id, done };
            } catch {
              return { id: a.id, done: false };
            }
          })
        );
        for (const v of verified) {
          if (v.done) baseMap[v.id] = 'complete';
        }
      }

      // 4) 방금 공시하고 돌아온 항목 강조
      if (forceCompleteId) baseMap[forceCompleteId] = 'complete';

      setStatusMap(baseMap);
    },
    [jobPostId]
  );

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  // 결과 공시 후 복귀: complete + 리패치
  useEffect(() => {
    const updatedId = location.state?.updatedId;
    if (updatedId) {
      setStatusMap((prev) => ({ ...prev, [updatedId]: 'complete' }));
      fetchApps(updatedId);
      navigate('.', { replace: true, state: null });
    }
  }, [location.state?.updatedId, navigate, fetchApps]);

  // 결과 페이지로 이동(지원자 이름 동봉)
  const goToResultPage = (id: number, name: string) => {
    if (!jobPostId) return;
    navigate(`/company/jobs/applications/${jobPostId}/results?id=${id}`, {
      state: { jobPostTitle: jobTitle, applicantName: name },
    });
  };

  // 버튼 플로우: init→check(첫 클릭), check→결과 페이지 이동(둘째 클릭)
  const handleButtonClick = (id: number) => {
    setStatusMap((prev) => {
      const current = prev[id];
      if (current === 'init') return { ...prev, [id]: 'check' };
      if (current === 'check') {
        const name = apps.find((a) => a.id === id)?.name ?? '';
        goToResultPage(id, name);
      }
      return prev;
    });
  };

  return (
    <div className="h-[740px] flex flex-col bg-white font-pretendard">
      <Topbar />
      <div className="flex flex-col items-center w-full max-w-[320px] self-center px-4 pt-10">
        <PageHeader title="받은 신청서" />
        {jobAdress ? (
          <PageHeader title={jobAdress} />
        ) : (
          <PageHeader title={jobPostId ? `공고 ID ${jobPostId}` : ''} />
        )}

        <ul className="w-full mt-6 space-y-6">
          {apps.map((app) => (
            <li id={`app-${app.id}`} key={app.id} className="w-full">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => goToResultPage(app.id, app.name)}
                >
                  <span className="text-[16px] text-black font-normal">
                    {app.name} 님 신청서
                  </span>
                  <FiChevronRight className="text-[20px] text-black ml-[12px]" />
                </div>

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

          {apps.length === 0 && (
            <li className="text-[20px] text-sm text-[#9aa]">
              제출된 지원서가 없습니다.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
