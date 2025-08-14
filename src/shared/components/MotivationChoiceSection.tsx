import { useState } from 'react';

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
  const [customInput, setCustomInput] = useState('');

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInput(value);
    onSelect(value);
  };

  return (
    <div className="w-full">
      <p className="text-[16px] font-semibold text-center text-[#747474] mb-8">
        {question}
      </p>

      <div className="flex flex-col gap-4 w-full">
        {choices.map((choice) => {
          if (choice === '직접 입력') {
            return (
              <div
                key="custom-input"
                className={`w-full border rounded-[8px] px-4 py-4 flex items-center
                  ${
                    selected === customInput
                      ? 'border-[#08D485] bg-[#ECF6F2]'
                      : 'border-[#08D485]'
                  }
                `}
              >
                <input
                  type="text"
                  placeholder="직접 입력해주세요"
                  value={customInput}
                  onChange={handleCustomChange}
                  className="w-full text-[16px] text-[#333] focus:outline-none bg-transparent"
                />
              </div>
            );
          }

          return (
            <button
              key={choice}
              onClick={() => {
                onSelect(choice);
                setCustomInput('');
              }}
              className={`text-[16px] font-medium w-full text-left rounded-[8px] px-4 py-4 border transition
                ${
                  selected === choice
                    ? 'border-[#08D485] bg-[#ECF6F2] text-[#08D485]'
                    : 'border-[#08D485] text-[#747474]'
                }`}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
