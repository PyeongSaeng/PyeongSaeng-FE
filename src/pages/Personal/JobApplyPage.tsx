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

import { postGenerateAnswer, type QAOption } from './apis/ai';
import {
  postApplicationsEnsure,
  postApplicationDirect,
} from './apis/applications';
import { uploadFileAndGetKey } from './apis/files';

import type { FieldAndAnswer } from './types/applications';
import {
  getQuestionsDirect,
  pickExtraFields,
  isFieldAnswered,
} from './apis/questions';
import { apiGetJobDetail } from './apis/jobapi';

import axiosInstance from '../../shared/apis/axiosInstance';
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

  // 채용공고 제목
  const [jobTitle, setJobTitle] = useState<string>('');

  // 내 프로필
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

  // <33> 최종 문장
  const [finalText, setFinalText] = useState('');

  // 공통
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ 공고별 실제 필드 ID
  const [motivationFieldId, setMotivationFieldId] = useState<number | null>(
    null
  );
  const [certFieldId, setCertFieldId] = useState<number | null>(null);

  // 🔵 완료 페이지에서 보여줄 썸네일/파일명
  const [previewUrl, setPreviewUrl] = useState<string>(''); // blob URL
  const [previewName, setPreviewName] = useState<string>(''); // 원본 파일명
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
    if (!jobId || Number.isNaN(parsedJobId)) {
      alert('유효하지 않은 채용공고 경로입니다.');
      navigate('/personal');
    }
  }, [jobId, parsedJobId, navigate]);

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

  // 초기 분기
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

          // formFieldId 매핑
          const textField = allFields.find((f) => f.fieldType === 'TEXT');
          const imageField = allFields.find((f) => f.fieldType === 'IMAGE');
          setMotivationFieldId(textField?.formFieldId ?? null);
          setCertFieldId(imageField?.formFieldId ?? null);
        } catch (e: any) {
          const code = e?.response?.data?.code as string | undefined;
          const msg = e?.response?.data?.message ?? e?.message;
          console.warn('[questions error]', code, msg);
          if (code === 'JOBPOST404') {
            alert('존재하지 않는 채용공고입니다.');
            navigate('/personal');
            return;
          }
          allFields = [];
          extras = [];
        }

        // (2) DRAFT 여부
        let hasDraftForThisJob = false;
        try {
          const { data } = await axiosInstance.get('/api/applications/mine');
          const myApps = (data?.result ?? []) as Array<{
            jobPostId: number;
            applicationStatus:
              | 'NON_STARTED'
              | 'DRAFT'
              | 'SUBMITTED'
              | 'APPROVED'
              | 'REJECTED';
          }>;
          hasDraftForThisJob = myApps?.some(
            (a) =>
              a.jobPostId === parsedJobId && a.applicationStatus === 'DRAFT'
          );
        } catch (e) {
          console.warn('[apps load failed]', e);
        }

        // (3) 최종 분기
        if (extras.length === 0) {
          setStep(allFields.length > 0 ? 'choice' : 'basic');
        } else if (hasDraftForThisJob && extras.some(isFieldAnswered)) {
          setStep('scaffold');
          const textExtra = extras.find(
            (f) =>
              f.fieldType === 'TEXT' &&
              typeof f.answer === 'string' &&
              f.answer.trim()
          );
          if (textExtra) setScaffoldText(textExtra.answer as string);
        } else {
          setStep('choice');
        }
      } finally {
        setInitialized(true);
      }
    };

    init();
  }, [parsedJobId, navigate]);

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
    if (!selected.trim()) return alert('답변을 선택해 주세요.');

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

  // <32> → <33> (로컬 병합)
  const handleAiCompose = async () => {
    const scaffold = scaffoldText.trim();
    if (!scaffold) return alert('AI 문장을 먼저 생성해 주세요.');
    if (!personalInput.trim()) return alert('관련된 경험을 입력해 주세요.');

    const merged = `${scaffold}\n\n[경험]\n${personalInput.trim()}`.trim();
    setFinalText(merged);
    setStep('final');
  };

  // 임시저장(DRAFT) — silent 모드 지원
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
      alert(
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
      if (!finalText.trim()) return alert('완성본 문장을 확인해 주세요.');
      if (certFieldId != null && !uploadedImageFile) {
        return alert('자격증 이미지를 업로드해 주세요.');
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
      alert(
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

  // 업로드 버튼 콜백: EvidenceSection에 내려줄 래퍼 (이름/프리뷰 유지용)
  const handleFileUpload = (file: File) => {
    setUploadedImageFile(file);
    // preview는 useEffect에서 생성(revoke 포함)
  };

  if (!initialized) {
    return (
      <div className="pt-[10px] h-[740px] flex items-center justify-center">
        <span className="text-sm text-gray-500">불러오는 중…</span>
      </div>
    );
  }

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
              <JobInfoSection
                jobName={jobTitle || '채용공고'}
                info={jobInfoProps}
              />

              {!!finalText && (
                <div className="w-full border border-[#08D485] rounded-lg p-4 mt-4">
                  <h3 className="text-[16px] font-semibold mb-2">지원동기</h3>
                  <p className="text-[14px] text-[#333] whitespace-pre-wrap">
                    {finalText}
                  </p>
                </div>
              )}

              {/* 제출 후 이미지 확인 블록 */}
              {!!previewUrl && (
                <div className="w-full border border-emerald-300 rounded-lg p-4 mt-4">
                  <h3 className="text-[16px] font-semibold mb-2">
                    자격증 이미지
                  </h3>
                  <div className="flex items-center gap-3">
                    <img
                      src={previewUrl}
                      alt={previewName || 'uploaded'}
                      className="w-[96px] h-[96px] object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <div className="text-[14px] font-medium truncate">
                        {previewName}
                      </div>
                      <div className="text-[12px] text-gray-500 mt-1">
                        제출된 이미지를 확인하세요.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full pb-10 mt-4">
                <NextButton onClick={handleGoHome}>홈으로 이동</NextButton>
              </div>
            </>
          )}

          {/* <29> 추가 항목 없음 */}
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

          {/* 증빙 업로드 */}
          {step === 'evidence' && (
            <>
              <EvidenceSection onFileUpload={handleFileUpload} />
              <TwoButtonGroup
                leftLabel="이전"
                rightLabel="다음"
                onLeftClick={() => setStep('final')}
                onRightClick={() => setStep('review')}
              />
            </>
          )}

          {/* <36> 리뷰(최종 확인 & 제출) */}
          {step === 'review' && (
            <>
              {/* 공고/내 정보 요약 */}
              <JobInfoSection
                jobName={jobTitle || '채용공고'}
                info={jobInfoProps}
              />

              {/* 지원동기: 동일 컴포넌트로 readOnly */}
              <div className="w-full mt-4">
                <QuestionWriteFormSection
                  title="지원동기"
                  inputValue={finalText}
                  onChange={() => {}}
                  readOnly
                />
              </div>

              {/* 업로드 파일 요약 */}
              {certFieldId != null && (
                <div className="w-full border border-emerald-300 rounded-lg p-4 mt-4">
                  <h3 className="text-[16px] font-semibold mb-2">
                    자격증 이미지
                  </h3>

                  {uploadedImageFile ? (
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
                          {previewName}
                        </div>
                        <div className="text-[12px] text-gray-500 mt-1">
                          첨부한 이미지가 맞는지 확인해 주세요.
                        </div>
                      </div>
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
                    </div>
                  ) : (
                    <div className="text-[13px] text-gray-600">
                      첨부된 파일이 없습니다.{` `}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => setStep('evidence')}
                      >
                        증빙 첨부 화면으로 이동
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* 이전(저장) / 제출 */}
              <div className="w-full pb-10 mt-3">
                <TwoButtonGroup
                  leftLabel={isSavingDraft ? '저장 중…' : '저장'}
                  rightLabel={isSubmitting ? '제출 중…' : '제출'}
                  onLeftClick={async () => {
                    await saveDraft({ silent: true }); // 저장만
                    setStep('evidence'); // evidence로 이동
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
