import { useEffect, useState } from "react";
import Topbar from "../../shared/components/topbar/Topbar";

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
    details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원'
  },
  {
    jobId: 2,
    name: '죽전2동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원'
  },
  {
    jobId: 3,
    name: '죽전3동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원'
  },
  {
    jobId: 4,
    name: '죽전4동 행정복지센터 미화원',
    image: '/icons/popular-dummy1.png',
    details: '거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원'
  },
];

const JobSavedPage = () => {
  const [savedJobs, setSavedJobs] = useState<JobType[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  useEffect(() => {
    const savedIds: number[] = JSON.parse(localStorage.getItem("savedJobs") || "[]");

    const jobs = dummyJobs.filter((job) => savedIds.includes(job.jobId));
    setSavedJobs(jobs);
  }, []);

  return (
    <div className="w-full h-full">
      <Topbar />
      <div className="mt-[17px] flex flex-col items-center">
        <p className="text-[20px] font-semibold text-[#747474]">일자리 저장함</p>

        {savedJobs.length === 0 ? (
          <p className="mt-4 text-gray-500">저장된 일자리가 없습니다.</p>
        ) : (
          <div className="mt-22 space-y-14 ">
            {savedJobs.map((job) => (
              <div
                key={job.jobId}
                className={`
                  w-[291px] h-[362px] rounded-[10px] overflow-hidden border-[1.3px] flex flex-col items-center 
                  ${selectedJobId === job.jobId ? "bg-[#ECF6F2]" : "border-[#A4A4A4]"}
                `}
                onClick={() =>
                  setSelectedJobId(
                    selectedJobId === job.jobId ? null : job.jobId
                  )
                }
              >
                <div className="w-[248px] h-[140px] mt-[30px] border-[1.1px] border-[#A4A4A4] rounded-[10px] overflow-hidden">
                  <img
                    src={job.image}
                    alt={job.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-[248px] h-[143px] mt-[18px] border-[1.1px] border-[#08D485] rounded-[13px] bg-white">
                  <p className="text-[13px] font-semibold text-[#414141] mb-[10px]">
                    {job.name}
                  </p>
                  <p className="text-[11px] font-normal text-[#414141]">
                    {job.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="w-[301px] flex gap-[13px] mt-[36px]">
          <button className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[16px] font-medium text-black">
            직접 신청
          </button>
          <button className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[16px] font-medium text-black">
            보호자 신청
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSavedPage;
