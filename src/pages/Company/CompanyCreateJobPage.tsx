import { useState } from "react";
import ImageUploadButton from "../../shared/components/EvidenceSection/ImageUploadButton";
import AddressSearchInput from "../../shared/components/AddressSearchInput";

interface Props {
    onNext: () => void;
}

export default function CompanyCreateJobPage({ onNext }: Props) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);
    const handleFileSelect = (file: File) => {
        setImageFile(file);
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            {/* 근무지 이미지 */}
            <div className="flex flex-row mt-[26px] gap-[24px]">
                <label className="w-[56px] h-[48px] font-medium text-[#414141] text-[20px] flex justify-center items-center">근무지 이미지</label>
                <div className={`
                    w-[231px] h-[45px] 
                    transition-colors
                    ${dragging ? 'bg-blue-50' : 'bg-white'}
                    `}>
                    <ImageUploadButton
                        imageFile={imageFile}
                        onFileSelect={handleFileSelect}
                        className="text-[#0D29B7]"
                        onDragStateChange={setDragging} />
                </div>
            </div>

            {/* 근무지 주소 */}
            <div className="flex flex-row mt-[15px] mb-[3px] gap-[14px]">
                <label className="mt-[19px] font-medium text-[#414141] text-[20px]">
                    근무지
                </label>
                <div className="w-[251px] h-[120px] pl-[12px] flex flex-col gap-[10px] items-center justify-center">
                    <AddressSearchInput />
                </div>
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
                        className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center px-auto text-[#000000] placeholder:text-[#c2c2c2] placeholder:text-[16px]"
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
