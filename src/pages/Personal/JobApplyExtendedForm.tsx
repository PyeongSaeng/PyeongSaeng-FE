import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import MotivationChoiceSection from '../../shared/components/MotivationChoiceSection';
import { FormField } from './types/jobs';
import { useSubmitApplication } from './hooks/useSubmitApplication';
import { QAOption } from './apis/ai';
import { useSeniorInfo } from './hooks/useSeniorInfo'; // 공통 훅 사용
import { JobTypeLabel, ExperiencePeriodLabel } from './types/userInfo';
import MotivationAIWritePage from './components/MotivationAIWritePage';

type Step = 'motivation' | 'ai-write' | 'text' | 'image' | 'done';

type Props = {
  formFields: FormField[];
  roadAddress: string;
  jobPostId: number;
};

const JobApplyExtendedForm = ({
  formFields,
  roadAddress,
  jobPostId,
}: Props) => {
  const navigate = useNavigate();
  const { mutate: submitApplication, isPending: isSubmitting } =
    useSubmitApplication();

  const additionalFields = useMemo(() => formFields.slice(4), [formFields]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // 지원동기 관련 상태
  const [selectedMotivation, setSelectedMotivation] = useState<string>('');

  // AI 작성 관련 상태 추가
  const [selectedKeywordForAI, setSelectedKeywordForAI] = useState<string>('');

  // 공통 훅으로 시니어 정보 조회
  const {
    seniorInfo,
    seniorQuestions,
    isLoading: isLoadingSeniorData,
  } = useSeniorInfo();

  // AI 키워드 생성을 위한 기본 QA 옵션들
  const baseQAOptions: QAOption[] = useMemo(() => {
    const options: QAOption[] = [];

    // 1. 시니어 기본 정보 활용
    if (seniorInfo) {
      // 나이 정보
      if (seniorInfo.age) {
        options.push({
          question: '연령대는 어떻게 되시나요?',
          option: `${seniorInfo.age}세`,
        });
      }

      // 거주지 정보 (도/시 단위로 축약)
      if (seniorInfo.roadAddress) {
        const region =
          seniorInfo.roadAddress.split(' ')[0] || seniorInfo.roadAddress;
        options.push({
          question: '거주 지역은 어디인가요?',
          option: region,
        });
      }

      // 직무 경험
      if (seniorInfo.job) {
        options.push({
          question: '어떤 직무 경험이 있으신가요?',
          option: JobTypeLabel[seniorInfo.job] || '기타',
        });
      }

      // 경력 기간
      if (seniorInfo.experiencePeriod) {
        options.push({
          question: '근무 경험 기간은 얼마나 되시나요?',
          option: ExperiencePeriodLabel[seniorInfo.experiencePeriod] || '신입',
        });
      }
    }

    // 2. 시니어의 추가 질문 답변들 활용
    seniorQuestions.forEach((q) => {
      if (q.selectedOptionId && q.seletedOption) {
        options.push({
          question: q.question,
          option: q.seletedOption,
        });
      }
    });

    // 3. 현재 지원서의 기본 정보들도 추가로 활용
    // formFields의 처음 4개는 기본 정보 (이름, 연락처 등)
    formFields.slice(0, 4).forEach((field) => {
      if (field.answer) {
        options.push({
          question: field.fieldName,
          option: field.answer,
        });
      }
    });

    return options;
  }, [seniorInfo, seniorQuestions, formFields]);

  const typeToStep = (
    t: FormField['fieldType']
  ): Exclude<Step, 'done' | 'motivation'> => (t === 'IMAGE' ? 'image' : 'text');

  // 첫 번째 추가 필드가 지원동기 관련인지 확인
  const isMotivationField =
    additionalFields[0]?.fieldName?.includes('동기') ||
    additionalFields[0]?.fieldName?.includes('지원');

  const initialStep: Step =
    additionalFields.length === 0
      ? 'done'
      : isMotivationField
        ? 'motivation'
        : typeToStep(additionalFields[0].fieldType);

  const [step, setStep] = useState<Step>(initialStep);

  const currentField = additionalFields[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === additionalFields.length - 1;

  // 지원동기 선택 완료 핸들러
  const handleMotivationNext = () => {
    if (!selectedMotivation.trim()) {
      alert('지원동기를 선택해주세요.');
      return;
    }

    // 첫 번째 필드에 지원동기 답변 저장
    if (currentField) {
      setAnswers((prev) => ({
        ...prev,
        [currentField.id]: selectedMotivation,
      }));
    }

    // 다음 단계로 이동
    if (!isLast) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setStep(typeToStep(additionalFields[nextIndex].fieldType));
    } else {
      setStep('done');
    }
  };

  // 네비게이션
  const goPrev = () => {
    if (isFirst) return;
    const prevIndex = currentStepIndex - 1;
    setCurrentStepIndex(prevIndex);

    // 첫 번째가 지원동기 필드인 경우
    if (prevIndex === 0 && isMotivationField) {
      setStep('motivation');
    } else {
      setStep(typeToStep(additionalFields[prevIndex].fieldType));
    }
  };

  const goNext = () => {
    if (!isLast) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setStep(typeToStep(additionalFields[nextIndex].fieldType));
    } else {
      setStep('done');
    }
  };

  // 최종 제출
  const handleSubmit = () => {
    const payload = {
      jobPostId,
      applicationStatus: 'SUBMITTED' as const,
      fieldAndAnswer: formFields.map((field) => ({
        formFieldId: field.id,
        fieldType: field.fieldType,
        answer: answers[field.id] ?? field.answer ?? '',
      })),
    };

    submitApplication(payload, {
      onSuccess: () => {
        setSubmitted(true);
        setStep('done');
      },
      onError: () => alert('신청서 제출에 실패했습니다.'),
    });
  };

  // 지원동기에서 AI 작성 선택 시 호출
  const handleAIWriteSelection = (selectedKeyword: string) => {
    setSelectedKeywordForAI(selectedKeyword);
    setStep('ai-write');
  };

  // AI 작성 완료 시 호출
  const handleAIWriteComplete = (finalAnswer: string) => {
    setSelectedMotivation(finalAnswer);

    // AI 작성 완료 후 answers에도 저장
    if (currentField) {
      setAnswers((prev) => ({
        ...prev,
        [currentField.id]: finalAnswer,
      }));
    }

    // AI 작성 완료 후 다음 단계로 이동
    if (currentStepIndex < additionalFields.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setStep(typeToStep(additionalFields[nextIndex].fieldType));
    } else {
      setStep('done');
    }
  };

  // AI 작성 취소 시 호출
  const handleAIWriteCancel = () => {
    setStep('motivation'); // 취소 시에만 지원동기 화면으로
  };

  // AI 작성 화면
  if (step === 'ai-write') {
    return (
      <MotivationAIWritePage
        selectedKeyword={selectedKeywordForAI}
        question={currentField?.fieldName || 'Q1. 지원 동기가 무엇인가요?'}
        onComplete={handleAIWriteComplete}
        onCancel={handleAIWriteCancel}
        baseQAOptions={baseQAOptions}
      />
    );
  }

  // 지원동기 선택 화면 (기존)
  if (step === 'motivation') {
    return (
      <Topbar>
        <div className="p-[13px]">
          <h2 className="text-[20px] text-[#747474] font-semibold mt-[8px] text-center">
            신청서 작성
          </h2>
          <p className="text-[16px] text-[#747474] font-semibold mt-[27px]">
            신청서에 추가할 항목이 있습니다.
            <br />
            다음 질문에 답해주세요
          </p>

          <div className="mt-[32px]">
            <MotivationChoiceSection
              question={
                currentField?.fieldName || 'Q1. 지원 동기가 무엇인가요?'
              }
              selected={selectedMotivation}
              onSelect={setSelectedMotivation}
              onAISelect={handleAIWriteSelection} // AI 선택 핸들러 추가
              baseQAOptions={baseQAOptions}
              isLoadingData={isLoadingSeniorData}
            />
          </div>

          <button
            onClick={handleMotivationNext}
            disabled={!selectedMotivation.trim() || isLoadingSeniorData}
            className="w-full h-[45px] mt-[32px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            제출하기
          </button>
        </div>
      </Topbar>
    );
  }

  // TEXT 화면
  if (step === 'text') {
    return (
      <Topbar>
        <div className="p-[13px]">
          <h2 className="text-[20px] text-[#747474] font-semibold mt-[8px] text-center">
            신청서 작성
          </h2>

          <div className="mt-[24px] w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[#000000] flex items-center justify-center">
            {currentField?.fieldName}
          </div>

          <textarea
            className="mt-[16px] w-full h-[200px] p-6 border-[1.3px] border-[#08D485] rounded-[13px] resize-none text-[14px] text-[#333] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#08D485] bg-white"
            value={currentField ? answers[currentField.id] || '' : ''}
            onChange={(e) => {
              if (currentField) {
                setAnswers((prev) => ({
                  ...prev,
                  [currentField.id]: e.target.value,
                }));
              }
            }}
            placeholder="여기에 작성해 주세요..."
          />

          <div className="flex justify-between gap-[13px] mt-[32px]">
            <button
              onClick={goPrev}
              disabled={isFirst}
              className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] text-[#000000] disabled:opacity-40"
            >
              이전
            </button>
            <button
              onClick={goNext}
              className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
            >
              {isLast ? '다음' : '다음'}
            </button>
          </div>
        </div>
      </Topbar>
    );
  }

  // IMAGE 화면
  if (step === 'image') {
    return (
      <Topbar>
        <div className="p-[13px]">
          <h2 className="text-[20px] text-[#747474] font-semibold mt-[8px] text-center">
            신청서 작성
          </h2>
          <h3 className="text-[16px] text-[#747474] font-semibold mt-[8px]">
            증빙자료 사진 첨부가 필요합니다
          </h3>

          <div className="mt-[24px] w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[#000000] flex items-center justify-center">
            {currentField?.fieldName}
          </div>

          <input
            type="file"
            className="mt-[16px] p-4 w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000] flex items-center justify-center"
            onChange={(e) => {
              if (currentField) {
                const file = e.target.files?.[0];
                if (file) {
                  setAnswers((prev) => ({
                    ...prev,
                    [currentField.id]: file.name,
                  }));
                }
              }
            }}
          />
          {currentField && answers[currentField.id] && (
            <p className="mt-2 text-[14px]">{answers[currentField.id]}</p>
          )}

          <div className="flex justify-between gap-[13px] mt-[255px]">
            <button
              onClick={goPrev}
              disabled={isFirst}
              className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] text-[#000000] disabled:opacity-40"
            >
              이전
            </button>
            <button
              onClick={goNext}
              className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
            >
              {isLast ? '다음' : '다음'}
            </button>
          </div>
        </div>
      </Topbar>
    );
  }

  // DONE 화면
  if (step === 'done') {
    return (
      <Topbar>
        <div className="p-[13px]">
          <h2 className="text-[20px] text-[#747474] font-semibold mt-[8px] text-center">
            신청서 작성
          </h2>
          <h2 className="text-[16px] text-[#747474] font-semibold mt-[8px]">
            {submitted
              ? '신청 완료되었습니다'
              : '신청 완료 전 마지막으로 신청서를 확인하세요'}
          </h2>

          <div className="mt-[40px] w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[#000000] flex items-center justify-center">
            <p>{roadAddress}</p>
          </div>

          <div className="p-[18px] border-[1.3px] border-[#08D485] rounded-[13px] mt-[23px]">
            <span className="text-[16px] text-[#414141]">기본 정보</span>
            <div className="mt-[14px] text-[14px] text-[#414141]">
              {formFields.slice(0, 4).map((field) => (
                <div className="flex justify-between mb-[8px]" key={field.id}>
                  <span className="font-semibold">{field.fieldName}</span>
                  <span>{field.answer ?? '-'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 추가 질문들 표시 */}
          {additionalFields.map((field) => (
            <div key={field.id} className="mt-[24px]">
              <div className="w-full h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[#000000] flex items-center justify-center">
                {field.fieldName}
              </div>
              <div className="w-full border-[1.3px] border-[#08D485] rounded-[8px] bg-white text-[#000000] mt-[21px] p-4">
                {field.fieldType === 'TEXT' ? (
                  <p className="text-[14px] whitespace-pre-wrap">
                    {answers[field.id] || (
                      <span className="text-gray-400">미작성</span>
                    )}
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-[14px]">
                      {answers[field.id] || '파일 미선택'}
                    </p>
                    {!submitted && (
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setAnswers((prev) => ({
                              ...prev,
                              [field.id]: file.name,
                            }));
                          }
                        }}
                        className="ml-auto text-[12px]"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {submitted ? (
            <button
              onClick={() => navigate('/')}
              className="w-full h-[45px] mt-[24px] text-[16px] bg-[#08D485] text-black rounded-[8px]"
            >
              홈으로
            </button>
          ) : (
            <div className="flex justify-between gap-[13px] mt-[24px]">
              <button
                onClick={() => {
                  // 임시 저장 로직 (필요시 구현)
                }}
                className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] text-[#000000]"
              >
                임시 저장
              </button>
              <button
                className="w-1/2 h-[45px] text-[16px] border-[1.3px] border-[#08D485] rounded-[8px] bg-[#08D485] text-[#000000]"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? '제출 중...' : '제출'}
              </button>
            </div>
          )}
        </div>
      </Topbar>
    );
  }

  return null;
};

export default JobApplyExtendedForm;
