import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Topbar from '../../../shared/components/topbar/Topbar';
import {
  postGenerateAnswer,
  postGenerateUpdatedAnswer,
  QAOption,
} from '../apis/ai';

interface MotivationAIWritePageProps {
  selectedKeyword: string;
  question: string;
  onComplete: (finalAnswer: string) => void;
  onCancel: () => void;
  baseQAOptions?: QAOption[];
}

export default function MotivationAIWritePage({
  selectedKeyword,
  question,
  onComplete,
  baseQAOptions = [],
}: MotivationAIWritePageProps) {
  const [scaffoldText, setScaffoldText] = useState('');
  const [personalInput, setPersonalInput] = useState('');
  const [finalText, setFinalText] = useState('');
  const [step, setStep] = useState<'generating' | 'scaffold' | 'final'>(
    'generating'
  );

  // 1단계: 초안(스캐폴드) 생성
  const generateScaffold = useMutation({
    mutationFn: () =>
      postGenerateAnswer({
        answers: baseQAOptions,
        question: question,
        selectedKeyword: selectedKeyword,
      }),
    onSuccess: (data) => {
      setScaffoldText(data);
      setStep('scaffold');
    },
    onError: () => {
      setScaffoldText('AI 초안 생성에 실패했습니다. 다시 시도해주세요.');
      setStep('scaffold');
    },
  });

  // 2단계: 최종 문장 생성
  const generateFinal = useMutation({
    mutationFn: () =>
      postGenerateUpdatedAnswer({
        answers: baseQAOptions,
        question: question,
        generatedAnswer: scaffoldText,
        addedExperience: personalInput,
      }),
    onSuccess: (data) => {
      setFinalText(data);
      setStep('final');
    },
    onError: () => {
      alert('AI 작성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  useEffect(() => {
    if (selectedKeyword && baseQAOptions.length > 0) {
      generateScaffold.mutate();
    }
  }, [selectedKeyword]);

  const handleAICompose = () => {
    if (!personalInput.trim()) {
      alert('관련된 경험을 입력해주세요.');
      return;
    }
    generateFinal.mutate();
  };

  const handleUseFinal = () => {
    onComplete(finalText);
  };

  return (
    <Topbar>
      <div className="p-[13px]">
        <h2 className="text-[20px] text-[#747474] font-semibold mt-[8px] text-center">
          신청서 작성
        </h2>

        {step === 'generating' && (
          <p className="text-[16px] text-[#747474] mt-[27px] text-center">
            AI가 신청서의 틀을 잡았습니다
            <br />
            관련된 경험을 직접 입력해주세요
          </p>
        )}

        {step === 'scaffold' && (
          <p className="text-[16px] text-[#747474] mt-[27px] text-center">
            AI가 신청서의 틀을 잡았습니다
            <br />
            관련된 경험을 직접 입력해주세요
          </p>
        )}

        {step === 'final' && (
          <p className="text-[16px] text-[#747474] mt-[27px] text-center">
            AI는 실수할 수 있습니다
            <br />
            사실과 다른 부분을 수정해주세요
          </p>
        )}

        {/* 1단계: AI 초안 생성 중 */}
        {step === 'generating' && (
          <div className="mt-[40px] text-center">
            <p className="text-[14px] text-[#747474]">
              AI가 맞춤 초안을 생성하고 있습니다...
            </p>
          </div>
        )}

        {/* 2단계: 초안 확인 및 개인 경험 입력 */}
        {step === 'scaffold' && (
          <div className="mt-[32px] space-y-4">
            {/* 지원동기 제목 */}
            <div className="w-full px-4 py-4 border-[1.3px] border-[#08D485] rounded-[13px] bg-[#F8F8F8] text-center">
              <span className="text-[16px] text-[#333] font-medium">
                지원동기
              </span>
            </div>

            {/* AI가 생성한 텍스트 */}
            <div className="w-full min-h-[120px] p-4 border-[1.3px] border-[#08D485] rounded-[13px] bg-[#F8F8F8]">
              <p className="text-[14px] text-[#333] leading-relaxed">
                {scaffoldText}
              </p>
            </div>

            {/* 관련된 경험을 입력해주세요 */}
            <div className="w-full px-4 py-4 border-[1.3px] border-[#08D485] rounded-[13px] bg-[#F8F8F8] text-center">
              <span className="text-[16px] text-[#333] font-medium">
                관련된 경험을 입력해주세요
              </span>
            </div>

            {/* 개인 경험 입력 텍스트박스 */}
            <div className="w-full">
              <textarea
                className="w-full h-[200px] p-4 border-[1.3px] border-[#08D485] rounded-[13px] resize-none text-[14px] text-[#333] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#08D485] bg-white"
                value={personalInput}
                onChange={(e) => setPersonalInput(e.target.value)}
                placeholder="여기에 입력해주세요"
              />
            </div>

            {/* AI 자동 작성 버튼 */}
            <button
              onClick={handleAICompose}
              disabled={!personalInput.trim() || generateFinal.isPending}
              className="w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generateFinal.isPending ? 'AI 작성 중...' : 'AI 자동 작성'}
            </button>
          </div>
        )}

        {/* 3단계: 최종 문장 확인 및 수정 */}
        {step === 'final' && (
          <div className="mt-[32px] space-y-4">
            {/* 지원동기 제목 */}
            <div className="w-full px-4 py-4 border-[1.3px] border-[#08D485] rounded-[13px] bg-[#F8F8F8] text-center">
              <span className="text-[16px] text-[#333] font-medium">
                지원동기
              </span>
            </div>

            {/* 수정 가능한 최종 텍스트 */}
            <div className="w-full">
              <textarea
                className="w-full h-[200px] p-4 border-[1.3px] border-[#08D485] rounded-[13px] resize-none text-[14px] text-[#333] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#08D485] bg-white"
                value={finalText}
                onChange={(e) => setFinalText(e.target.value)}
                placeholder="여기서 수정할 수 있어요"
              />
            </div>

            {/* 이전/다음 버튼 */}
            <div className="flex justify-between gap-[13px] mt-[32px]">
              <button
                onClick={() => setStep('scaffold')}
                className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#747474] rounded-[8px] bg-white text-[#747474]"
              >
                이전
              </button>
              <button
                onClick={handleUseFinal}
                className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </Topbar>
  );
}
