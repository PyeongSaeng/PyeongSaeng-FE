import { useState } from "react";
import Topbar from "../../shared/components/topbar/Topbar"
import CompanyCreateJobPage from "./CompanyCreateJobPage";
import CompanyCreateFormPage from "./CompanyCreateFormPage";

const CompanyJobListPage = () => {
    const [step, setStep] = useState(0);

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
                                        className="w-[24px] h-[24px]"
                                    />
                                    새 신청서 추가
                                </button>
                                <div className="w-[323px] border-[1.3px] border-[#cccccc] mt-[10px]" />
                                {/* 스트롤 영역 */}
                                
                                {/* 버튼 */}
                                <div>
                                    <div className="w-[301px] flex gap-[13px] mt-[20px]">
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
