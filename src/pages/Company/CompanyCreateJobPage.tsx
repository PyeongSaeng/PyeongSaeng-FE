import { useState } from "react";
import ImageUploadButton from "../../shared/components/EvidenceSection/ImageUploadButton";
import AddressSearchInput from "../../shared/components/AddressSearchInput";
import { CreateJobDTO } from "../../shared/types/job";
import { useJobPost } from "../../shared/hooks/job/useJobPost";
import { useImageUpload } from "../../shared/hooks/useImageUpload";

interface Props {
    onNext: () => void;
}

export default function CompanyCreateJobPage({ onNext }: Props) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageKey, setImageKey] = useState<string | null>(null);
    const { uploadImage, loading, error } = useImageUpload();
    const [dragging, setDragging] = useState(false);
    const { postJob } = useJobPost();
    const [form, setForm] = useState<CreateJobDTO>({
        title: "",
        address: "",
        detailAddress: "",
        roadAddress: "",
        zipcode: "",
        hourlyWage: undefined,
        monthlySalary: undefined,
        yearSalary: undefined,
        description: "",
        workingTime: "",
        deadline: "",
        recruitCount: undefined,
        note: "",
        keyName: [],
    });

    const handleFileSelect = async (file: File) => {
        setImageFile(file);
        const res = await uploadImage(file);
        if (res) {
            setImageUrl(res.url);
            setImageKey(res.keyName);
            setForm((prev) => ({
                ...prev,
                keyName: [res.keyName],
            }));
        }
    };

    const handelSubmit = async () => {
        if (!form.keyName || form.keyName.length === 0) {
            alert("근무지 이미지를 첨부해 주세요!");
            return;
        }
        try {
            await postJob(form);
            onNext(); // 여기서만 호출
        } catch (e) {
            alert("등록에 실패했습니다!");
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center overflow-y-auto scrollbar-hide"
            style={{ maxHeight: "562px" }}>
            {/* 근무지 이미지 */}
            < div className="flex flex-row mt-[26px] gap-[24px]" >
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
            </div >

            {/* 근무지 주소 */}
            < div className="flex flex-row mt-[15px] mb-[3px] gap-[14px]" >
                <label className="mt-[19px] font-medium text-[#414141] text-[20px]">
                    근무지
                </label>
                <div className="w-[251px] h-[120px] pl-[12px] flex flex-col gap-[10px] items-center justify-center">
                    <AddressSearchInput
                        address={form.address}
                        zipcode={form.zipcode}
                        detailAddress={form.detailAddress}
                        onChangeAddress={address => setForm({ ...form, address })}
                        onChangeZipcode={zipcode => setForm({ ...form, zipcode })}
                        onChangeDetail={detail => setForm({ ...form, detailAddress: detail })} />
                </div>
            </div >
            {/* 입력 필드들 */}
            {/* 근무내용 (description) */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">근무내용</label>
                <input
                    type="text"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="여기에 입력하세요."
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center px-auto text-[#000000] placeholder:text-[#c2c2c2] placeholder:text-[16px]"
                />
            </div>

            {/* 시급 (hourlyWage) */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">시급</label>
                <input
                    type="number"
                    value={form.hourlyWage ?? ""}
                    onChange={e => setForm({ ...form, hourlyWage: Number(e.target.value) || undefined })}
                    placeholder="여기에 입력하세요."
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center px-auto text-[#000000] placeholder:text-[#c2c2c2] placeholder:text-[16px]"
                />
            </div>

            {/* 근무일수 (workingTime) */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">근무일수</label>
                <input
                    type="text"
                    value={form.workingTime}
                    onChange={e => setForm({ ...form, workingTime: e.target.value })}
                    placeholder="예: 주 3일, 평일 오전 등"
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center px-auto text-[#000000] placeholder:text-[#c2c2c2] placeholder:text-[16px]"
                />
            </div>

            {/* 구직인원 (recruitCount) */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">구직인원</label>
                <input
                    type="number"
                    value={form.recruitCount ?? ""}
                    onChange={e => setForm({ ...form, recruitCount: Number(e.target.value) || undefined })}
                    placeholder="여기에 입력하세요."
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center px-auto text-[#000000] placeholder:text-[#c2c2c2] placeholder:text-[16px]"
                />
            </div>

            {/* 특이사항 (note) */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">특이사항</label>
                <input
                    type="text"
                    value={form.note}
                    onChange={e => setForm({ ...form, note: e.target.value })}
                    placeholder="특이사항이 있으면 입력"
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center px-auto text-[#000000] placeholder:text-[#c2c2c2] placeholder:text-[16px]"
                />
            </div>

            {/* 마감기한 (deadline) */}
            <div className="flex flex-row items-center gap-[12px] mt-[13px]">
                <label className="w-[70px] text-[20px] text-[#414141] font-medium">마감기한</label>
                <input
                    type="text"
                    value={form.deadline}
                    onChange={e => setForm({ ...form, deadline: e.target.value })}
                    placeholder="xxxx-xx-xx"
                    className="w-[231px] h-[45px] border border-[#E1E1E1] rounded-[8px] text-[16px] text-center px-auto text-[#000000] placeholder:text-[#c2c2c2] placeholder:text-[16px]"
                />
            </div>
            {/* 신청서 양식 작성 버튼 */}
            <button
                //onClick={handelSubmit}
                onClick={onNext}
                className="w-[294px] mt-[24px] bg-[#0D29B7] text-white rounded-[8px] text-[16px] font-medium mb-[44px] p-5"
            >
                신청서 양식 작성하기
            </button>
        </div >
    );
}
