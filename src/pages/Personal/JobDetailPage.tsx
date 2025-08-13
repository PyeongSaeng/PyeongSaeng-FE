import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import { useJobDetail } from './hooks/useDetail';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobPostId = Number(jobId);

  const { data: job, isLoading, isError } = useJobDetail(jobPostId);

  const saved: number[] = JSON.parse(localStorage.getItem('savedJobs') || '[]');
  const isSaved = saved.includes(jobPostId);

  const handleSave = () => {
    if (!isSaved) {
      const updated = [...saved, jobPostId];
      localStorage.setItem('savedJobs', JSON.stringify(updated));
      navigate('/personal/jobs/saved');
    }
  };

  if (isLoading) return <div className="p-4">로딩 중...</div>;
  if (isError || !job) return <div className="p-4">존재하지 않는 일자리입니다.</div>;

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
          <div className="w-[297px] px-[17px] py-[10px] mt-[22px] border-[1.3px] border-[var(--main-green)] rounded-[13px] bg-white text-[14px] font-normal text-[var(--gray-800)]">
            <p className="text-[16px] font-semibold text-[var(--gray-800)] mb-[10px]">
              {job.title}
            </p>
            <p>거리: {job.travelTime}</p>
            <p>시급: {job.hourlyWage?.toLocaleString()}원</p>
            <p>근무시간: {job.workingTime}</p>
            <p>월급: {job.monthlySalary ? `${job.monthlySalary.toLocaleString()}원` : '-'}</p>
          </div>

          {/* 하단 버튼 */}
          <div className="w-[301px] flex gap-[13px] mt-[36px]">
            <button
              onClick={() => navigate(`/personal/jobs/recommend/${jobPostId}/apply`)}
              className="w-[144px] h-[45px] border-[1.3px] border-[var(--main-green)] rounded-[8px] bg-white text-[16px] font-medium text-black">
              신청
            </button>
            <button
              onClick={handleSave}
              disabled={isSaved}
              className="w-[144px] h-[45px] border-[1.3px] border-[var(--main-green)] rounded-[8px] bg-[var(--main-green)] text-[16px] font-medium text-black">
              {isSaved ? '저장됨' : '저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
