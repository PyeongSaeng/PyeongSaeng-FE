import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import { dummyJobs } from '../../shared/constants/dummyJobs';

//다 다르게 이동됨
const JobDetailPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const job = dummyJobs.find(job => job.jobId === Number(jobId));
    const saved: number[] = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const isSaved = job ? saved.includes(job.jobId) : false;

    // 유효하지 않은 id 처리
    if (!job) {
        return <div className="p-4">존재하지 않는 일자리입니다.</div>;
    }

    const handleSave = () => {
        const saved: number[] = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        if (!saved.includes(job.jobId)) {
            saved.push(job.jobId);
            localStorage.setItem('savedJobs', JSON.stringify(saved));
        }
        navigate('/personal/jobs/saved');
    };

    return (
        <div>
            <div className="w-full h-full">
                <Topbar />
                <div className="mt-[21px] flex flex-col items-center">
                    <p className="text-[20px] font-semibold text-[var(--gray-700)]">
                        맟춤 일자리 추천
                    </p>
                    <div className="w-[297px] h-[168px] mt-[17px] border-[1.3px] border-[var(--gray-600)] rounded-[10px] overflow-hidden">
                        <img
                            src={job.image}
                            alt={job.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-[297px] px-[17px] mt-[22px] border-[1.3px] border-[var(--main-green)] rounded-[13px] bg-white">
                        {/*수정 필요*/}
                        <p className="text-[16px] font-semibold text-[var(--gray-800)] mb-[10px]">{job.name}</p>
                        <p className="text-[14px] font-normal text-[var(--gray-800)]">{job.details}</p>
                    </div>
                    {/* 하단 버튼 */}
                    <div className="w-[301px] flex gap-[13px] mt-[36px]">
                        <button
                            onClick={() => navigate(`/personal/jobs/recommend/${job.jobId}/apply`)}
                            className="w-[144px] h-[45px] border-[1.3px] border-[var(--main-green)] rounded-[8px] bg-white text-[16px] font-medium text-black">
                            신청
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaved}
                            className="w-[144px] h-[45px] border-[1.3px] border-[var(--main-green)] rounded-[8px] bg-[var(--main-green)] text-[16px] font-medium text-black">
                            {isSaved ? "저장됨" : "저장"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;