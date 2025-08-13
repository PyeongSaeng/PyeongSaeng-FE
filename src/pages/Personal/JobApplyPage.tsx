import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { postUploadImage } from './apis/files';
import type { QAOption } from './types/ai';
import type { FieldAndAnswer } from './types/applications';

// ===  실제 값으로 교체 ===
const JOB_POST_ID = 1; // 백엔드가 준 공고 ID
const FORMFIELD_ID_MOTIVATION = 1; // "지원동기" 필드 ID
const FORMFIELD_ID_CERT = 2; // "자격증 이미지" 필드 ID

export default function JobApplyPage() {
  const navigate = useNavigate();
  const hasExtraQuestions = true;

  // 31(choice) → 32(scaffold) → 33(final) → evidence → complete
  const [step, setStep] = useState<
    'basic' | 'choice' | 'scaffold' | 'final' | 'evidence' | 'complete'
  >(hasExtraQuestions ? 'choice' : 'basic');

  // 31
  const [selected, setSelected] = useState(''); // 사용자가 선택한 옵션
  const MAIN_QUESTION = '지원 동기가 무엇인가요?';

  // 32
  const [scaffoldText, setScaffoldText] = useState('');
  const [personalInput, setPersonalInput] = useState('');
  const [isLoadingScaffold, setIsLoadingScaffold] = useState(false);
  const [scaffoldError, setScaffoldError] = useState<string | null>(null);

  // 33
  const [finalText, setFinalText] = useState('');

  // 파일 업로드
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

  // 예시 인적정보
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

  // 새로고침 이탈 방지
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

  // 31 → 32 (스웨거 스펙 맞춤)
  const handleChoiceSubmit = async () => {
    if (!selected.trim()) return alert('답변을 선택해 주세요.');
    setStep('scaffold');
    setIsLoadingScaffold(true);
    setScaffoldError(null);
    setScaffoldText('');

    try {
      // answers: [{question, option}]
      const qa: QAOption[] = [{ question: MAIN_QUESTION, option: selected }];

      // 1) 키워드 추천
      const keywords = await postGenerateKeywords({
        answers: qa,
        question: MAIN_QUESTION,
      });
      const picked = keywords?.[0] ?? selected;

      // 2) 선택 키워드로 문장 자동 생성 (완성문 반환)
      const generated = await postGenerateAnswer({
        answers: qa,
        question: MAIN_QUESTION,
        selectedKeyword: picked,
      });

      // "AI 틀" 대신 스웨거가 완성문을 반환하므로, 초안=완성문 개념으로 사용
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

  // 32 → 33 : 사용자가 개인경험을 곁들여 직접 수정하도록 이동
  const handleAiCompose = async () => {
    const base = scaffoldText.trim();
    if (!base) return alert('AI 문장을 먼저 생성해 주세요.');
    // 경험 입력(personalInput)은 사용자가 33단계에서 직접 가필/수정하게 둡니다.
    setFinalText([base, personalInput.trim()].filter(Boolean).join('\n'));
    setStep('final');
  };

  const handleGoHome = () => navigate('/personal');

  // 제출(complete 전 단계에서 호출)
  const submitApplication = async () => {
    if (!finalText.trim()) {
      alert('완성본 문장을 확인해 주세요.');
      return;
    }
    if (!uploadedImageFile) {
      alert('자격증 이미지를 업로드해 주세요.');
      return;
    }

    // 1) 이미지 업로드 → keyName 확보
    const keyName = await postUploadImage(uploadedImageFile);

    // 2) fieldAndAnswer 구성 (스웨거 스키마)
    const fieldAndAnswer: FieldAndAnswer[] = [
      {
        formFieldId: FORMFIELD_ID_MOTIVATION,
        fieldType: 'TEXT',
        answer: finalText,
      },
      {
        formFieldId: FORMFIELD_ID_CERT,
        fieldType: 'IMAGE',
        answer: [
          {
            keyName,
            originalFileName: uploadedImageFile.name,
          },
        ],
      },
    ];

    // 3) 본인 직접 제출
    await postApplicationDirect({
      jobPostId: JOB_POST_ID,
      applicationStatus: 'NON_STARTED', // 필요 시 DRAFT/SUBMITTED로 교체
      fieldAndAnswer,
    });

    setStep('complete');
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

          {/* 완료 */}
          {step === 'complete' && (
            <>
              <JobInfoSection jobName="죽전2동 행정복지센터" info={info} />
              {hasExtraQuestions && !!finalText && (
                <div className="w-full border border-[#08D485] rounded-lg p-4 mt-4">
                  <h3 className="text-[16px] font-semibold mb-2">지원동기</h3>
                  <p className="text-[14px] text-[#333] whitespace-pre-wrap">
                    {finalText}
                  </p>
                </div>
              )}
              <div className="w-full pb-10">
                <NextButton onClick={handleGoHome}>
                  {hasExtraQuestions ? '홈으로 이동' : '홈으로'}
                </NextButton>
              </div>
            </>
          )}

          {/* 29: 추가항목 없음 */}
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

          {/* 31: 선택 */}
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

          {/* 32: AI 문장 + 경험 입력 */}
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
                readOnly={false}
                className="mb-0"
              />

              <NextButton
                onClick={handleAiCompose}
                disabled={isLoadingScaffold || !scaffoldText.trim()}
              >
                AI 자동 작성
              </NextButton>
            </div>
          )}

          {/* 33: 완성본 수정 + 증빙 이동 */}
          {step === 'final' && (
            <>
              <QuestionWriteFormSection
                title="지원동기"
                inputValue={finalText}
                onChange={setFinalText}
                placeholder="여기서 수정할 수 있어요"
                readOnly={false}
              />
              <TwoButtonGroup
                leftLabel="이잔"
                rightLabel="다음"
                onLeftClick={() => navigate('/personal/jobs/drafts')}
                onRightClick={() => setStep('evidence')}
              />
            </>
          )}

          {/* 증빙자료 + 실제 제출 */}
          {step === 'evidence' && (
            <EvidenceSection
              onSave={() => navigate('/personal/jobs/drafts')}
              onSubmit={submitApplication} // ← 실제 제출!
              onFileUpload={setUploadedImageFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}
