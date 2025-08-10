import { useState } from "react";
import ImageUploadButton from "../../shared/components/EvidenceSection/ImageUploadButton";
import AddressSearchInput from "../../shared/components/AddressSearchInput";
import { JobDraft } from "./types/job";
import { useImageUpload } from "../../shared/hooks/useImageUpload";

interface Props {
    draft: JobDraft;
    onChangeDraft: (patch: Partial<JobDraft>) => void;
    onNext: () => void;
}

export default function CompanyCreateJobPage({ draft, onChangeDraft, onNext }: Props) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { uploadImage } = useImageUpload();
    const [dragging, setDragging] = useState(false);
    const lastUploadedName =
        draft.jobPostImageList?.[draft.jobPostImageList.length - 1]?.originalFileName ?? '';
    const handleFileSelect = async (file: File) => {
        setImageFile(file);
        const res = await uploadImage(file);
        if (res) {
            onChangeDraft({
                jobPostImageList: [
                    ...(draft.jobPostImageList ?? []),
                    { keyName: res.keyName, originalFileName: file.name },
                ],
            });
        }
    };

    const validateAndNext = () => {
        const hasText = (v?: string | null) => !!v && v.trim().length > 0;

        if (!(draft.jobPostImageList?.length)) {
            alert("근무지 이미지를 첨부해 주세요!");
            return;
        }
        if (!hasText(draft.address)) {
            alert("주소를 입력해 주세요!");
            return;
        }
        if (!hasText(draft.detailAddress)) {
            alert("상세 주소를 입력해 주세요!");
            return;
        }
        if (!hasText(draft.description)) {
            alert("근무내용을 입력해 주세요!");
            return;
        }
        if (draft.hourlyWage === undefined || draft.hourlyWage === null || draft.hourlyWage <= 0) {
            alert("시급을 올바르게 입력해 주세요!");
            return;
        }
        if (!hasText(draft.workingTime)) {
            alert("근무일수를 입력해 주세요!");
            return;
        }
        if (!hasText(draft.deadline)) {
            alert("마감기한을 입력해 주세요!");
            return;
        }
        onNext();
    };

    return (
        <div className="w-full h-full flex flex-col items-center overflow-y-auto scrollbar-hide" style={{ maxHeight: "562px" }}>
            {/* 근무지 이미지 */}
            <div className="flex flex-row mt-[26px] gap-[24px]">
                <label className="w-[56px] h-[48px] font-medium text-[#414141] text-[20px] flex justify-center items-center">
                    근무지 이미지
                </label>
                <div className={`w-[231px] h-[45px] transition-colors ${dragging ? "bg-blue-50" : "bg-white"}`}>
                    <ImageUploadButton
                        imageFile={imageFile}
                        onFileSelect={handleFileSelect}
                        className="text-[#0D29B7]"
                        onDragStateChange={setDragging}
                        fallbackName={lastUploadedName}
                    />
                </div>
            </div>

            {/* 근무지 주소 */}
            <div className="flex flex-row mt-[15px] mb-[3px] gap-[14px]">
                <label className="mt-[19px] font-medium text-[#414141] text-[20px]">근무지</label>
                <div className="w-[251px] h-[120px] pl-[12px] flex flex-col gap-[10px] items-center justify-center">
                    <AddressSearchInput
                        address={draft.address ?? ""}
                        detailAddress={draft.detailAddress ?? ""}
                        onChangeAddress={(address) => onChangeDraft({ address })}
                        onChangeZipcode={(zipcode) => onChangeDraft({ zipcode })}
                        onChangeDetail={(detail) => onChangeDraft({ detailAddress: detail })}
                        onChangeRoadAddress={(roadAddress) => onChangeDraft({ roadAddress })}
                    />
                </div>
            </div>

            {/* 근무내용 */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">근무내용</label>
                <input
                    type="text"
                    value={draft.description ?? ""}
                    onChange={(e) => onChangeDraft({ description: e.target.value })}
                    placeholder="여기에 입력하세요."
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center text-[#000000] placeholder:text-[#c2c2c2]"
                />
            </div>

            {/* 시급 */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">시급</label>
                <input
                    type="number"
                    value={draft.hourlyWage ?? ""}
                    onChange={(e) =>
                        onChangeDraft({ hourlyWage: e.target.value === "" ? undefined : Number(e.target.value) })
                    }
                    placeholder="여기에 입력하세요."
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center text-[#000000] placeholder:text-[#c2c2c2]"
                />
            </div>

            {/* 근무일수 */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">근무일수</label>
                <input
                    type="text"
                    value={draft.workingTime ?? ""}
                    onChange={(e) => onChangeDraft({ workingTime: e.target.value })}
                    placeholder="예: 주 3일, 평일 오전 등"
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center text-[#000000] placeholder:text-[#c2c2c2]"
                />
            </div>

            {/* 마감기한 */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">마감기한</label>
                <input
                    type="date"
                    value={draft.deadline ?? ""}
                    onChange={(e) => onChangeDraft({ deadline: e.target.value })}
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center text-[#000000]"
                />
            </div>

            {/* 다음 단계 */}
            <button
                onClick={validateAndNext}
                className="w-[294px] mt-[24px] bg-[#0D29B7] text-white rounded-[8px] text-[16px] font-medium mb-[44px] p-5"
            >
                신청서 양식 작성하기
            </button>
        </div>
    );
}
