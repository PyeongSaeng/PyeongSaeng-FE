import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from './types/jobs';
import Topbar from '../../shared/components/topbar/Topbar';


type Props = {
    formFields: FormField[];
    roadAddress: string;
};

const JobApplyDefaultForm = ({ formFields, roadAddress }: Props) => {
    const [step, setStep] = useState<1 | 2>(1);
    const navigate = useNavigate();
    return (
        <Topbar>
            <div className="p-[13px]">
                <h2 className="text-[20px] text-[#747474] font-semibold mt-[12px] text-center">신청서 작성</h2>

                {step === 1 && (
                    <>
                        <p className="text-[16px] text-[#747474] font-semibold mt-[27px]">신청서에 추가할 항목이 없습니다.<br />제출하시겠습니까?</p>

                        <button className="w-[294px] h-[45px] mt-[21px] text-[16px] text-[#747474] border-[1.3px] border-[#08D485] rounded-[8px] text-[#747474]">
                            {roadAddress}
                        </button>

                        <div className="p-[18px] border-[1.3px] border-[#08D485] rounded-[13px] mt-[23px]">
                            <span className="text-[16px] text-[#414141]">
                                기본 정보
                            </span>
                            <div className="mt-[14px] text-[14px] text-[#414141]">
                                {formFields.map((field) => (
                                    <div className="flex justify-between mb-[8px]" key={field.id}>
                                        <span className="font-semibold">{field.fieldName}</span>
                                        <span>{field.answer ?? '-'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between gap-[13px] mt-[69px]">
                            <button className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] text-[#000000]">
                                저장
                            </button>
                            <button
                                className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
                                onClick={() => setStep(2)}
                            >
                                제출
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <p className="text-[16px] text-[#747474] font-semibold mt-[27px]">신청 완료되었습니다</p>

                        <button className="w-[294px] h-[45px] mt-[44px] border-[1.3px] border-[#08D485] rounded-[8px] text-[#747474]">
                            {roadAddress}
                        </button>

                        <div className="p-[18px] border-[1.3px] border-[#08D485] rounded-[13px] mt-[23px]">
                            <span className="text-[16px] text-[#414141]">
                                기본 정보
                            </span>
                            <div className="mt-[14px] text-[14px] text-[#414141]">
                                {formFields.map((field) => (
                                    <div className="flex justify-between mb-[8px]" key={field.id}>
                                        <span className="font-semibold">{field.fieldName}</span>
                                        <span>{field.answer ?? '-'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="w-full h-[45px] mt-[72px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            홈으로
                        </button>
                    </>
                )}
            </div>
        </Topbar>
    );
};

export default JobApplyDefaultForm;
