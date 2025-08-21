import { useState, useEffect, useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postGenerateKeywords, QAOption } from '../../pages/Personal/apis/ai';

interface MotivationChoiceSectionProps {
  question: string;
  selected: string;
  onSelect: (value: string) => void;
  // AI 키워드 생성을 위한 기본 QA 옵션들
  baseQAOptions?: QAOption[];
  // 초기 로딩 상태를 부모에서 전달
  isLoadingData?: boolean;
}

export default function MotivationChoiceSection({
  question,
  selected,
  onSelect,
  baseQAOptions = [],
  isLoadingData = false,
}: MotivationChoiceSectionProps) {
  const [customInput, setCustomInput] = useState('');
  const [aiChoices, setAiChoices] = useState<string[]>([]);
  const [isLoadingChoices, setIsLoadingChoices] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // baseQAOptions의 이전 값을 추적하기 위한 ref
  const prevBaseQAOptionsRef = useRef<QAOption[]>([]);

  // AI 키워드 생성 뮤테이션
  const { mutate } = useMutation({
    mutationFn: (qaOptions: QAOption[]) =>
      postGenerateKeywords({ answers: qaOptions, question }),
    onSuccess: (keywords) => {
      setAiChoices([...keywords, '직접 입력해주세요']);
      setIsLoadingChoices(false);
      setHasInitialized(true);
    },
    onError: () => {
      setAiChoices([
        '경제적으로 도움을 얻으려고',
        '사람들과 만나려고',
        '사회에 도움이 되려고',
        '직접 입력해주세요',
      ]);
      setIsLoadingChoices(false);
      setHasInitialized(true);
    },
  });

  // baseQAOptions가 실제로 변경되었는지 확인하는 함수
  const hasBaseQAOptionsChanged = useCallback((newOptions: QAOption[]) => {
    const prevOptions = prevBaseQAOptionsRef.current;

    if (newOptions.length !== prevOptions.length) return true;

    return newOptions.some((option, index) => {
      const prevOption = prevOptions[index];
      return (
        !prevOption ||
        option.question !== prevOption.question ||
        option.option !== prevOption.option
      );
    });
  }, []);

  useEffect(() => {
    if (isLoadingData) return;
    if (hasInitialized && !hasBaseQAOptionsChanged(baseQAOptions)) return;

    // baseQAOptions 업데이트
    prevBaseQAOptionsRef.current = baseQAOptions;

    if (baseQAOptions.length > 0) {
      setIsLoadingChoices(true);
      setHasInitialized(false); // 새로운 데이터로 다시 초기화
      mutate(baseQAOptions);
    } else {
      // baseQAOptions가 없으면 기본 선택지 사용
      setAiChoices([
        '경제적으로 도움을 얻으려고',
        '사람들과 만나려고',
        '사회에 도움이 되려고',
        '직접 입력해주세요',
      ]);
      setHasInitialized(true);
    }
  }, [
    baseQAOptions,
    mutate,
    isLoadingData,
    hasInitialized,
    hasBaseQAOptionsChanged,
  ]);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInput(value);
    onSelect(value);
  };

  // 선택지 재생성 함수
  const regenerateChoices = useCallback(() => {
    if (baseQAOptions.length > 0) {
      setIsLoadingChoices(true);
      setHasInitialized(false);
      mutate(baseQAOptions);
    }
  }, [baseQAOptions, mutate]);

  // 전체 로딩 상태 (데이터 로딩 + AI 생성 로딩)
  const isLoading = isLoadingData || isLoadingChoices;

  return (
    <div className="w-full">
      <p className="text-[16px] font-semibold text-center text-[#747474] mb-4">
        {question}
      </p>

      {/* 전체 로딩 중 표시 */}
      {isLoading && (
        <div className="text-center mb-4">
          <p className="text-[14px] text-[#747474]">
            {isLoadingData
              ? '사용자 정보를 불러오는 중...'
              : 'AI가 맞춤 선택지를 생성하고 있습니다...'}
          </p>
        </div>
      )}

      {/* 재생성 버튼 */}
      {!isLoading && baseQAOptions.length > 0 && hasInitialized && (
        <div className="text-center mb-4">
          <button
            onClick={regenerateChoices}
            className="text-[14px] text-[#08D485] underline"
          >
            다른 선택지 생성하기
          </button>
        </div>
      )}

      {/* 선택지들 - 로딩 중이 아닐 때만 표시 */}
      {!isLoading && (
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
                className={`text-[16px] font-medium w-full text-left rounded-[8px] px-4 py-4 border transition hover:bg-[#ECF6F2]
                  ${
                    selected === choice
                      ? 'border-[#08D485] bg-[#ECF6F2] text-[#08D485]'
                      : 'border-[#08D485] text-[#747474]'
                  }
                `}
              >
                {choice}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
