import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Topbar from '../../shared/components/topbar/Topbar';

interface JobType {
  jobId: number;
  name: string;
  image: string;
  details: string;
}
const dummyJobs: JobType[] = [
  {
    jobId: 1,
    name: '죽전1동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details:
      '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원',
  },
  {
    jobId: 2,
    name: '죽전2동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details:
      '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원',
  },
  {
    jobId: 3,
    name: '죽전3동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details:
      '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원',
  },
  {
    jobId: 4,
    name: '죽전4동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details:
      '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원',
  },
];

const JobDraftsPage = () => {
  const [jobs, setJobs] = useState<JobType[]>(dummyJobs);
  const [selected, setSelected] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleGoApply = () => {
    if (!selectedJobId) return;
    navigate(`/personal/jobs/recommend/${selectedJobId}/apply`);
  };
  return (
    <>
      <Topbar />

      <div className="w-full h-full flex flex-col">
        <div className="mt-[17px] flex flex-col items-center">
          <p className="text-[20px] font-semibold text-[#747474]">
            일자리 신청함
          </p>
        </div>

        <div className="w-[301px] flex gap-[13px] mt-[16px] justify-center self-center">
          <button
            className={`flex-1 h-[45px] border-[1.3px] rounded-[8px] text-[16px] font-medium
                  ${selected === 0 ? 'bg-[#ECF6F2] border-[#08D485] text-black' : 'bg-white border-[#08D485] text-black'}`}
            onClick={() => setSelected(0)}
          >
            작성 전
          </button>
          <button
            className={`flex-1 h-[45px] border-[1.3px] rounded-[8px] text-[16px] font-medium
                  ${selected === 1 ? 'bg-[#ECF6F2] border-[#08D485] text-black' : 'bg-white border-[#08D485] text-black'}`}
            onClick={() => setSelected(1)}
          >
            작성중
          </button>
        </div>

        {/* 스크롤 영역 */}
        <div
          className="flex-1 w-full flex justify-center"
          style={{ minHeight: 0 }}
        >
          <div
            className="w-[291px] flex flex-col items-center overflow-y-auto mt-[22px] space-y-9 scrollbar-hide" // ✅ w-[291px] 로 수정
            style={{ maxHeight: '400px' }}
          >
            {jobs.map((job) => {
              const isSelected = selectedJobId === job.jobId;
              return (
                <div
                  key={job.jobId}
                  className="flex flex-col items-start relative"
                >
                  <div className="flex items-center gap-[6px]">
                    {/* 동그라미 */}
                    <div
                      className="w-[27px] h-[27px] rounded-full border-2 border-[#08D485] bg-white flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        setSelectedJobId(isSelected ? null : job.jobId)
                      }
                    >
                      {isSelected && (
                        <div className="w-[15px] h-[15px] rounded-full bg-[#08D485]" />
                      )}
                    </div>
                    <div
                      className="w-[56px] h-[19px] flex items-center justify-center text-[16px] text-[#747474] font-medium cursor-pointer"
                      onClick={() =>
                        setSelectedJobId(isSelected ? null : job.jobId)
                      }
                    >
                      선택하기
                    </div>
                    {/* 취소하기 */}
                    <img
                      src="/icons/close_icon.svg"
                      alt="취소"
                      className="w-[27px] h-[27px] cursor-pointer absolute right-0 top-0"
                      onClick={() => {
                        setSelectedJobId((prev) =>
                          prev === job.jobId ? null : prev
                        );
                        setJobs((prevJobs) =>
                          prevJobs.filter((j) => j.jobId !== job.jobId)
                        );
                      }}
                    />
                  </div>

                  <div
                    className={`w-[291px] h-[362px] mt-[11px] rounded-[10px] overflow-hidden border-[1.3px] flex flex-col items-center
                          ${isSelected ? 'border-[#08D485] bg-[#ECF6F2]' : 'border-[#08D485] bg-white'}`}
                    onClick={() =>
                      setSelectedJobId(isSelected ? null : job.jobId)
                    }
                  >
                    <div className="w-[248px] h-[140px] mt-[30px] border-[1.1px] border-[#A4A4A4] rounded-[10px] overflow-hidden">
                      <img
                        src={job.image}
                        alt={job.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[248px] h-[143px] mt-[18px] border-[1.1px] border-[#08D485] rounded-[13px] bg-white p-[10px]">
                      <p className="text-[13px] font-semibold text-[#414141] mb-[6px]">
                        {job.name}
                      </p>
                      <p className="text-[11px] font-normal text-[#414141]">
                        {job.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="w-full flex justify-center mt-[24px] mb-4">
          <button
            className="w-[294px] h-[45px] rounded-[8px] text-[16px] font-semibold bg-[#08D485] text-black disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedJobId === null}
            onClick={handleGoApply}
          >
            {selected === 0 ? '신청서 작성하기' : '신청서 이어서 작성하기'}
          </button>
        </div>
      </div>
    </>
  );
};

export default JobDraftsPage;
