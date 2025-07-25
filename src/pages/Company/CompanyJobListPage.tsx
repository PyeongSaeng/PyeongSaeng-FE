import Topbar from "../../shared/components/topbar/Topbar"

const CompanyJobListPage = () => {
    return (
        <div>
            <Topbar>
                <div className="w-full h-full">
                    {/* title부분 */}
                    <div className="mt-[17px] flex flex-col items-center">
                        <p className="text-[20px] font-semibold text-[#747474]">
                            신청서 입력
                        </p>
                        <div className="w-[323px] border-[1.3px] border-[#cccccc] mb-[2.4rem] mt-[12px]" />
                    </div>
                    {/* 신청서 입력 버튼 */}
                    <div>

                        <div className="w-[323px] border-[1.3px] border-[#cccccc] mb-[2.4rem] mt-[10px]" />
                    </div>
                    {/* 스트롤 영역 */}
                    <div>

                    </div>
                </div>
            </Topbar>
        </div>
    )
}

export default CompanyJobListPage
