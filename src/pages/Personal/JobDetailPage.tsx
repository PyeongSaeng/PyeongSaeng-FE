import { useParams, useNavigate } from 'react-router-dom';

// test용 더미 추후 삭제 예정
const dummyJobs = [
    { id: 1, name: '죽전2동 행정복지센터 미화원', image: '/icons/search_line.png', details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원' },
    { id: 2, name: '...', image: '/icons/search_line.png', details: '...' },
    { id: 3, name: '...', image: '/icons/search_line.png', details: '...' },
    { id: 4, name: '...', image: '/icons/search_line.png', details: '...' },
];
//다 다르게 이동됨
const JobDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const job = dummyJobs.find(job => job.id === Number(id));

    // 유효하지 않은 id 처리
    if (!job) {
        return <div className="p-4">존재하지 않는 일자리입니다.</div>;
    }

    // 저장 버튼 로직 (어떤 스토리지로 저장할지 정해야함)
    //const handleSave = () => {
    //    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    //    if (!saved.includes(job.id)) {
    //       saved.push(job.id);
    //        localStorage.setItem('savedJobs', JSON.stringify(saved));
    //    }
    //};

    return (
        <div className="w-full h-full bg-white">
            <div className="mt-[176px] flex flex-col items-center">
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
                        onClick={() => navigate(`/jobs/recommend/${job.id}/apply`)}
                        className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[16px] font-medium text-black"
                    >
                        신청
                    </button>
                    <button
                        //onClick={handleSave}
                        className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[16px] font-medium text-white"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;