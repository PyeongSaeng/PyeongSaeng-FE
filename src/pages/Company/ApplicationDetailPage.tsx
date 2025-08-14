import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Topbar from '../../shared/components/topbar/Topbar';
import PageHeader from '../../shared/components/PageHeader';
import { getApplications } from './apis/applications';

type BtnState = 'init' | 'check' | 'complete';

export default function ApplicationDetailPage() {
  const { jobPostId } = useParams<{ jobPostId: string }>();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { updatedId?: number } };

  const [apps, setApps] = useState<
    Array<{
      id: number;
      name: string;
      status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
    }>
  >([]);
  const [statusMap, setStatusMap] = useState<Record<number, BtnState>>({});

  const fetchApps = async () => {
    if (!jobPostId) return;
    const res = await getApplications({
      jobPostId: Number(jobPostId),
      page: 1,
    });
    const list = res.applicationList.map((a) => ({
      id: a.applicationId,
      name: a.applicantName,
      status: a.applicantStatus,
    }));
    setApps(list);
    const init: Record<number, BtnState> = {};
    list.forEach((a) => {
      init[a.id] =
        a.status === 'APPROVED' || a.status === 'REJECTED'
          ? 'complete'
          : 'init';
    });
    setStatusMap(init);
  };

  useEffect(() => {
    fetchApps();
  }, [jobPostId]);

  // 결과 공시 후 뒤로 돌아왔을 때 즉시 complete + 리패치
  useEffect(() => {
    const updatedId = location.state?.updatedId;
    if (updatedId) {
      setStatusMap((prev) => ({ ...prev, [updatedId]: 'complete' }));
      fetchApps();
      navigate('.', { replace: true, state: null });
    }
  }, [location.state, navigate]);

  const handleButtonClick = (id: number) => {
    setStatusMap((prev) => {
      const current = prev[id];
      if (current === 'init') return { ...prev, [id]: 'check' };
      if (current === 'check') return { ...prev, [id]: 'complete' };
      return prev;
    });
  };

  const goToResultPage = (id: number) => {
    navigate(`/company/jobs/applications/${jobPostId}/results?id=${id}`);
  };

  return (
    <div className="h-[740px] flex flex-col bg-white font-pretendard">
      <Topbar />
      <div className="flex flex-col items-center w-full max-w-[320px] self-center px-4 pt-10">
        <PageHeader title="받은 신청서" />
        <PageHeader title={`공고 ID ${jobPostId}`} />
        <ul className="w-full mt-6 space-y-6">
          {apps.map((app) => (
            <li key={app.id} className="w-full">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => goToResultPage(app.id)}
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
            <li className="text-sm text-[#9aa]">제출된 지원서가 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
