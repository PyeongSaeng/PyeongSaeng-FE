import { useState } from "react";
import Topbar from "../../shared/components/topbar/Topbar";
import { useShow } from "./hooks/useShow";
import { useDeleteBookmark } from "./hooks/useDelete";

const JobSavedPage = () => {
  const { data: savedJobs, isLoading } = useShow();
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const { mutate: deleteBookmark } = useDeleteBookmark();

  const handleRemove = (jobPostId: number) => {
    setSelectedJobId(null);
    deleteBookmark(jobPostId);
  };

  return (
    <Topbar>
      <div className="w-full h-full flex flex-col items-center">
        <div className="mt-[17px] flex flex-col items-center">
          <p className="text-[20px] font-semibold text-[#747474]">일자리 저장함</p>
        </div>

        {/* 스크롤 영역 */}
        <div
          className="flex-1 w-full flex flex-col items-center overflow-y-auto mt-[22px] space-y-8 scrollbar-hide"
          style={{ maxHeight: "450px" }}
        >
          {isLoading || !savedJobs ? (
            <p className="text-[#747474] text-[16px]">불러오는 중...</p>
          ) : savedJobs.length === 0 ? (
            <p className="text-[#747474] text-[16px]">저장된 일자리가 없습니다.</p>
          ) : (
            savedJobs.map((item) => {
              const job = item.jobPostDetailDTO;
              const isSelected = selectedJobId === item.bookmarkId;

              return (
                <div key={item.bookmarkId} className="flex flex-col relative">
                  {/* 선택/취소 라벨 */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[27px] h-[27px] rounded-full border-2 border-[#08D485] bg-white flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        setSelectedJobId(isSelected ? null : item.bookmarkId)
                      }
                    >
                      {isSelected && (
                        <div className="w-[15px] h-[15px] rounded-full bg-[#08D485]" />
                      )}
                    </div>
                    <div
                      className="w-[56px] h-[19px] flex items-center justify-center text-[16px] text-[#747474] font-medium cursor-pointer"
                      onClick={() =>
                        setSelectedJobId(isSelected ? null : item.bookmarkId)
                      }
                    >
                      선택하기
                    </div>

                    {/* 삭제 버튼 */}
                    <img
                      src="/icons/close_icon.svg"
                      alt="취소"
                      className="w-[27px] h-[27px] cursor-pointer absolute right-0 top-0 z-10"
                      onClick={() => handleRemove(item.jobPostDetailDTO.images[0].jobPostId)}
                    />
                  </div>

                  {/* 일자리 카드 */}
                  <div
                    className={`
                      w-[291px] h-[362px] mt-[11px] rounded-[10px] overflow-hidden
                      border-[1.3px] flex flex-col items-center
                      ${isSelected ? "border-[#08D485] bg-[#ECF6F2]" : "border-[#A4A4A4] bg-white"}
                    `}
                    onClick={() =>
                      setSelectedJobId(isSelected ? null : item.bookmarkId)
                    }
                  >
                    <div className="w-[248px] h-[140px] mt-[30px] border-[1.1px] border-[#A4A4A4] rounded-[10px] overflow-hidden">
                      <img
                        src={job.images[0]?.imageUrl}
                        alt={job.images[0]?.keyName || "job"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-[248px] h-[143px] mt-[18px] border-[1.1px] border-[#08D485] rounded-[13px] bg-white p-[10px]">
                      <p className="text-[13px] font-semibold text-[#414141] mb-[6px]">
                        {job.title}
                      </p>
                      <p className="text-[11px] font-normal text-[#414141] whitespace-pre-line">
                        거리: {job.travelTime}{"\n"}
                        시급: {job.hourlyWage.toLocaleString()}원{"\n"}
                        근무시간: {job.workingTime}{"\n"}
                        월급:{" "}
                        {job.monthlySalary
                          ? `${job.monthlySalary.toLocaleString()}원`
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="w-[301px] mt-[18px] flex gap-[13px]">
          <button
            disabled={!selectedJobId}
            className={`w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[16px] font-medium text-black ${!selectedJobId ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            직접 신청
          </button>
          <button
            disabled={!selectedJobId}
            className={`w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[16px] font-medium ${!selectedJobId ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            보호자 신청
          </button>
        </div>
      </div>
    </Topbar>
  );
};

export default JobSavedPage;
