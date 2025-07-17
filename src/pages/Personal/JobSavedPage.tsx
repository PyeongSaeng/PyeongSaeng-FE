import { useEffect, useState } from "react";
import Topbar from "../../shared/components/topbar/Topbar";

// 1) JobType 인터페이스 정의
interface JobType {
  jobId: number;
  name: string;
  image: string;
  details: string;
}

// 2) dummyJobs도 JobType[] 로 선언
const dummyJobs: JobType[] = [
  {
    jobId: 1,
    name: "죽전2동 행정복지센터 미화원",
    image: "/icons/search_line.png",
    details: "거리: 도보 및 지하철 20분, 시급: 12,240원, 근무시간: 월수금 2시간, 월급: 29만원",
  },
  { jobId: 2, name: "...", image: "/icons/search_line.png", details: "..." },
  { jobId: 3, name: "...", image: "/icons/search_line.png", details: "..." },
  { jobId: 4, name: "...", image: "/icons/search_line.png", details: "..." },
];

const JobSavedPage = () => {
  const [savedJobs, setSavedJobs] = useState<JobType[]>([]);

  useEffect(() => {
    // localStorage에 저장된 ID 배열 읽기
    const savedIds: number[] = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    // jobId 기준으로 필터링
    const jobs = dummyJobs.filter((job) => savedIds.includes(job.jobId));
    setSavedJobs(jobs);
  }, []);

  return (
    <div className="w-full h-full bg-white">
      <Topbar />
      <div className="mt-[17px] flex flex-col items-center">
        <p className="text-[20px] font-semibold text-[#747474]">일자리 저장함</p>

        {savedJobs.length === 0 ? (
          <p className="mt-4 text-gray-500">저장된 일자리가 없습니다.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {savedJobs.map((job) => (
              <div
                key={job.jobId}
                className="w-[297px] border border-[#A4A4A4] rounded-lg p-4"
              >
                <p className="font-semibold">{job.name}</p>
                <p className="text-sm">{job.details}</p>
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
