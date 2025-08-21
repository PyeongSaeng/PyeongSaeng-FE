import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postGenerateKeywords, QAOption } from '../../pages/Personal/apis/ai';

interface MotivationChoiceSectionProps {
  question: string;
  selected: string;
  onSelect: (value: string) => void;
  // AI 키워드 생성을 위한 기본 QA 옵션들
  baseQAOptions?: QAOption[];
}

export default function MotivationChoiceSection({
  question,
  selected,
  onSelect,
  baseQAOptions = [],
}: MotivationChoiceSectionProps) {
  const [customInput, setCustomInput] = useState('');
  const [aiChoices, setAiChoices] = useState<string[]>([]);
  const [isLoadingChoices, setIsLoadingChoices] = useState(false);

  // AI 키워드 생성 뮤테이션
  const generateChoicesMutation = useMutation({
    mutationFn: (qaOptions: QAOption[]) =>
      postGenerateKeywords({
        answers: qaOptions,
        question: question,
      }),
    onSuccess: (keywords) => {
      // AI로 생성된 키워드들을 선택지로 설정
      setAiChoices([...keywords, '직접 입력해주세요']);
      setIsLoadingChoices(false);
    },
    onError: () => {
      // 에러 시 기본 선택지 사용
      setAiChoices([
        '경제적으로 도움을 얻으려고',
        '사람들과 만나려고',
        '사회에 도움이 되려고',
        '직접 입력해주세요',
      ]);
      setIsLoadingChoices(false);
    },
  });

  useEffect(() => {
    if (baseQAOptions.length > 0) {
      setIsLoadingChoices(true);
      generateChoicesMutation.mutate(baseQAOptions);
    } else {
      // 기본 QA 옵션이 없으면 기본 선택지 사용
      setAiChoices([
        '경제적으로 도움을 얻으려고',
        '사람들과 만나려고',
        '사회에 도움이 되려고',
        '직접 입력해주세요',
      ]);
    }
  }, [baseQAOptions, generateChoicesMutation]);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInput(value);
    onSelect(value);
  };

  // 선택지 재생성 함수
  const regenerateChoices = () => {
    if (baseQAOptions.length > 0) {
      setIsLoadingChoices(true);
      generateChoicesMutation.mutate(baseQAOptions);
    }
  };

  return (
    <div className="w-full">
      <p className="text-[16px] font-semibold text-center text-[#747474] mb-4">
        {question}
      </p>

      {/* AI 생성 중 표시 */}
      {isLoadingChoices && (
        <div className="text-center mb-4">
          <p className="text-[14px] text-[#747474]">
            AI가 맞춤 선택지를 생성하고 있습니다...
          </p>
        </div>
      )}

      {/* 재생성 버튼 */}
      {!isLoadingChoices && baseQAOptions.length > 0 && (
        <div className="text-center mb-4">
          <button
            onClick={regenerateChoices}
            className="text-[14px] text-[#08D485] underline"
          >
            다른 선택지 생성하기
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full">
        {aiChoices.map((choice) => {
          if (choice === '직접 입력해주세요') {
            return (
              <div
                key="custom-input"
                className={`w-full border rounded-[8px] px-4 py-4 flex items-center
                  ${
                    selected === customInput && customInput.length > 0
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
              disabled={isLoadingChoices}
              className={`text-[16px] font-medium w-full text-left rounded-[8px] px-4 py-4 border transition
                ${
                  selected === choice
                    ? 'border-[#08D485] bg-[#ECF6F2] text-[#08D485]'
                    : 'border-[#08D485] text-[#747474]'
                }
                ${isLoadingChoices ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ECF6F2]'}
              `}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
