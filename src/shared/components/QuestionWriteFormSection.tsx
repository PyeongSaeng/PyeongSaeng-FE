interface Props {
  inputValue: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onSubmit: () => void;
}

export default function QuestionWriteFormSection({
  inputValue,
  onChange,
}: Props) {
  return (
    <div className="w-full flex flex-col items-start">
      {/* 상단 항목명 버튼 */}
      <button className="w-full h-12 border border-[#08D485] text-[#747474] rounded-md text-[16px] font-medium mb-4">
        지원동기
      </button>

      {/* 텍스트 입력 */}
      <textarea
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="여기에 입력해주세요"
        className="w-full max-w-[320px] h-40 resize-none border border-[#08D485] rounded-[8px] p-4 mb-10"
      />
    </div>
  );
}
