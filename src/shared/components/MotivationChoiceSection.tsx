import { useState, useEffect, useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postGenerateKeywords, QAOption } from '../../pages/Personal/apis/ai';

interface MotivationChoiceSectionProps {
  question: string;
  selected: string;
  onSelect: (value: string) => void;
  onAISelect?: (selectedKeyword: string) => void;
  baseQAOptions?: QAOption[];
  isLoadingData?: boolean;
}

export default function MotivationChoiceSection({
  question,
  selected,
  onSelect,
  onAISelect,
  baseQAOptions = [],
  isLoadingData = false,
}: MotivationChoiceSectionProps) {
  const [customInput, setCustomInput] = useState('');
  const [aiChoices, setAiChoices] = useState<string[]>([]);
  const [isLoadingChoices, setIsLoadingChoices] = useState(false);

  // 중복 호출 방지를 위한 ref
  const hasGeneratedRef = useRef(false);
  const lastGeneratedOptionsRef = useRef<string>('');

  // AI 키워드 생성 뮤테이션
  const generateKeywordsMutation = useMutation({
    mutationFn: async (qaOptions: QAOption[]) => {
      return await postGenerateKeywords({ answers: qaOptions, question });
    },
    onSuccess: (keywords) => {
      setAiChoices([...keywords, '직접 입력해주세요']);
      setIsLoadingChoices(false);
      hasGeneratedRef.current = true;
    },
    onError: () => {
      setAiChoices([
        '경제적으로 도움을 얻으려고',
        '사람들과 만나려고',
        '사회에 도움이 되려고',
        '직접 입력해주세요',
      ]);
      setIsLoadingChoices(false);
      hasGeneratedRef.current = true;
    },
  });

  // 중복 호출 방지 로직
  useEffect(() => {
    if (isLoadingData) return;

    const currentOptionsString = JSON.stringify(baseQAOptions);

    if (
      lastGeneratedOptionsRef.current === currentOptionsString &&
      hasGeneratedRef.current
    ) {
      return;
    }

    lastGeneratedOptionsRef.current = currentOptionsString;
    hasGeneratedRef.current = false;

    if (baseQAOptions.length > 0) {
      setIsLoadingChoices(true);
      const timer = setTimeout(() => {
        generateKeywordsMutation.mutate(baseQAOptions);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setAiChoices([
        '경제적으로 도움을 얻으려고',
        '사람들과 만나려고',
        '사회에 도움이 되려고',
        '직접 입력해주세요',
      ]);
      hasGeneratedRef.current = true;
    }
  }, [baseQAOptions, question, isLoadingData]);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInput(value);
    onSelect(value);
  };

  // 선택지 재생성 함수
  const regenerateChoices = useCallback(() => {
    if (baseQAOptions.length > 0) {
      hasGeneratedRef.current = false;
      setIsLoadingChoices(true);
      generateKeywordsMutation.mutate(baseQAOptions);
    }
  }, [baseQAOptions, generateKeywordsMutation]);

  // AI 자동 작성 버튼 클릭 시
  const handleAIWriteClick = () => {
    if (onAISelect && selected && selected !== '직접 입력해주세요') {
      onAISelect(selected);
    } else {
      alert('먼저 지원동기를 선택해주세요.');
    }
  };

  // 로딩 메시지
  const getLoadingMessage = () => {
    if (isLoadingData) {
      return '사용자 정보를 불러오는 중...';
    }
    return 'AI가 맞춤 선택지를 생성하고 있습니다...';
  };

  // 전체 로딩 상태
  const isLoading = isLoadingData || isLoadingChoices;
  const showContent = !isLoading && aiChoices.length > 0;

  return (
    <div className="w-full">
      <p className="text-[16px] font-semibold text-center text-[#747474] mb-4">
        {question}
      </p>

      {/* 로딩 표시  */}
      {isLoading && (
        <div className="text-center mb-4">
          <p className="text-[14px] text-[#747474]">{getLoadingMessage()}</p>
        </div>
      )}

      {/* 재생성 버튼 */}
      {!isLoading && baseQAOptions.length > 0 && hasGeneratedRef.current && (
        <div className="text-center mb-4">
          <button
            onClick={regenerateChoices}
            className="text-[14px] text-[#08D485] underline"
          >
            다른 선택지 생성하기
          </button>
        </div>
      )}

      {/* 선택지들 */}
      {showContent && (
        <>
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

          {/* AI 자동 작성 버튼 */}
          {selected && selected !== '직접 입력해주세요' && (
            <button
              onClick={handleAIWriteClick}
              className="w-full h-[45px] mt-[16px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
            >
              AI 자동 작성
            </button>
          )}
        </>
      )}
    </div>
  );
}
