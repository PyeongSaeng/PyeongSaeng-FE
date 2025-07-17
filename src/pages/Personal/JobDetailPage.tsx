import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';

// test용 더미 추후 삭제 예정
const dummyJobs = [
    { jobId: 1, name: '죽전2동 행정복지센터 미화원', image: '/icons/search_line.png', details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원' },
    { jobId: 2, name: '...', image: '/icons/search_line.png', details: '...' },
    { jobId: 3, name: '...', image: '/icons/search_line.png', details: '...' },
    { jobId: 4, name: '...', image: '/icons/search_line.png', details: '...' },
];
//다 다르게 이동됨
const JobDetailPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const job = dummyJobs.find(job => job.jobId === Number(jobId));

    // 유효하지 않은 id 처리
    if (!job) {
        return <div className="p-4">존재하지 않는 일자리입니다.</div>;
    }

    const handleSave = () => {
        // 1) 기존에 저장된 ID 배열 가져오기
        const saved: number[] = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        // 2) 중복 없을 때만 추가
        if (!saved.includes(job.jobId)) {
            saved.push(job.jobId);
            localStorage.setItem('savedJobs', JSON.stringify(saved));
        }
        // 3) 저장함 페이지로 이동 (선택)
        navigate('/personal/jobs/saved');
    };

    return (
        <div>
            <div className="w-full h-full bg-white">
                <Topbar />
                <div className="mt-[21px] flex flex-col items-center">
                    <p className="text-[20px] font-semibold text-[#747474]">
                        맟춤 일자리 추천
                    </p>
                    <div className="w-[297px] h-[168px] mt-[17px] border-[1.3px] border-[#A4A4A4] rounded-[10px] overflow-hidden">
                        <img
                            src={job.image}
                            alt={job.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-[297px] px-[17px] mt-[22px] border-[1.3px] border-[#08D485] rounded-[13px] bg-white">
                        {/*수정 필요*/}
                        <p className="text-[16px] font-semibold text-#414141 mb-[10px]">{job.name}</p>
                        <p className="text-[14px] font-normal text-#414141">{job.details}</p>
                    </div>
                    <div className="w-[301px] flex gap-[13px] mt-[36px]">
                        <button
                            onClick={() => navigate(`/personal/jobs/recommend/${job.jobId}/apply`)}
                            className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[16px] font-medium text-black">
                            신청
                        </button>
                        <button
                            onClick={handleSave}
                            className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[16px] font-medium text-black">
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;