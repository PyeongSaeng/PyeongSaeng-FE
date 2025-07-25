import { useState } from "react";

interface Props {
    onBack: () => void;
}

export default function CompanyCreateFormPage({ onBack }: Props) {
  const [fields, setFields] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleAddField = () => {
    if (!inputValue.trim()) return;
    setFields((prev) => [...prev, inputValue]);
    setInputValue("");
    setIsInputVisible(false);
  };
  const handleRemoveField = (indexToRemove: number) => {
    setFields((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 기본 항목 */}
      <div className="mx-[17px] mt-[2px]">
        {["성함", "연세", "거주지", "전화번호", "주민등록번호 앞자리"].map((label, idx) => (
          <div key={label} className="h-[29px] flex items-center gap-[22px] mt-[21px]">
            <span className="text-[24px] text-[#414141] w-6">{idx + 1}</span>
            <span className="text-[24px] text-[#414141]">{label}</span>
          </div>
        ))}
        {/* 항목 추가 삭제 */}
        {fields.map((text, idx) => (
          <div key={`${text}-${idx}`} className="flex items-center gap-[22px] mt-[21px]">
            <span className="text-[24px] text-[#414141] w-6">{idx + 6}</span>
            <span className="text-[24px] text-[#414141] flex-1">{text}</span>
            <button onClick={() => handleRemoveField(idx)}>
              <img
                src="/icons/close_icon.svg"
                alt="삭제"
                className="w-[24px] h-[24px]"
              />
            </button>
          </div>
        ))}
        {/* 글자 답변 항목 입력창 (조건부 렌더링) */}
        {isInputVisible && (
          <div className="flex flex-col gap-[6px] mt-[12px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[24px] text-medium">{fields.length + 6}</span>
              <input
                type="text"
                placeholder="여기에 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 w-[260px] px-[16px] h-[45px] border border-[#c2c2c2] rounded-[8px] text-[#000000] placeholder:text-[#c2c2c2] text-[16px] text-medium"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddField}
                className="w-[84px] h-[45px] bg-[#0D29B7] rounded-[8px] text-[#f1f1f1] text-[16px] text-medium"
              >
                추가
              </button>
            </div>
          </div>
        )}


      </div>
      {/* 버튼 영역 */}
      <div className="mt-[35px] flex gap-[13px]">
        <button
          className="flex-1 w-[144px] h-[45px] border border-[#0D29B7] text-[#000000] rounded-[8px] text-[16px] font-medium"
          onClick={() => setIsInputVisible(true)}
        >
          글자 답변 항목 추가
        </button>
        <button className="flex-1 w-[144px] h-[45px] bg-[#0D29B7] text-white rounded-[8px] text-[16px] font-medium">
          사진 답변 항목 추가
        </button>
      </div>
      <button 
      onClick={onBack}
      className="w-[294px] h-[45px] mt-[47px] mx-auto bg-[#0D29B7] text-[16px] text-white rounded-[8px] font-medium">
        신청서 올리기
      </button>
    </div>
  );
}
