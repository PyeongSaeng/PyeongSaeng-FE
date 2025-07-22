import { clsx } from 'clsx';

interface Props {
  inputValue: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onSubmit: () => void;
  className?: string; // 확장용
}

export default function QuestionWriteFormSection({
  inputValue,
  onChange,
  className,
}: Props) {
  return (
    <div className={clsx('w-full flex flex-col items-start', className)}>
      {/* 상단 항목명 버튼 */}
      <button
        type="button"
        className="w-full h-[4.5rem] mb-6 rounded-[8px] border border-[#08D485] text-[16px] font-semibold text-[#747474]"
        disabled
      >
        지원동기
      </button>

      {/* 텍스트 입력 */}
      <textarea
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="여기에 입력해주세요"
        className="w-full max-w-[320px] h-64 mb-10 resize-none rounded-[8px] border border-[#08D485] p-4 text-[14px] font-medium text-[#222] placeholder:text-[#A3A3A3]"
      />
    </div>
  );
}
