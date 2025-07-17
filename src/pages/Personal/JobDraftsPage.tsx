import Topbar from "../../shared/components/topbar/Topbar"

const JobDraftsPage = () => {
    return (
        <div className="w-full h-full">
            <Topbar />
            <div className="mt-[17px] flex flex-col items-center">
                <p className="text-[20px] font-semibold text-[#747474]">
                    맟춤 일자리 추천
                </p>
            </div>
        </div>
    )
}

export default JobDraftsPage
