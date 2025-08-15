import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Topbar from '../../shared/components/topbar/Topbar';
import { useJobDetail } from './hooks/useDetail';
import { useSaveToggle } from './hooks/useSaveToggle';
import { useShow } from './hooks/useShow';
import { useApplication } from './hooks/useApplication';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobPostId = Number(jobId);

  const { data: job, isLoading, isError } = useJobDetail(jobPostId);
  const { mutate: saveJob, isPending } = useSaveToggle(jobPostId);
  const { data: savedJobs } = useShow();
  const isSaved = savedJobs?.some(
    (bookmark) => bookmark.jobPostDetailDTO.images[0]?.jobPostId === jobPostId
  );

  const handleSave = () => {
    if (!isSaved) {
      saveJob();
    }
  };
  const { useEnsureApplication } = useApplication();
  const { mutate: ensureApplication, isPending: isApplying } =
    useEnsureApplication();

  const handleApply = () => {
    ensureApplication(jobPostId, {
      onSuccess: () => {
        navigate('/personal/jobs/drafts');
      },
      onError: () => {

        toast.error('신청에 실패했습니다.');

      },
    });
  };

  if (isLoading) return <div className="p-4">로딩 중...</div>;
  if (isError || !job) {
    return (
      <Topbar>
        <div className="flex flex-col items-center justify-center w-full h-full py-20 px-6 text-center">
          <h1 className="text-[20px] md:text-4xl font-bold mb-4">
            존재하지 않는 일자리입니다.
          </h1>
          <p className="text-[15px] md:text-2xl text-gray-600">
            입력하신 공고를 찾을 수 없습니다.
          </p>
        </div>
      </Topbar>
    );
  }
  return (
    <div>
      <div className="w-full h-full">
        <Topbar />
        <div className="mt-[21px] flex flex-col items-center">
          <p className="text-[20px] font-semibold text-[var(--gray-700)]">
            맞춤 일자리 추천
          </p>

          {/* 이미지 */}
          <div className="w-[297px] h-[168px] mt-[17px] border-[1.3px] border-[var(--gray-600)] rounded-[10px] overflow-hidden">
            <img
              src={job.images?.[0]?.imageUrl}
              alt={job.images?.[0]?.name || 'job image'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 정보 카드 */}
          <div className="w-[297px] px-[17px] py-[17px] mt-[19px] border-[1.3px] border-[var(--main-green)] rounded-[13px] bg-white text-[14px] font-normal text-[var(--gray-800)]">
            <p className="text-[16px] font-semibold text-[var(--gray-800)] mb-[22px]">
              {job.title}
            </p>
            <div className="flex justify-between mb-1">
              <span>거리</span>
              <span>{job.travelTime}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>시급</span>
              <span>{job.hourlyWage?.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>근무시간</span>
              <span>{job.workingTime}</span>
            </div>
            <div className="flex justify-between">
              <span>월급</span>
              <span>
                {job.monthlySalary
                  ? `${job.monthlySalary.toLocaleString()}원`
                  : '-'}
              </span>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="w-[301px] flex gap-[13px] mt-[36px]">
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="w-[144px] h-[45px] border-[1.3px] border-[var(--main-green)] rounded-[8px] bg-white text-[16px] font-medium text-black"
            >
              {isApplying ? '신청 중...' : '신청'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaved || isPending}
              className="w-[144px] h-[45px] border-[1.3px] border-[var(--main-green)] rounded-[8px] bg-[var(--main-green)] text-[16px] font-medium text-black"
            >
              {isPending ? '저장 중...' : isSaved ? '저장됨' : '저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
