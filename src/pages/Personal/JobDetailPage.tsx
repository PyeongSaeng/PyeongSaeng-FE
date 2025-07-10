const JobDetailPage = () => {
    return (
        <div className="w-full h-full bg-white">
            <div className="mt-[176px] flex flex-col items-center">
                <p className="text-[20px] font-semibold text-[#747474]">
                    맟춤 일자리 추천
                </p>
                <div className="w-[297px] h-[168px] mt-[17px] border-[1.3px] border-[#A4A4A4] rounded-[10px] bg-gray-100" />
                <div className="w-[297px] h-[173px] mt-[22px] border-[1.3px] border-[#08D485] rounded-[13px] bg-white">

                </div>
                <div className="w-[301px] flex gap-[13px] mt-[36px]">
                    <button className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[16px] font-medium text-black">
                        신청
                    </button>
                    <button className="w-[144px] h-[45px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[16px] font-medium text-black">
                        저장
                    </button>
                </div>
            </div>



        </div>
    )
}

export default JobDetailPage
