import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Topbar from '../../shared/components/topbar/Topbar';
import FormTitleSection from '../../shared/components/FormTitleSection';
import JobInfoSection from '../../shared/components/JobInfoSection';
import MotivationChoiceSection from '../../shared/components/MotivationChoiceSection';
import QuestionWriteFormSection from '../../shared/components/QuestionWriteFormSection';
import EvidenceSection from '../../shared/components/EvidenceSection';
import NextButton from '../../shared/components/NextButton';
import TwoButtonGroup from '../../shared/components/TwoButtonGroup';

export default function JobApplyPage() {
  const navigate = useNavigate();

  const hasExtraQuestions = true;

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
    <div className="pt-[10px]">
      <Topbar />

      <div className="flex justify-center">
        <div className="w-full max-w-[320px] flex flex-col items-center justify-start bg-white px-4 py-10">
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

          {step === 'basic' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />
              <TwoButtonGroup
                leftLabel="저장"
                rightLabel="제출"
                onLeftClick={() => console.log('저장!')}
                onRightClick={() => setStep('complete')}
              />
            </>
          )}

          {step === 'complete' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />
              <NextButton onClick={handleGoHome}>홈으로 이동</NextButton>
            </>
          )}

          {step === 'choice' && (
            <div className="w-full flex flex-col gap-4">
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
              <NextButton
                onClick={() => setStep('option')}
                disabled={!selected}
              >
                제출하기
              </NextButton>
            </div>
          )}

          {step === 'option' && (
            <>
              <QuestionWriteFormSection
                inputValue={formInput}
                onChange={setFormInput}
                onSave={() => console.log('저장')}
                onSubmit={() => console.log('임시')}
              />
              <TwoButtonGroup
                leftLabel="직접 작성"
                rightLabel="AI 자동작성"
                onLeftClick={() => setStep('form')}
                onRightClick={() => setStep('ai-review')}
              />
            </>
          )}

          {step === 'form' && (
            <>
              <QuestionWriteFormSection
                inputValue={formInput}
                onChange={setFormInput}
                onSave={() => console.log('작성 저장')}
                onSubmit={() => setStep('complete')}
              />
              <TwoButtonGroup
                leftLabel="저장"
                rightLabel="제출"
                onLeftClick={() => console.log('저장')}
                onRightClick={() => setStep('complete')}
              />
            </>
          )}

          {step === 'ai-review' && (
            <>
              <QuestionWriteFormSection
                inputValue={formInput}
                onChange={setFormInput}
                onSave={() => console.log('저장')}
                onSubmit={() => setStep('evidence')}
              />
              <TwoButtonGroup
                leftLabel="저장"
                rightLabel="다음"
                onLeftClick={() => console.log('저장')}
                onRightClick={() => setStep('evidence')}
              />
            </>
          )}

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
