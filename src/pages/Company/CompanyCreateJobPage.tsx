interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function CompanyCreateJobPage({ onNext }: Props) {
    return (
        <div className="w-full h-full flex flex-col items-center">
            {/* 근무지 이미지 */}
            <div className="flex flex-row mt-[26px] gap-[24px]">
                <label className="w-[56px] h-[48px] font-medium text-[#414141] text-[20px] flex justify-center items-center">근무지 이미지</label>
                <button className="w-[231px] h-[45px] border border-[#0D29B7] rounded-[8px] text-[#0D29B7] flex justify-center items-center text-[16px] font-medium">
                    이미지를 업로드 하세요.
                </button>
            </div>
            {/* 근무지 주소 */}
            <div className="flex flex-row mt-[26px] gap-[24px]">
                <label className="w-[52px] h-[24px] font-medium text-[#414141] text-[20px] flex justify-center items-center">근무지</label>
            </div>
            {/* 단순 입력 필드들 */}
            {[
                "근무내용",
                "시급",
                "근무일수",
                "구직인원",
                "특이사항",
                "마감기한",
            ].map((label) => (
                <div key={label} className="flex flex-row items-center gap-[12px] mt-[13px]">
                    <label
                        className="w-[70px] text-[20px] text-[#414141] font-medium"
                    >
                        {label}
                    </label>
                    <input
                        type="text"
                        placeholder="여기에 입력하세요."
                        className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] px-[55px] text-[#000000] placeholder:text-[#c2c2c2] placeholder:text-[16px]"
                    />
                </div>
            ))}
            {/* 신청서 양식 작성 버튼 */}
            <button
                onClick={onNext}
                className="w-[294px] h-[45px] mt-[24px] bg-[#0D29B7] text-white rounded-[8px] text-[16px] font-medium"
            >
                신청서 양식 작성하기
            </button>
        </div>
    );
}
