import Topbar from "../../shared/components/topbar/Topbar"

const JobDraftsPage = () => {
    return (
        <Topbar>
            <div className="w-full h-full">
                <div className="mt-[17px] flex flex-col items-center">
                    <p className="text-[20px] font-semibold text-[#747474]">
                        일자리 신청함
                    </p>
                </div>
                <div className="w-[301px] flex gap-[13px] mt-[16px] justify-center">
                    <button className="flex-1 h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] text-[16px] font-medium text-black">
                        작성 전
                    </button>
                    <button className="flex-1 h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] text-[16px] font-medium">
                        작성 후
                    </button>
                </div>
            </div>
        </Topbar>
    )
}

export default JobDraftsPage
