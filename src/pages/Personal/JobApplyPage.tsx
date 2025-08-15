import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Topbar from '../../shared/components/topbar/Topbar';
import FormTitleSection from '../../shared/components/FormTitleSection';
import JobInfoSection from '../../shared/components/JobInfoSection';
import MotivationChoiceSection from '../../shared/components/MotivationChoiceSection';
import QuestionWriteFormSection from '../../shared/components/QuestionWriteFormSection';
import EvidenceSection from '../../shared/components/EvidenceSection';
import NextButton from '../../shared/components/NextButton';
import TwoButtonGroup from '../../shared/components/TwoButtonGroup';

import {
  postGenerateKeywords,
  postGenerateAnswer,
  postGenerateUpdatedAnswer,
  type QAOption,
} from './apis/ai';
import {
  postApplicationsEnsure,
  postApplicationDirect,
} from './apis/applications';
import { uploadFileAndGetKey } from './apis/files';

import type { FieldAndAnswer } from './types/applications';

export default function JobApplyPage() {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const parsedJobId = Number(jobId);

  // (임시) 폼필드 ID
  const motivationFieldId = 1;
  const certFieldId = 2;

  // (임시) 추가질문 유무
  const hasExtraQuestions = true;

  type Step =
    | 'basic'
    | 'choice'
    | 'scaffold'
    | 'final'
    | 'evidence'
    | 'complete';
  const [step, setStep] = useState<Step>(
    hasExtraQuestions ? 'choice' : 'basic'
  );

  // <31> 선택 답변
  const [selected, setSelected] = useState('');
  const MAIN_QUESTION = '지원 동기가 무엇인가요?';

  // <32> 스캐폴드 & 개인경험
  const [scaffoldText, setScaffoldText] = useState('');
  const [personalInput, setPersonalInput] = useState('');
  const [isLoadingScaffold, setIsLoadingScaffold] = useState(false);
  const [scaffoldError, setScaffoldError] = useState<string | null>(null);

  // <33> 최종 문장
  const [finalText, setFinalText] = useState('');

  // 공통
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 선택한 키워드 유지해서 <32>→<33> 컨텍스트 전달
  const [pickedKeyword, setPickedKeyword] = useState<string>('');
  // (필요 시) 다른 기본 질문/선택지도 answers에 합칠 수 있도록 배열로 보관
  const answersBase: QAOption[] = useMemo(
    () => (selected ? [{ question: MAIN_QUESTION, option: selected }] : []),
    [selected]
  );

  // (임시) 상단 카드 정보
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

  /* 유효성 가드 */
  useEffect(() => {
    if (!jobId || Number.isNaN(parsedJobId)) {
      alert('유효하지 않은 채용공고 경로입니다.');
      navigate('/personal');
    }
  }, [jobId, parsedJobId, navigate]);

  /* 간소 플로우: ensure 미리 호출 (있어도 서버가 무시) */
  useEffect(() => {
    if (!Number.isNaN(parsedJobId)) {
      postApplicationsEnsure(parsedJobId).catch(() => {
        console.warn('POST /api/applications/ensure 실패(무시 가능)');
      });
    }
  }, [parsedJobId]);

  /* 이탈 방지 */
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

  /* <31> 제출 → 키워드 & 스캐폴드 생성 */
  const handleChoiceSubmit = async () => {
    if (!selected.trim()) return alert('답변을 선택해 주세요.');

    setStep('scaffold');
    setIsLoadingScaffold(true);
    setScaffoldError(null);
    setScaffoldText('');

    try {
      // 1) 키워드
      const keywords = await postGenerateKeywords({
        answers: answersBase,
        question: MAIN_QUESTION,
      });
      const pick = keywords?.[0] ?? selected;
      setPickedKeyword(pick);

      // 2) 스캐폴드
      const scaffold = await postGenerateAnswer({
        answers: answersBase,
        question: MAIN_QUESTION,
        selectedKeyword: pick,
      });
      setScaffoldText(scaffold);
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

  /* <32> → <33> : 스캐폴드 + 개인경험으로 ‘완성본’ 생성 */
  const handleAiCompose = async () => {
    const scaffold = scaffoldText.trim();
    if (!scaffold) return alert('AI 문장을 먼저 생성해 주세요.');
    if (!personalInput.trim()) return alert('관련된 경험을 입력해 주세요.');

    try {
      const completed = await postGenerateUpdatedAnswer({
        answers: answersBase,
        question: MAIN_QUESTION,
        selectedKeyword: pickedKeyword || selected,
        extraInfo: personalInput,
        scaffold,
      });
      setFinalText(completed);
      setStep('final');
    } catch (e: any) {
      console.error('[updated-answers error]', e?.response?.data ?? e);
      // 실패해도 최소한 기존 방식(스캐폴드+경험 합치기)으로 폴백
      setFinalText([scaffold, personalInput.trim()].filter(Boolean).join('\n'));
      setStep('final');
    }
  };

  /* 임시저장(DRAFT) */
  const saveDraft = async () => {
    if (isSavingDraft) return;
    setIsSavingDraft(true);
    try {
      const payload: FieldAndAnswer[] = [];
      const draftText = finalText || scaffoldText || '';
      if (draftText) {
        payload.push({
          formFieldId: motivationFieldId,
          fieldType: 'TEXT',
          answer: draftText,
        });
      }
      if (uploadedImageFile) {
        const keyName = await uploadFileAndGetKey(uploadedImageFile);
        payload.push({
          formFieldId: certFieldId,
          fieldType: 'IMAGE',
          answer: [{ keyName, originalFileName: uploadedImageFile.name }],
        });
      }
      await postApplicationDirect({
        jobPostId: parsedJobId,
        applicationStatus: 'DRAFT',
        fieldAndAnswer: payload,
      });
      navigate('/personal/jobs/drafts');
    } catch (e: any) {
      alert(
        e?.response?.data?.message ??
          e?.message ??
          '임시저장 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSavingDraft(false);
    }
  };

  /* 최종 제출(SUBMITTED) */
  const submitApplication = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (!finalText.trim()) return alert('완성본 문장을 확인해 주세요.');
      if (!uploadedImageFile) return alert('자격증 이미지를 업로드해 주세요.');

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
      alert(
        e?.response?.data?.message ??
          e?.message ??
          '제출 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* (추가항목 없는 경우) 즉시 제출 */
  const submitBasic = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await postApplicationDirect({
        jobPostId: parsedJobId,
        applicationStatus: 'SUBMITTED',
        fieldAndAnswer: [],
      });
      setStep('complete');
    } catch (e: any) {
      alert(
        e?.response?.data?.message ??
          e?.message ??
          '제출 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSubmitting(false);
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

          {/* 완료 화면 */}
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

          {/* 추가 항목이 전혀 없을 때 */}
          {step === 'basic' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />
              <TwoButtonGroup
                leftLabel="저장"
                rightLabel="제출"
                onLeftClick={saveDraft}
                onRightClick={submitBasic}
              />
            </>
          )}

          {/* <31> 선택형 질문 */}
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
              <NextButton
                onClick={handleChoiceSubmit}
                disabled={isLoadingScaffold || isSubmitting}
              >
                제출하기
              </NextButton>
            </div>
          )}

          {/* <32> 스캐폴드 + 개인경험 입력 */}
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
                disabled={
                  isLoadingScaffold ||
                  !scaffoldText.trim() ||
                  !personalInput.trim()
                }
              >
                AI 자동 작성
              </NextButton>
            </div>
          )}

          {/* <33> 최종 문장 편집 */}
          {step === 'final' && (
            <>
              <QuestionWriteFormSection
                title="지원동기"
                inputValue={finalText}
                onChange={setFinalText}
                placeholder="여기서 수정할 수 있어요"
              />
              <TwoButtonGroup
                leftLabel={isSavingDraft ? '저장 중...' : '임시저장'}
                rightLabel="다음"
                onLeftClick={saveDraft}
                onRightClick={() => setStep('evidence')}
              />
            </>
          )}

          {/* 증빙 업로드 + 최종 제출 */}
          {step === 'evidence' && (
            <EvidenceSection
              onSave={saveDraft}
              onSubmit={submitApplication}
              onFileUpload={setUploadedImageFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}
