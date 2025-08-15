import { clsx } from 'clsx';

interface Props {
  inputValue: string;
  onChange: (v: string) => void;
  className?: string;
  readOnly?: boolean;

  // 아래 세 줄은 이미 추가돼있다면 그대로 사용하세요
  title?: string;
  placeholder?: string;
  heightClass?: string;

  // ✅ 추가: 간격 옵션 ('normal' | 'compact')
  spacing?: 'normal' | 'compact';
}

export default function QuestionWriteFormSection({
  inputValue,
  onChange,
  className,
  readOnly = false,
  title = '지원동기',
  placeholder = '여기에 입력해주세요',
  heightClass = 'h-64',
  spacing = 'normal',
}: Props) {
  const mbClass = spacing === 'compact' ? 'mb-3' : 'mb-10';

  return (
    <div className={clsx('w-full flex flex-col items-start', className)}>
      <div
        className={clsx(
          'w-full h-[4.5rem] mb-3 rounded-[8px] border border-[#08D485] text-[16px] font-semibold text-[#747474]',
          'flex items-center justify-center select-none'
        )}
        aria-label={title}
      >
        {title}
      </div>

      <textarea
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={clsx(
          'w-full max-w-[320px] resize-none rounded-[8px] border border-[#08D485] p-4 text-[14px] font-medium placeholder:text-[#A3A3A3]',
          heightClass,
          mbClass,
          readOnly ? 'bg-gray-100 text-[#555]' : 'text-[#222]'
        )}
      />
    </div>
  );
}
