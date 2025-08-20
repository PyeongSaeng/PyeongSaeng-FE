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
import {
  postGenerateAnswer,
  postGenerateUpdatedAnswer,
  type QAOption,
} from './apis/ai';
import {
  postApplicationsEnsure,
  postApplicationDirect,
} from './apis/applications';
import { uploadFileAndGetKey } from './apis/files';
import { getQuestionsDirect, pickExtraFields } from './apis/questions';
import { apiGetJobDetail } from './apis/jobapi';
import axiosInstance from '../../shared/apis/axiosInstance';
import type { FieldAndAnswer } from './types/applications';
import type { Info } from './types/userInfo';

export default function JobApplyPage() {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const parsedJobId = Number(jobId);

  type Step =
    | 'basic'
    | 'choice'
    | 'scaffold'
    | 'final'
    | 'evidence'
    | 'complete'
    | 'review';

  const [initialized, setInitialized] = useState(false);
  const [step, setStep] = useState<Step>('basic');

  const [jobTitle, setJobTitle] = useState<string>('');

  const [senior, setSenior] = useState<Info | null>(null);
  const jobInfoProps = useMemo(() => {
    if (!senior) {
      return {
        name: '',
        gender: '',
        age: '',
        phone: '',
        idNumber: '',
        address: '',
      };
    }
    const address =
      `${senior.roadAddress ?? ''} ${senior.detailAddress ?? ''}`.trim();
    return {
      name: senior.name ?? '',
      gender: '',
      age: senior.age ? `${senior.age}세` : '',
      phone: senior.phone ?? '',
      idNumber: '',
      address,
    };
  }, [senior]);

  // <31> 선택 답변
  const [selected, setSelected] = useState('');
  const MAIN_QUESTION = '지원 동기가 무엇인가요?';

  // <32> 스캐폴드 & 개인경험
  const [scaffoldText, setScaffoldText] = useState('');
  const [personalInput, setPersonalInput] = useState('');
  const [isLoadingScaffold, setIsLoadingScaffold] = useState(false);
  const [scaffoldError, setScaffoldError] = useState<string | null>(null);

  // ✅ 보강 API 호출 로딩/에러
  const [isComposing, setIsComposing] = useState(false);
  const [composeError, setComposeError] = useState<string | null>(null);

  // <33> 최종 문장
  const [finalText, setFinalText] = useState('');

  // 공통
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 공고별 실제 필드 ID
  const [motivationFieldId, setMotivationFieldId] = useState<number | null>(
    null
  );
  const [certFieldId, setCertFieldId] = useState<number | null>(null);

  // 썸네일/파일명(업로드 시 생성)
  const [previewUrl, setPreviewUrl] = useState<string>(''); // blob URL
  const [previewName, setPreviewName] = useState<string>(''); // 파일명 표시용
  useEffect(() => {
    if (!uploadedImageFile) return;
    const url = URL.createObjectURL(uploadedImageFile);
    setPreviewUrl(url);
    setPreviewName(uploadedImageFile.name);
    return () => {
      URL.revokeObjectURL(url);
    };
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

  // 채용공고 제목
  useEffect(() => {
    if (Number.isNaN(parsedJobId)) return;
    apiGetJobDetail(parsedJobId)
      .then((detail) => setJobTitle(detail.title))
      .catch(() => setJobTitle(''));
  }, [parsedJobId]);

  // 내 정보
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get('/api/user/senior/me');
        const me: Info = (data?.result ?? data) as Info;
        setSenior(me);
      } catch (e) {
        console.warn('[profile load failed]', e);
        setSenior(null);
      }
    })();
  }, []);

  // 초기 분기 + 드래프트 복원
  useEffect(() => {
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

        // (1) 질문 목록
        let allFields: Awaited<ReturnType<typeof getQuestionsDirect>> = [];
        let extras: ReturnType<typeof pickExtraFields> = [];
        try {
          allFields = await getQuestionsDirect(parsedJobId);
          extras = pickExtraFields(allFields);

          const norm = (s?: string) => (s ?? '').toUpperCase();
          const labelOf = (f: any) =>
            `${f?.label ?? ''} ${f?.title ?? ''} ${f?.question ?? ''}`.trim();

          // ✅ 지원동기 텍스트 필드 특정
          const motivationField =
            allFields.find(
              (f: any) =>
                norm(f.fieldType).startsWith('TEXT') &&
                (labelOf(f).includes('지원동기') ||
                  labelOf(f).includes(MAIN_QUESTION))
            ) ??
            extras.find(
              (f: any) =>
                norm(f.fieldType).startsWith('TEXT') &&
                (labelOf(f).includes('지원동기') ||
                  labelOf(f).includes(MAIN_QUESTION))
            ) ??
            allFields.find((f: any) => norm(f.fieldType).startsWith('TEXT'));

          const imageField = allFields.find(
            (f: any) => norm(f.fieldType) === 'IMAGE'
          );

          setMotivationFieldId((motivationField as any)?.formFieldId ?? null);
          setCertFieldId((imageField as any)?.formFieldId ?? null);

          // 🔎 추가질문 유무(extras 기준)
          const hasAnyExtras = (extras?.length ?? 0) > 0;

          // ✅ 드래프트 복원: "지원동기" 필드ID로만 텍스트 복원
          const textExtraById = extras.find(
            (f: any) => f.formFieldId === (motivationField as any)?.formFieldId
          );
          let savedText =
            textExtraById && typeof textExtraById.answer === 'string'
              ? (textExtraById.answer as string)
              : '';

          // 안전장치: 너무 짧거나 이름 동일 시 무시
          const looksWrong =
            savedText &&
            (savedText.trim().length < 5 ||
              (senior?.name && savedText.trim() === senior.name.trim()));
          if (looksWrong) savedText = '';

          if (savedText) setFinalText(savedText);

          // 이미지 메타 복원(파일명만)
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
            setPreviewUrl(''); // 서버 메타만 있으므로 blob URL 없음
          }

          // ✅ 단계 결정
          if (!hasAnyExtras) {
            setStep('basic');
          } else if (savedText) {
            setStep('final');
          } else {
            setStep('choice');
          }
        } catch (e: any) {
          const code = e?.response?.data?.code as string | undefined;
          const msg = e?.response?.data?.message ?? e?.message;
          console.warn('[questions error]', code, msg);
          if (code === 'JOBPOST404') {
            toast.error('존재하지 않는 채용공고입니다.');
            navigate('/personal');
            return;
          }
        }
      } finally {
        setInitialized(true);
      }
    };

    init();
  }, [parsedJobId, navigate, senior?.name]);

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

  // <31> → 스캐폴드 생성
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

  // <32> → <33> (보강 API 호출)
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
        generatedAnswer: base, // 스캐폴드
        addedExperience: exp, // 개인경험
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

  // 임시저장(DRAFT)
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

      await postApplicationDirect({
        jobPostId: parsedJobId,
        applicationStatus: 'DRAFT',
        fieldAndAnswer: payload,
      });

      if (!silent) {
        navigate('/personal/jobs/drafts');
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
        // 이미지 필수인데 새 업로드도, 저장된 파일명도 없으면 막기
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

      await postApplicationDirect({
        jobPostId: parsedJobId,
        applicationStatus: 'SUBMITTED',
        fieldAndAnswer: payload,
      });
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
      await postApplicationDirect({
        jobPostId: parsedJobId,
        applicationStatus: 'SUBMITTED',
        fieldAndAnswer: [],
      });
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

  const handleGoHome = () => navigate('/'); // 완료 후 홈으로

  const handleFileUpload = (file: File) => {
    setUploadedImageFile(file);
    // previewUrl/Name은 useEffect에서 생성
  };

  if (!initialized) {
    return (
      <div className="pt-[10px] h-[740px] flex items-center justify-center">
        <span className="text-sm text-gray-500">불러오는 중…</span>
      </div>
    );
  }

  // 리뷰/완료 공용 요약 석션
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

          {/* 완료 화면 */}
          {step === 'complete' && (
            <>
              {renderSummary('complete')}
              <div className="h-4" />
              <div className="sticky bottom-0 w-full bg-white pt-3 pb-4">
                <NextButton onClick={handleGoHome}>홈으로 이동</NextButton>
              </div>
            </>
          )}

          {/* 추가 항목 없음 */}
          {step === 'basic' && (
            <>
              <JobInfoSection
                jobName={jobTitle || '채용공고'}
                info={jobInfoProps}
              />
              <TwoButtonGroup
                leftLabel="저장"
                rightLabel="제출"
                onLeftClick={saveDraft}
                onRightClick={submitBasic}
              />
            </>
          )}

          {/* 선택형 질문 */}
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

          {/* 스캐폴드 + 개인경험 입력 */}
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
                  isComposing || // ✅ 로딩 반영
                  !scaffoldText.trim() ||
                  !personalInput.trim()
                }
              >
                {isComposing ? '작성 중…' : 'AI 자동 작성'}
              </NextButton>
            </div>
          )}

          {/* 최종 문장 편집 */}
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
                  onLeftClick={saveDraft}
                  onRightClick={() => setStep('evidence')}
                />
              </div>
            </>
          )}

          {/* 증빙 업로드 */}
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

          {/* 리뷰(최종 확인 & 제출) */}
          {step === 'review' && (
            <>
              {renderSummary('review')}
              <div className="h-4" />
              <div className="sticky bottom-0 w-full bg-white pt-3 pb-4">
                <TwoButtonGroup
                  leftLabel={isSavingDraft ? '저장 중…' : '이전(저장)'}
                  rightLabel={isSubmitting ? '제출 중…' : '제출'}
                  onLeftClick={async () => {
                    await saveDraft({ silent: true });
                    setStep('evidence');
                  }}
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
