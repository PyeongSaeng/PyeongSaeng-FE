// src/pages/Personal/JobApplyPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Topbar from '../../shared/components/topbar/Topbar';
import FormTitleSection from '../../shared/components/FormTitleSection';
import JobInfoSection from '../../shared/components/JobInfoSection';
import SaveSubmitButtons from '../../shared/components/SaveSubmitButtons';
import MotivationChoiceSection from '../../shared/components/MotivationChoiceSection';
import SaveNextButtons from '../../shared/components/SaveNextButtons';
import AIWriteButtons from '../../shared/components/AIWriteButtons';
import QuestionWriteFormSection from '../../shared/components/QuestionWriteFormSection';
import EvidenceSection from '../../shared/components/EvidenceSection';

export default function JobApplyPage() {
  const navigate = useNavigate();

  const hasExtraQuestions = true; // ← 기업 데이터에서 받기!

  const [step, setStep] = useState<
    | 'basic'
    | 'complete'
    | 'choice'
    | 'option'
    | 'form'
    | 'ai-review'
    | 'evidence'
  >(hasExtraQuestions ? 'choice' : 'basic');

  const [selected, setSelected] = useState('');
  const [formInput, setFormInput] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleGoHome = () => navigate('/');

  const info = {
    name: '김순자',
    gender: '여성',
    age: '63세',
    phone: '010-1234-5678',
    idNumber: '610908-******',
    address: '대지로 49 203동',
  };

  return (
    <div className="pt-[20px]">
      <Topbar />

      <div className="flex justify-center">
        <div className="w-full max-w-[320px] flex flex-col items-center justify-start bg-white px-4 py-10">
          {/* === 공통 타이틀 === */}
          <FormTitleSection
            title="신청서 작성"
            description={
              step === 'basic'
                ? '신청서에 추가할 항목이 없습니다.\n제출하시겠습니까?'
                : step === 'complete'
                  ? '신청 완료되었습니다.'
                  : step === 'choice'
                    ? '신청서에 추가할 항목에\n답변하지 않은 질문이 포함되어 있습니다.\n다음 질문에 답해 주세요.'
                    : step === 'option'
                      ? '신청서에 추가할 항목이 있습니다.\n작성방법을 선택해 주세요.'
                      : step === 'ai-review'
                        ? 'AI가 작성한 내용을 확인해 주세요.\n허위 사실 기재는 불이익을 받을 수 있습니다.'
                        : step === 'evidence'
                          ? 'AI가 작성한 내용을 확인해 주세요.\n허위 사실 기재는 불이익을 받을 수 있습니다.'
                          : ''
            }
          />

          {/* === STEP === */}

          {/* 29 - 기본 신청서 */}
          {step === 'basic' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />
              <SaveSubmitButtons
                onSave={() => console.log('저장!')}
                onSubmit={() => setStep('complete')}
              />
            </>
          )}

          {/* 30 - 신청완료 */}
          {step === 'complete' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />
              <button
                onClick={handleGoHome}
                className="w-full h-12 bg-[#08D485] rounded-[8px] text-black text-[16px] font-semibold"
              >
                홈으로 이동
              </button>
            </>
          )}
          {/* 31 - 추가 질문 선택 */}
          {step === 'choice' && (
            <div className="w-full flex flex-col gap-6">
              <MotivationChoiceSection
                question="Q1. 지원 동기가 무엇인가요?"
                choices={[
                  '경제적으로 도움을 얻으려고',
                  '사람들과 만나려고',
                  '사회에 도움이 되려고',
                ]}
                selected={selected}
                onSelect={setSelected}
              />
              <button
                disabled={!selected}
                onClick={() => setStep('option')}
                className={`w-full h-12 rounded-[8px] text-[16px] font-semibold ${
                  selected
                    ? 'bg-[#08D485] text-white'
                    : 'bg-gray-300 text-white'
                }`}
              >
                제출하기
              </button>
            </div>
          )}

          {/* 32 - 옵션 선택 */}
          {step === 'option' && (
            <>
              <QuestionWriteFormSection
                inputValue={formInput}
                onChange={setFormInput}
                onSave={() => console.log('저장')}
                onSubmit={() => console.log('임시')}
              />

              <AIWriteButtons
                onWrite={() => setStep('form')}
                onAIWrite={() => setStep('ai-review')}
              />
            </>
          )}

          {/* 33 - 직접 작성 */}
          {step === 'form' && (
            <>
              <QuestionWriteFormSection
                inputValue={formInput}
                onChange={setFormInput}
                onSave={() => console.log('작성 저장')}
                onSubmit={() => setStep('complete')}
              />
              <SaveSubmitButtons
                onSave={() => console.log('저장')}
                onSubmit={() => setStep('complete')}
              />
            </>
          )}

          {/* 34 - AI 리뷰 */}
          {step === 'ai-review' && (
            <>
              <QuestionWriteFormSection
                inputValue={formInput}
                onChange={setFormInput}
                onSave={() => console.log('저장')}
                onSubmit={() => setStep('evidence')}
              />
              <SaveNextButtons
                onSave={() => console.log('저장')}
                onNext={() => setStep('evidence')}
              />
            </>
          )}

          {/* 35 - 증빙자료 */}
          {step === 'evidence' && (
            <EvidenceSection
              onSave={() => console.log('저장')}
              onSubmit={() => setStep('complete')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
