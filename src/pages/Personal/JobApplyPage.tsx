import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Topbar from '../../shared/components/topbar/Topbar';
import FormTitleSection from '../../shared/components/FormTitleSection';
import JobInfoSection from '../../shared/components/JobInfoSection';
import MotivationChoiceSection from '../../shared/components/MotivationChoiceSection';
import QuestionWriteFormSection from '../../shared/components/QuestionWriteFormSection';
import EvidenceSection from '../../shared/components/EvidenceSection';
import NextButton from '../../shared/components/NextButton';
import TwoButtonGroup from '../../shared/components/TwoButtonGroup';
import { postGenerateKeywords, postGenerateAnswer } from './apis/ai';
import { postApplicationDirect } from './apis/applications';
import { uploadFileAndGetKey } from './apis/files';
import type { QAOption } from './types/ai';
import type { FieldAndAnswer } from './types/applications';

export default function JobApplyPage() {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();

  const parsedJobId = Number(jobId || '1');

  const motivationFieldId = 1;
  const certFieldId = 2;
  const hasExtraQuestions = true;
  const [step, setStep] = useState<
    'basic' | 'choice' | 'scaffold' | 'final' | 'evidence' | 'complete'
  >(hasExtraQuestions ? 'choice' : 'basic');
  const [selected, setSelected] = useState('');
  const MAIN_QUESTION = '지원 동기가 무엇인가요?';

  const [scaffoldText, setScaffoldText] = useState('');
  const [personalInput, setPersonalInput] = useState('');
  const [isLoadingScaffold, setIsLoadingScaffold] = useState(false);
  const [scaffoldError, setScaffoldError] = useState<string | null>(null);
  const [finalText, setFinalText] = useState('');
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

  const info = useMemo(
    () => ({
      name: '김순자',
      gender: '여성',
      age: '63세',
      phone: '010-1234-5678',
      idNumber: '610908-******',
      address: '대지로 49 203동',
    }),
    []
  );

  useEffect(() => {
    if (!parsedJobId || Number.isNaN(parsedJobId)) {
      toast.error('유효하지 않은 채용공고 경로입니다.');
      navigate('/personal');
    }
  }, [parsedJobId, navigate]);

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

  const handleChoiceSubmit = async () => {
    if (!selected.trim()) return toast.warning('답변을 선택해 주세요.');
    setStep('scaffold');
    setIsLoadingScaffold(true);
    setScaffoldError(null);
    setScaffoldText('');

    try {
      const qa: QAOption[] = [{ question: MAIN_QUESTION, option: selected }];
      const keywords = await postGenerateKeywords({
        answers: qa,
        question: MAIN_QUESTION,
      });
      const picked = keywords?.[0] ?? selected;
      const generated = await postGenerateAnswer({
        answers: qa,
        question: MAIN_QUESTION,
        selectedKeyword: picked,
      });
      setScaffoldText(generated);
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ??
        e?.message ??
        'AI 생성 중 오류가 발생했습니다.';
      setScaffoldError(msg);
    } finally {
      setIsLoadingScaffold(false);
    }
  };

  const handleAiCompose = () => {
    const base = scaffoldText.trim();
    if (!base) return toast.warning('AI 문장을 먼저 생성해 주세요.');
    setFinalText([base, personalInput.trim()].filter(Boolean).join('\n'));
    setStep('final');
  };

  const submitApplication = async () => {
    try {
      if (!finalText.trim())
        return toast.warning('완성본 문장을 확인해 주세요.');
      if (!uploadedImageFile)
        return toast.warning('자격증 이미지를 업로드해 주세요.');

      const keyName = await uploadFileAndGetKey(uploadedImageFile);

      const fieldAndAnswer: FieldAndAnswer[] = [
        {
          formFieldId: motivationFieldId,
          fieldType: 'TEXT',
          answer: finalText,
        },
        {
          formFieldId: certFieldId,
          fieldType: 'IMAGE',
          answer: [{ keyName, originalFileName: uploadedImageFile.name }],
        },
      ];

      await postApplicationDirect({
        jobPostId: parsedJobId,
        applicationStatus: 'SUBMITTED',
        fieldAndAnswer,
      });

      setStep('complete');
    } catch (e: any) {
      console.error('[submit error]', e?.response?.data ?? e);
      toast.error(
        e?.response?.data?.message ??
          e?.message ??
          '제출 중 오류가 발생했습니다.'
      );
    }
  };

  const handleGoHome = () => navigate('/personal');

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
                : step === 'choice'
                  ? '신청서에 추가할 항목이 있습니다.\n다음 질문에 답해 주세요.'
                  : step === 'scaffold'
                    ? 'AI가 신청서의 틀을 잡았습니다.\n관련된 경험을 직접 입력해 주세요.'
                    : step === 'final'
                      ? 'AI는 실수할 수 있습니다.\n사실과 다른 부분을 수정해 주세요.'
                      : step === 'complete'
                        ? '신청 완료되었습니다.'
                        : ''
            }
          />

          {step === 'complete' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />
              {!!finalText && (
                <div className="w-full border border-[#08D485] rounded-lg p-4 mt-4">
                  <h3 className="text-[16px] font-semibold mb-2">지원동기</h3>
                  <p className="text-[14px] text-[#333] whitespace-pre-wrap">
                    {finalText}
                  </p>
                </div>
              )}
              <div className="w-full pb-10">
                <NextButton onClick={handleGoHome}>홈으로 이동</NextButton>
              </div>
            </>
          )}

          {step === 'basic' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />
              <TwoButtonGroup
                leftLabel="저장"
                rightLabel="제출"
                onLeftClick={() => navigate('/personal/jobs/drafts')}
                onRightClick={() => setStep('complete')}
              />
            </>
          )}

          {step === 'choice' && (
            <div className="w-full flex flex-col gap-4">
              <MotivationChoiceSection
                question={`Q1. ${MAIN_QUESTION}`}
                choices={[
                  '경제적으로 도움을 얻으려고',
                  '사람들과 만나려고',
                  '사회에 도움이 되려고',
                  '직접 입력',
                ]}
                selected={selected}
                onSelect={setSelected}
              />
              <NextButton onClick={handleChoiceSubmit}>제출하기</NextButton>
            </div>
          )}

          {step === 'scaffold' && (
            <div className="w-full flex flex-col">
              <QuestionWriteFormSection
                title="AI 생성 문장"
                inputValue={
                  isLoadingScaffold
                    ? 'AI가 문장을 생성 중입니다...'
                    : scaffoldError
                      ? `[오류] ${scaffoldError}`
                      : scaffoldText
                }
                onChange={() => {}}
                readOnly
              />
              <QuestionWriteFormSection
                title="관련된 경험을 입력해주세요"
                inputValue={personalInput}
                onChange={setPersonalInput}
                placeholder="여기에 입력해주세요"
              />
              <NextButton
                onClick={handleAiCompose}
                disabled={isLoadingScaffold || !scaffoldText.trim()}
              >
                AI 자동 작성
              </NextButton>
            </div>
          )}

          {step === 'final' && (
            <>
              <QuestionWriteFormSection
                title="지원동기"
                inputValue={finalText}
                onChange={setFinalText}
                placeholder="여기서 수정할 수 있어요"
              />
              <TwoButtonGroup
                leftLabel="임시저장"
                rightLabel="다음"
                onLeftClick={() => navigate('/personal/jobs/drafts')}
                onRightClick={() => setStep('evidence')}
              />
            </>
          )}

          {step === 'evidence' && (
            <EvidenceSection
              onSave={() => navigate('/personal/jobs/drafts')}
              onSubmit={submitApplication}
              onFileUpload={setUploadedImageFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}
