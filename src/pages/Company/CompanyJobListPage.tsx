import { useEffect, useState } from "react";
import { useJobGet } from "../../shared/hooks/job/useJobGet";
import Topbar from "../../shared/components/topbar/Topbar"
import CompanyCreateJobPage from "./CompanyCreateJobPage";
import CompanyCreateFormPage from "./CompanyCreateFormPage";

const CompanyJobListPage = () => {

    const [step, setStep] = useState(0);
    const { jobs, fetchJobs, loading, error } = useJobGet();

    useEffect(() => {
        if (step === 0) fetchJobs();
    }, [step, fetchJobs]);

    return (
        <div>
            <Topbar>
                <div className="w-full h-full">
                    {/* title부분 */}
                    <div className="mt-[17px] flex flex-col items-center">
                        <p className="text-[20px] font-semibold text-[#747474]">
                            신청서 입력
                        </p>
                        <div className="w-[323px] border-[1.3px] border-[#cccccc] mt-[12px]" />
                    </div>
                    {/* 신청서 입력 버튼 */}
                    <div>
                        {step === 0 && (
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex items-center gap-[11px] text-[20px] mt-[11px] text-[#747474] font-semibold"
                                >
                                    <img
                                        src="/icons/plus_icon.svg"
                                        alt="추가"
                                        className="w-[24px] h-[24px] cursor-pointer"
                                    />
                                    새 신청서 추가
                                </button>
                                <div className="w-[323px] border-[1.3px] border-[#cccccc] mt-[10px]" />
                                {/* 스트롤 영역 */}
                                <div className="overflow-y-auto max-h-[520px] mt-2 w-full flex flex-col gap-6 text-[17px] items-center">
                                    {loading && <div>로딩중...</div>}
                                    {error && <div>에러: {error.message}</div>}
                                    {jobs.map(job => (
                                        <div key={job.jobPostId} className="w-[301px] bg-white rounded-lg shadow-md p-3 flex flex-col items-center">
                                            <div className="font-semibold text-[17px] mb-2 text-[#222] text-center">{job.title}</div>
                                            <img
                                                src={job.imageUrl}
                                                alt={job.title}
                                                className="w-[265px] h-[115px] object-cover rounded-md mb-2 border"
                                            />
                                            <div className="w-full flex gap-[13px] mt-[7px]">
                                                <button
                                                    className="w-[144px] h-[45px] border-[1.3px] border-[#0D29B7] rounded-[8px] bg-white text-[16px] font-medium text-black">
                                                    삭제
                                                </button>
                                                <button
                                                    className="w-[144px] h-[45px] border-[1.3px] border-[#0D29B7] rounded-[8px] bg-[#0D29B7] text-[16px] font-medium text-white">
                                                    수정
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* step === 1 : 기본 정보 입력 */}
                        {step === 1 && <CompanyCreateJobPage onNext={() => setStep(2)} />}

                        {/* step === 2 : 추가 문항 입력 */}
                        {step === 2 && <CompanyCreateFormPage onBack={() => setStep(0)} />}
                    </div>
                </div>
            </Topbar>
        </div>
    )
}

export default CompanyJobListPage
