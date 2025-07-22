interface MotivationChoiceSectionProps {
  question: string;
  choices: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function MotivationChoiceSection({
  question,
  choices,
  selected,
  onSelect,
}: MotivationChoiceSectionProps) {
  return (
    <div className="w-full">
      {/* 질문 텍스트 */}
      <p className="text-[16px] font-semibold text-center text-[#747474] mb-8">
        {question}
      </p>

      {/* 선택 버튼들 */}
      <div className="flex flex-col gap-4 w-full">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => onSelect(choice)}
            className={`text-[16px] font-medium text-[#747474] w-full text-left rounded-[8px] px-4 py-4 border 
                ${
                  selected === choice
                    ? 'border-[#08D485] bg-[#ECF6F2] text-[#08D485]'
                    : 'border-[#08D485] text-[#747474]'
                }
              `}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}
