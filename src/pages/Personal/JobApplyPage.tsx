import { useState, useEffect } from 'react';
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
  const [formInput, setFormInput] = useState('지원동기를 저장한 예시입니다.');
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

  const info = {
    name: '김순자',
    gender: '여성',
    age: '63세',
    phone: '010-1234-5678',
    idNumber: '610908-******',
    address: '대지로 49 203동',
  };

  const extraItemCount = 2;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (step !== 'complete') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [step]);

  const handleGoHome = () => {
    navigate('/personal');
  };

  return (
    <div className="pt-[10px] h-[740px] flex flex-col">
      <Topbar />
      <div className="flex justify-center overflow-y-auto flex-1 pb-6">
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
                        : ''
            }
          />

          {step === 'complete' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />

              {hasExtraQuestions && (
                <>
                  {/* 지원동기 */}
                  <div className="w-full border border-[#08D485] rounded-lg p-4 mt-4">
                    <h3 className="text-[16px] font-semibold mb-2">지원동기</h3>
                    <p className="text-[14px] text-[#333] whitespace-pre-wrap">
                      {formInput}
                    </p>
                  </div>
                  {/* 자격증 이미지 */}
                  <div className="w-full mt-4 ">
                    <label className="text-[14px] font-medium text-[#888] mb-1 block">
                      사회복지 자격증 이미지{' '}
                      <span className="text-red-500">(필수)</span>
                    </label>

                    <div className="flex w-full h-[4.5rem] items-center">
                      {/* 파일 이름 + 삭제 버튼 */}
                      <div className="flex items-center flex-1 border border-[#08D485] rounded-lg pl-4 pr-2 bg-white overflow-hidden h-full">
                        <span
                          className="flex-1 text-[14px] text-[#333] font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
                          style={{ minWidth: 0 }}
                        >
                          {uploadedImageFile?.name ?? '이미지 없음'}
                        </span>
                        {uploadedImageFile && (
                          <button
                            type="button"
                            className="text-[20px] text-[#333] ml-2 shrink-0"
                            onClick={() => setUploadedImageFile(null)}
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* 검색 버튼 */}
                      <label className="ml-2 h-full cursor-pointer shrink-0">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setUploadedImageFile(e.target.files[0]);
                            }
                          }}
                        />
                        <div className="h-full px-8 flex items-center justify-center bg-[#08D485] text-white text-[14px] font-semibold rounded-lg">
                          검색
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* 홈으로 이동 버튼 */}
              <div className="w-full  pb-10">
                <NextButton onClick={handleGoHome}>홈으로 이동</NextButton>
              </div>
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
                  '직접 입력',
                ]}
                selected={selected}
                onSelect={setSelected}
              />
              <NextButton
                onClick={() => {
                  if (!selected.trim()) {
                    alert('답변을 선택해 주세요.');
                  } else {
                    setStep('option');
                  }
                }}
              >
                제출하기
              </NextButton>
            </div>
          )}

          {step === 'option' && (
            <>
              <QuestionWriteFormSection
                inputValue={formInput}
                onChange={() => {}}
                readOnly={true}
                onSave={() => {}}
                onSubmit={() => {}}
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
                rightLabel={extraItemCount >= 2 ? '다음' : '제출'}
                onLeftClick={() => navigate('/personal/jobs/drafts')}
                onRightClick={() =>
                  extraItemCount >= 2
                    ? setStep('evidence')
                    : setStep('complete')
                }
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
                rightLabel={extraItemCount >= 2 ? '다음' : '제출'}
                onLeftClick={() => navigate('/personal/jobs/drafts')}
                onRightClick={() =>
                  extraItemCount >= 2
                    ? setStep('evidence')
                    : setStep('complete')
                }
              />
            </>
          )}

          {step === 'evidence' && (
            <EvidenceSection
              onSave={() => navigate('/personal/jobs/drafts')}
              onSubmit={() => setStep('complete')}
              onFileUpload={setUploadedImageFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}
