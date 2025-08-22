import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Topbar from '../../shared/components/topbar/Topbar';
import FormTitleSection from '../../shared/components/FormTitleSection';
import JobInfoSection from '../../shared/components/JobInfoSection';
import MotivationChoiceSection from '../../shared/components/MotivationChoiceSection';
import QuestionWriteFormSection from '../../shared/components/QuestionWriteFormSection';
import EvidenceSection from '../../shared/components/EvidenceSection';
import NextButton from '../../shared/components/NextButton';
import TwoButtonGroup from '../../shared/components/TwoButtonGroup';
import {
  postGenerateAnswer,
  postGenerateUpdatedAnswer,
  type QAOption,
} from './apis/ai';
import {
  postApplicationsEnsure,
  postApplicationDirect,
  postApplicationDelegate,
} from './apis/applications';
import { uploadFileAndGetKey } from './apis/files';
import { getQuestionsDirect, pickExtraFields } from './apis/questions';
import { getQuestionsDelegate } from './apis/questionsDelegate';
import { getMySenior, getConnectedSeniors, pickSenior } from './apis/guardian';
import { apiGetJobDetail } from './apis/jobapi';
import type { FieldAndAnswer } from './types/applications';
import type { Info } from './types/userInfo';

type ApplicationStatus = 'NON_STARTED' | 'DRAFT' | 'SUBMITTED';

export default function JobApplyPage() {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [searchParams] = useSearchParams();

  const parsedJobId = Number(jobId);
  const seniorIdFromQuery =
    Number(searchParams.get('seniorId') ?? searchParams.get('sid') ?? '') ||
    null;

  type Step =
    | 'loading'
    | 'basic'
    | 'choice'
    | 'scaffold'
    | 'final'
    | 'evidence'
    | 'complete'
    | 'review';

  const [initialized, setInitialized] = useState(false);
  const [step, setStep] = useState<Step>('loading');

  const [jobTitle, setJobTitle] = useState<string>('');

  const [senior, setSenior] = useState<Info | null>(null);
  const [isGuardianMode, setIsGuardianMode] = useState(false);
  const [selectedSeniorId, setSelectedSeniorId] = useState<number | null>(null);

  //  역할(시니어/보호자) 판별이 끝났는지 여부 (플리커 방지의 핵심)
  const [roleResolved, setRoleResolved] = useState(false);

  const jobInfoProps = useMemo(() => {
    const s: any = senior ?? {};
    const name = s.name ?? s.seniorName ?? '';
    const phone = s.phone ?? s.seniorPhone ?? '';
    const ageStr = s.age ? `${s.age}세` : '';
    const address = `${s.roadAddress ?? ''} ${s.detailAddress ?? ''}`.trim();

    return {
      name,
      gender: '',
      age: ageStr,
      phone,
      idNumber: '',
      address,
    };
  }, [senior]);

  // 선택/AI
  const MAIN_QUESTION = '지원 동기가 무엇인가요?';
  const [selected, setSelected] = useState('');
  const [scaffoldText, setScaffoldText] = useState('');
  const [personalInput, setPersonalInput] = useState('');
  const [isLoadingScaffold, setIsLoadingScaffold] = useState(false);
  const [scaffoldError, setScaffoldError] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [composeError, setComposeError] = useState<string | null>(null);
  const [finalText, setFinalText] = useState('');

  // 첨부/제출
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [motivationFieldId, setMotivationFieldId] = useState<number | null>(
    null
  );
  const [certFieldId, setCertFieldId] = useState<number | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [previewName, setPreviewName] = useState<string>('');
  useEffect(() => {
    if (!uploadedImageFile) return;
    const url = URL.createObjectURL(uploadedImageFile);
    setPreviewUrl(url);
    setPreviewName(uploadedImageFile.name);
    return () => URL.revokeObjectURL(url);
  }, [uploadedImageFile]);

  const answersBase: QAOption[] = useMemo(
    () => (selected ? [{ question: MAIN_QUESTION, option: selected }] : []),
    [selected]
  );

  // 유효성
  useEffect(() => {
    if (!parsedJobId || Number.isNaN(parsedJobId)) {
      toast.error('유효하지 않은 채용공고 경로입니다.');
      navigate('/personal');
    }
  }, [parsedJobId, navigate]);

  // 공고 제목
  useEffect(() => {
    if (Number.isNaN(parsedJobId)) return;
    apiGetJobDetail(parsedJobId)
      .then((detail) => setJobTitle(detail.title))
      .catch(() => setJobTitle(''));
  }, [parsedJobId]);

  // 시니어/보호자 모드 판별 및 대리 대상 선택
  useEffect(() => {
    (async () => {
      setRoleResolved(false);
      try {
        const me = await getMySenior();
        setSenior(me as any);
        setIsGuardianMode(false);
        setSelectedSeniorId((me as any)?.id ?? (me as any)?.seniorId ?? null);
      } catch {
        try {
          const list = await getConnectedSeniors();
          if (!list.length) {
            setSenior(null);
            setIsGuardianMode(true);
            setSelectedSeniorId(null);
            toast.error('연결된 시니어가 없습니다.');
          } else {
            const chosen = pickSenior(list as any, seniorIdFromQuery);
            setSenior(chosen as any);
            setIsGuardianMode(true);
            setSelectedSeniorId(
              (chosen as any)?.id ?? (chosen as any)?.seniorId ?? null
            );
          }
        } catch (e) {
          console.warn('[guardian load failed]', e);
          setSenior(null);
          setIsGuardianMode(true);
          setSelectedSeniorId(null);
        }
      } finally {
        // 👉 이 시점부터 질문을 불러오게 함
        setRoleResolved(true);
      }
    })();
  }, [seniorIdFromQuery]);

  // 초기 분기 + 드래프트 복원
  useEffect(() => {
    // 역할 판별이 끝나기 전에는 질문 호출 금지(플리커 방지)
    if (!roleResolved) return;
    const init = async () => {
      if (Number.isNaN(parsedJobId)) return;

      try {
        const ensureOnceKey = `ensure:${parsedJobId}`;
        if (!sessionStorage.getItem(ensureOnceKey)) {
          try {
            await postApplicationsEnsure(parsedJobId);
            sessionStorage.setItem(ensureOnceKey, '1');
          } catch (e: any) {
            console.warn(
              '[ensure skipped]',
              e?.response?.data?.message ?? e?.message
            );
            sessionStorage.setItem(ensureOnceKey, '1');
          }
        }

        let allFields: any[] = [];
        let extras: ReturnType<typeof pickExtraFields> = [];

        try {
          if (isGuardianMode) {
            if (!selectedSeniorId) throw new Error('대리 작성: seniorId 없음');
            allFields = await getQuestionsDelegate(
              parsedJobId,
              selectedSeniorId
            );
          } else {
            allFields = await getQuestionsDirect(parsedJobId);
          }

          extras = pickExtraFields(allFields);

          const norm = (s?: string) => (s ?? '').toUpperCase();
          const labelOf = (f: any) =>
            `${f?.label ?? ''} ${f?.title ?? ''} ${f?.question ?? ''}`.trim();

          const motivationField =
            allFields.find(
              (f: any) =>
                norm(f.fieldType).startsWith('TEXT') &&
                (labelOf(f).includes('지원동기') ||
                  labelOf(f).includes('지원 동기가 무엇인가요?'))
            ) ??
            extras.find(
              (f: any) =>
                norm(f.fieldType).startsWith('TEXT') &&
                (labelOf(f).includes('지원동기') ||
                  labelOf(f).includes('지원 동기가 무엇인가요?'))
            ) ??
            allFields.find((f: any) => norm(f.fieldType).startsWith('TEXT'));

          const imageField = allFields.find(
            (f: any) => norm(f.fieldType) === 'IMAGE'
          );

          setMotivationFieldId((motivationField as any)?.formFieldId ?? null);
          setCertFieldId((imageField as any)?.formFieldId ?? null);

          const hasAnyExtras = (extras?.length ?? 0) > 0;

          // 드래프트 복원
          const textExtraById = extras.find(
            (f: any) => f.formFieldId === (motivationField as any)?.formFieldId
          );
          let savedText =
            textExtraById && typeof textExtraById.answer === 'string'
              ? (textExtraById.answer as string)
              : '';

          const looksWrong =
            savedText &&
            (savedText.trim().length < 5 ||
              (senior?.name && savedText.trim() === senior.name?.trim()));
          if (looksWrong) savedText = '';

          if (savedText) setFinalText(savedText);

          const imageExtraById = extras.find(
            (f: any) => f.formFieldId === (imageField as any)?.formFieldId
          );
          const savedImages =
            imageExtraById && Array.isArray(imageExtraById.answer)
              ? (imageExtraById.answer as Array<{
                  keyName: string;
                  originalFileName: string;
                }>)
              : [];
          if (savedImages.length > 0) {
            setPreviewName(savedImages[0].originalFileName || '');
            setPreviewUrl('');
          }

          // 단계 결정
          if (!hasAnyExtras) setStep('basic');
          else if (savedText) setStep('final');
          else setStep('choice');
        } catch (e: any) {
          const code = e?.response?.data?.code as string | undefined;
          const msg = e?.response?.data?.message ?? e?.message;
          console.warn('[questions error]', code, msg);
          if (code === 'JOBPOST404' || code === 'JOB_POST_NOT_FOUND') {
            toast.error('존재하지 않는 채용공고입니다.');
            navigate('/personal');
            return;
          }
          setStep('basic'); // 질문 로드 실패 시 기본 플로우
        }
      } finally {
        setInitialized(true);
      }
    };

    init();
  }, [
    roleResolved, // ★ 추가: 역할 판별 끝난 뒤에만 동작
    parsedJobId,
    navigate,
    senior?.name,
    isGuardianMode,
    selectedSeniorId,
  ]);

  // 이탈 방지
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

  // 선택 제출 → 스캐폴드 생성
  const handleChoiceSubmit = async () => {
    if (!selected.trim()) return toast.warning('답변을 선택해 주세요.');
    setStep('scaffold');
    setIsLoadingScaffold(true);
    setScaffoldError(null);
    setScaffoldText('');

    try {
      const scaffold = await postGenerateAnswer({
        answers: answersBase,
        question: MAIN_QUESTION,
        selectedKeyword: selected,
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

  // 보강 작성
  const handleAiCompose = async () => {
    const base = scaffoldText.trim();
    const exp = personalInput.trim();
    if (!base) return toast.warning('AI 문장을 먼저 생성해 주세요.');
    if (!exp) return toast.warning('관련된 경험을 입력해 주세요.');

    setIsComposing(true);
    setComposeError(null);
    try {
      const composed = await postGenerateUpdatedAnswer({
        answers: answersBase,
        question: MAIN_QUESTION,
        generatedAnswer: base,
        addedExperience: exp,
      });
      setFinalText(composed);
      setStep('final');
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ??
        e?.message ??
        '보강 문장 생성 중 오류가 발생했습니다.';
      setComposeError(msg);
      toast.error(msg);
    } finally {
      setIsComposing(false);
    }
  };

  // 공통 저장 함수
  const sendApplication = async (
    status: ApplicationStatus,
    payload: FieldAndAnswer[]
  ) => {
    const base = {
      jobPostId: parsedJobId,
      applicationStatus: status,
      fieldAndAnswer: payload,
    };

    if (isGuardianMode) {
      if (!selectedSeniorId)
        throw new Error('대리 작성 대상 시니어가 없습니다.');
      await postApplicationDelegate({ ...base, seniorId: selectedSeniorId });
    } else {
      await postApplicationDirect(base);
    }
  };

  // 임시저장(NON_STARTED) — 텍스트/이미지 모두 저장
  const saveDraft = async (opts?: { silent?: boolean }) => {
    const silent = !!opts?.silent;
    if (isSavingDraft) return;
    setIsSavingDraft(true);
    try {
      const payload: FieldAndAnswer[] = [];
      const draftText = finalText || scaffoldText || '';

      if (draftText && motivationFieldId != null) {
        payload.push({
          formFieldId: motivationFieldId,
          fieldType: 'TEXT',
          answer: draftText,
        });
      }
      if (uploadedImageFile && certFieldId != null) {
        const keyName = await uploadFileAndGetKey(uploadedImageFile);
        payload.push({
          formFieldId: certFieldId,
          fieldType: 'IMAGE',
          answer: [{ keyName, originalFileName: uploadedImageFile.name }],
        });
      }

      await sendApplication('NON_STARTED', payload);
      if (!silent && step === 'basic') {
        // 디자인(29)에서는 basic 화면의 "저장" 후 목록으로 이동
        navigate('/personal/jobs/drafts');
      } else {
        toast.success('임시저장 되었습니다.');
      }
    } catch (e: any) {
      console.error('[draft error]', e?.response?.data ?? e);
      toast.error(
        e?.response?.data?.message ??
          e?.message ??
          '임시저장 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSavingDraft(false);
    }
  };

  // 최종 제출(SUBMITTED)
  const submitApplication = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (!finalText.trim())
        return toast.warning('완성본 문장을 확인해 주세요.');
      if (certFieldId != null && !uploadedImageFile && !previewName) {
        return toast.warning('자격증 이미지를 업로드해 주세요.');
      }

      const payload: FieldAndAnswer[] = [];
      if (motivationFieldId != null) {
        payload.push({
          formFieldId: motivationFieldId,
          fieldType: 'TEXT',
          answer: finalText,
        });
      }
      if (uploadedImageFile && certFieldId != null) {
        const keyName = await uploadFileAndGetKey(uploadedImageFile);
        payload.push({
          formFieldId: certFieldId,
          fieldType: 'IMAGE',
          answer: [{ keyName, originalFileName: uploadedImageFile.name }],
        });
      }

      await sendApplication('SUBMITTED', payload);
      setStep('complete');
    } catch (e: any) {
      console.error('[submit error]', e?.response?.data ?? e);
      toast.error(
        e?.response?.data?.message ??
          e?.message ??
          '제출 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // (추가항목 없음) 즉시 제출
  const submitBasic = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await sendApplication('SUBMITTED', []);
      setStep('complete');
    } catch (e: any) {
      console.error('[submit basic error]', e?.response?.data ?? e);
      toast.error(
        e?.response?.data?.message ??
          e?.message ??
          '제출 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => navigate('/');
  const handleFileUpload = (file: File) => setUploadedImageFile(file);

  // 로딩 단계에서는 아무것도 렌더하지 않음(플리커 방지)
  if (!initialized || step === 'loading') {
    return (
      <div className="pt-[10px] h-[740px] flex items-center justify-center">
        <span className="text-sm text-gray-500">불러오는 중…</span>
      </div>
    );
  }

  const renderSummary = (mode: 'review' | 'complete') => (
    <>
      <JobInfoSection jobName={jobTitle || '채용공고'} info={jobInfoProps} />
      {!!finalText && (
        <div className="w-full mt-4">
          <QuestionWriteFormSection
            title="지원동기"
            inputValue={finalText}
            onChange={() => {}}
            readOnly
          />
        </div>
      )}

      {(certFieldId != null ||
        !!uploadedImageFile ||
        !!previewUrl ||
        !!previewName) && (
        <div className="w-full border border-emerald-300 rounded-lg p-4 mt-4">
          <h3 className="text-[16px] font-semibold mb-2">자격증 이미지</h3>
          {!!uploadedImageFile || !!previewUrl || !!previewName ? (
            <div className="flex items-center gap-3">
              {!!previewUrl && (
                <img
                  src={previewUrl}
                  alt={previewName || 'uploaded'}
                  className="w-[72px] h-[72px] object-cover rounded-md border"
                />
              )}
              <div className="flex-1">
                <div className="text-[14px] font-medium truncate">
                  {previewName || uploadedImageFile?.name || '이미지'}
                </div>
                <div className="text-[12px] text-gray-500 mt-1">
                  {mode === 'review'
                    ? '첨부한 이미지가 맞는지 확인해 주세요.'
                    : '제출된 이미지를 확인하세요.'}
                </div>
              </div>
              {mode === 'review' && (
                <button
                  className="text-xs px-3 py-2 rounded border"
                  onClick={() => {
                    setUploadedImageFile(null);
                    setPreviewUrl('');
                    setPreviewName('');
                    setStep('evidence');
                  }}
                >
                  다시 첨부
                </button>
              )}
            </div>
          ) : (
            <div className="text-[13px] text-gray-600">
              첨부된 파일이 없습니다.{` `}
              {mode === 'review' && (
                <span
                  className="underline cursor-pointer"
                  onClick={() => setStep('evidence')}
                >
                  증빙 첨부 화면으로 이동
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );

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
                      : step === 'evidence'
                        ? '증빙자료 사진 첨부가 필요합니다.'
                        : step === 'review'
                          ? '신청 완료 전 마지막으로 신청서를 확인하세요.'
                          : step === 'complete'
                            ? '신청 완료되었습니다.'
                            : ''
            }
          />

          {step === 'complete' && (
            <>
              {renderSummary('complete')}
              <div className="h-4" />
              <div className="sticky bottom-0 w-full bg-white pt-3 pb-4">
                <NextButton onClick={handleGoHome}>홈으로 이동</NextButton>
              </div>
            </>
          )}

          {step === 'basic' && (
            <>
              <JobInfoSection
                jobName={jobTitle || '채용공고'}
                info={jobInfoProps}
              />
              <TwoButtonGroup
                leftLabel="저장"
                rightLabel="제출"
                onLeftClick={() => saveDraft()}
                onRightClick={submitBasic}
              />
            </>
          )}

          {step === 'choice' && (
            <div className="w-full flex flex-col gap-4">
              <MotivationChoiceSection
                question={`Q1. ${MAIN_QUESTION}`}
                selected={selected}
                onSelect={setSelected}
                baseQAOptions={[]}
                isLoadingData={false}
              />
              <NextButton
                onClick={handleChoiceSubmit}
                disabled={isLoadingScaffold || isSubmitting}
              >
                제출하기
              </NextButton>
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
              {composeError && (
                <div className="text-sm text-red-500 mt-2">
                  [오류] {composeError}
                </div>
              )}
              <NextButton
                onClick={handleAiCompose}
                disabled={
                  isLoadingScaffold ||
                  isComposing ||
                  !scaffoldText.trim() ||
                  !personalInput.trim()
                }
              >
                {isComposing ? '작성 중…' : 'AI 자동 작성'}
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
              <div className="h-4" />
              <div className="sticky bottom-0 w-full bg-white pt-3 pb-4">
                <TwoButtonGroup
                  leftLabel={isSavingDraft ? '저장 중...' : '임시저장'}
                  rightLabel="다음"
                  onLeftClick={() => saveDraft({ silent: true })}
                  onRightClick={() => setStep('evidence')}
                />
              </div>
            </>
          )}

          {step === 'evidence' && (
            <>
              <EvidenceSection onFileUpload={handleFileUpload} />
              <div className="h-4" />
              <div className="sticky bottom-0 w-full bg-white pt-3 pb-4">
                <TwoButtonGroup
                  leftLabel="이전"
                  rightLabel="다음"
                  onLeftClick={() => setStep('final')}
                  onRightClick={() => setStep('review')}
                />
              </div>
            </>
          )}

          {step === 'review' && (
            <>
              {renderSummary('review')}
              <div className="h-4" />
              <div className="sticky bottom-0 w-full bg-white pt-3 pb-4">
                <TwoButtonGroup
                  leftLabel={isSavingDraft ? '저장 중…' : '임시저장'}
                  rightLabel={isSubmitting ? '제출 중…' : '제출'}
                  onLeftClick={() => saveDraft({ silent: true })}
                  onRightClick={submitApplication}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
