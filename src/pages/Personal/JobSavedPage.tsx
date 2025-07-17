import Topbar from "../../shared/components/topbar/Topbar"

const JobSavedPage = () => {
  return (
    <div className="w-full h-full bg-white">
      <Topbar />
      <div className="mt-[17px] flex flex-col items-center">
        <p className="text-[20px] font-semibold text-[#747474]">
          일자리 저장함
        </p>
        

        <div className="w-[301px] flex gap-[13px] mt-[36px]">
          <button
            //onClick={() => navigate(`personal/jobs/recommend/${job.jobId}/apply`)}
            className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[16px] font-medium text-black"
          >
            직접 신청
          </button>
          <button
            //onClick={handleSave}
            className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[16px] font-medium text-black"
          >
            보호자 신청
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobSavedPage
