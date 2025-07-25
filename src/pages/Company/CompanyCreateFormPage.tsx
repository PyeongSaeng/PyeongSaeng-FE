import { useState } from "react";

export default function CompanyCreateFormPage() {
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
      <div className="flex flex-col gap-2">
        {["성함", "연세", "거주지", "전화번호", "주민등록번호 앞자리"].map((label, idx) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[18px] w-6">{idx + 1}.</span>
            <span className="text-[18px]">{label}</span>
          </div>
        ))}
        {/* 항목 추가 삭제 */}
        {fields.map((text, idx) => (
          <div key={`${text}-${idx}`} className="flex items-center gap-2 mt-2">
            <span className="text-[18px] w-6">{idx + 6}.</span>
            <span className="text-[18px] flex-1">{text}</span>
            <button onClick={() => handleRemoveField(idx)}>
              <img
                src="/icons/close_icon.svg"
                alt="삭제"
                className="w-[20px] h-[20px]"
              />
            </button>
          </div>
        ))}

        {/* 👉 글자 답변 항목 입력창 (조건부 렌더링) */}
        {isInputVisible && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[18px] w-6">{fields.length + 6}.</span>
            <input
              type="text"
              placeholder="여기에 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3 text-sm"
            />
            <button
              onClick={handleAddField}
              className="px-3 h-[40px] bg-black text-white rounded-md text-sm"
            >
              추가
            </button>
          </div>
        )}


      </div>

      {/* 버튼 영역 */}
      <div className="mt-6 flex gap-2">
        <button
          className="flex-1 h-[45px] border border-[#0D29B7] text-[#0D29B7] rounded-md text-sm font-medium"
          onClick={() => setIsInputVisible(true)}
        >
          글자 답변 항목 추가
        </button>
        <button className="flex-1 h-[45px] bg-[#0D29B7] text-white rounded-md text-sm font-medium">
          사진 답변 항목 추가
        </button>
      </div>

      <button className="mt-4 h-[45px] bg-[#0D29B7] text-white rounded-md font-semibold">
        신청서 올리기
      </button>
    </div>
  );
}
