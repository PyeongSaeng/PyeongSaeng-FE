// src/pages/jobs/JobSavedPage.tsx
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
    name: "죽전1동 행정복지센터 미화원",
    image: "/icons/popular-dummy1.png",
    details:
      "거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원",
  },
  {
    jobId: 2,
    name: "죽전2동 행정복지센터 미화원",
    image: "/icons/popular-dummy1.png",
    details:
      "거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원",
  },
  {
    jobId: 3,
    name: "죽전3동 행정복지센터 미화원",
    image: "/icons/popular-dummy1.png",
    details:
      "거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원",
  },
  {
    jobId: 4,
    name: "죽전4동 행정복지센터 미화원",
    image: "/icons/popular-dummy1.png",
    details:
      "거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원",
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
    <Topbar>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="mt-[17px] flex flex-col items-center">
          <p className="text-[20px] font-semibold text-[#747474]">일자리 저장함</p>
        </div>

        <div className="mt-[17px] flex-1 overflow-y-auto scrollbar-hide flex flex-col items-center space-y-14 px-4">
          {savedJobs.length === 0 ? (
            <p className="text-gray-500">저장된 일자리가 없습니다.</p>
          ) : (
            savedJobs.map((job) => {
              const isSelected = selectedJobId === job.jobId;
              return (
                <div key={job.jobId} className="w-full flex flex-col ">
                  <div className="flex items-center gap-2 mb-2">
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
                      className={`w-[56px] h-[19px] flex items-center justify-center text-[16px] text-[#747474] font-medium`}
                      onClick={() =>
                        setSelectedJobId(isSelected ? null : job.jobId)
                      }
                    >
                      선택하기
                    </div>
                  </div>


                  <div
                    className={`
                      w-[291px] h-[362px] mt-[11px] rounded-[10px] overflow-hidden
                      border-[1.3px] flex flex-col items-center
                      ${isSelected ? "border-[#08D485] bg-[#ECF6F2]" : "border-[#A4A4A4] bg-white"}
                    `}
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
            })
          )}
        </div>

        <div className="w-[301px] flex gap-[13px] py-[16px] justify-center">
          <button className="flex-1 h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[16px] font-medium text-black">
            직접 신청
          </button>
          <button className="flex-1 h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[16px] font-medium">
            보호자 신청
          </button>
        </div>
      </div>
    </Topbar>
  );
};

export default JobSavedPage;
